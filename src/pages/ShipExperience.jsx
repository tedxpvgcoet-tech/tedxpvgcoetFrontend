import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Color, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import ShipAtmosphere, { getStoryEnvironment, getWindGust, sampleStormWave } from "./ShipAtmosphere";
import { makePreviewScene, releasePreviewMaterials } from "./ShipModelUtils";
import "./ShipExperience.css";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { id: "origin", assetId: "origin", url: "/models/ships/origin/boat_48.glb", title: "Origin" },
  { id: "revelation", assetId: "change", url: "/models/ships/change/queen_annes_revenge_free.glb", title: "Revelation" },
];
const storyLabels = ["Origin", "Change", "Revelation"];

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const smoothRange = (start, end, value) => {
  const t = clamp01((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

function getStageWeights(progress) {
  const transformation = smoothRange(0.30, 0.74, progress);
  return [1 - transformation, transformation];
}

function StoryFleet({ progressRef, gltfs, reducedMotion }) {
  const groups = useRef([]);
  const responses = useRef(stages.map(() => ({
    height: 0, pitch: 0, roll: 0,
    centerWave: {}, foreWave: {}, aftWave: {}, portWave: {}, starboardWave: {},
  })));
  const scratch = useMemo(() => ({
    camera: new Vector3(),
    target: new Vector3(0, 0, 0),
  }), []);
  const previews = useMemo(
    () => gltfs.map((gltf, index) => gltf ? makePreviewScene(gltf, stages[index].assetId, { transition: true }) : null),
    [gltfs],
  );
  const materialLists = useMemo(() => previews.map((preview) => {
    if (!preview) return [];
    const materials = new Set();
    preview.scene.traverse((object) => {
      if (!object.isMesh) return;
      const list = Array.isArray(object.material) ? object.material : [object.material];
      list.forEach((material) => material && materials.add(material));
    });
    return [...materials];
  }), [previews]);

  useEffect(() => () => {
    previews.forEach((preview) => {
      if (preview) releasePreviewMaterials(preview.scene, preview.ownsMaterials);
    });
  }, [previews]);

  const simulationTime = useRef(0);
  const lastWeights = useRef(stages.map(() => -1));
  useFrame(({ camera }, delta) => {
    if (!reducedMotion) simulationTime.current += Math.min(delta, 0.05);
    const time = reducedMotion ? 0 : simulationTime.current;
    const gust = reducedMotion ? 0 : getWindGust(time);
    const storyProgress = progressRef.current;
    const environment = getStoryEnvironment(storyProgress);
    const pathAmplitude = reducedMotion ? 0.12 : 0.38;
    // The ship follows a deterministic left-to-right-to-left arc. It is tied to
    // the same scrub progress as the lighting, so scrolling backward reverses it.
    const pathX = -Math.cos(storyProgress * Math.PI * 2) * pathAmplitude;
    const pathZ = -(storyProgress - 0.5) * (reducedMotion ? 0.38 : 0.9);
    const weights = getStageWeights(storyProgress);
    const renderWeights = weights.map((weight, index) => previews[index] ? weight : 0);
    const unrenderedWeight = 1 - renderWeights.reduce((total, weight) => total + weight, 0);
    if (unrenderedWeight > 0) {
      let fallbackIndex = -1;
      for (let index = 0; index < previews.length; index += 1) {
        if (previews[index] && (fallbackIndex < 0 || weights[index] > weights[fallbackIndex])) fallbackIndex = index;
      }
      if (fallbackIndex >= 0) renderWeights[fallbackIndex] += unrenderedWeight;
    }
    const transformation = smoothRange(0.30, 0.74, storyProgress);
    const modelScales = [
      0.78 + (1.08 * 0.92 - 0.78) * transformation,
      1.08 * 0.9 + (1.25 - 1.08 * 0.9) * transformation,
    ];
    const responseAlpha = 1 - Math.exp(-Math.min(delta, 0.05) * 2.2);
    scratch.target.set(pathX, 0, pathZ);

    previews.forEach((preview, index) => {
      if (!preview) return;
      const group = groups.current[index];
      if (!group) return;
      const weight = renderWeights[index];
      group.visible = weight > 0.002;
      const incoming = index === 0 ? 0 : renderWeights[index - 1];
      const outgoing = index === stages.length - 1 ? 0 : renderWeights[index + 1];
      const isRiggedFinal = stages[index].assetId === "final";
      const state = responses.current[index];
      const wave = sampleStormWave(pathX, pathZ, time, gust, environment.seaScale, state.centerWave);
      const heave = reducedMotion ? 0 : Math.max(-0.34, Math.min(0.34, wave.height * 0.42));
      const fore = isRiggedFinal
        ? sampleStormWave(pathX, pathZ + 1.45, time, gust, environment.seaScale, state.foreWave).height
        : sampleStormWave(pathX + 1.45, pathZ, time, gust, environment.seaScale, state.foreWave).height;
      const aft = isRiggedFinal
        ? sampleStormWave(pathX, pathZ - 1.45, time, gust, environment.seaScale, state.aftWave).height
        : sampleStormWave(pathX - 1.45, pathZ, time, gust, environment.seaScale, state.aftWave).height;
      const port = isRiggedFinal
        ? sampleStormWave(pathX - 0.62, pathZ, time, gust, environment.seaScale, state.portWave).height
        : sampleStormWave(pathX, pathZ - 0.62, time, gust, environment.seaScale, state.portWave).height;
      const starboard = isRiggedFinal
        ? sampleStormWave(pathX + 0.62, pathZ, time, gust, environment.seaScale, state.starboardWave).height
        : sampleStormWave(pathX, pathZ + 0.62, time, gust, environment.seaScale, state.starboardWave).height;
      state.height += (heave - state.height) * responseAlpha;
      const pitchTarget = reducedMotion ? 0 : Math.max(-0.07, Math.min(0.07, Math.atan2(fore - aft, 2.9) * 0.4));
      const rollTarget = reducedMotion ? 0 : Math.max(-0.065, Math.min(0.065, Math.atan2(port - starboard, 1.24) * 0.4));
      state.pitch += (pitchTarget - state.pitch) * responseAlpha;
      state.roll += (rollTarget - state.roll) * responseAlpha;

      group.position.set(pathX + (incoming - outgoing) * 0.18, 0.12 + state.height, pathZ);
      group.scale.setScalar(modelScales[index]);
      if (isRiggedFinal) group.rotation.set(-state.pitch, 0, state.roll);
      else group.rotation.set(state.roll, 0, state.pitch);

      if (Math.abs(lastWeights.current[index] - weight) > 0.002) {
        materialLists[index].forEach((material) => {
          if (!material.transparent) return;
          material.opacity = weight;
          material.depthWrite = weight > 0.985 ? material.userData.shipOriginalDepthWrite : false;
        });
        lastWeights.current[index] = weight;
      }
    });

    // Retain the Origin and final-vessel framing while easing between them.
    const cameraDistance = 11.2 - transformation * 1.4;
    const cameraXOffset = 0.85 + transformation * 2.6;
    const cameraHeight = 2.65 + transformation * 0.4;
    scratch.camera.set(
      pathX + cameraXOffset,
      cameraHeight,
      pathZ + cameraDistance,
    );
    camera.position.lerp(scratch.camera, reducedMotion ? 1 : 1 - Math.exp(-Math.min(delta, 0.05) * 2.4));
    camera.lookAt(scratch.target);
  });

  return previews.map((preview, index) => preview && (
    <group key={stages[index].id} ref={(node) => { groups.current[index] = node; }} visible={index === 0}>
      <group position={preview.center} scale={preview.scale}>
        <primitive object={preview.scene} dispose={null} />
      </group>
    </group>
  ));
}

class SceneLoadBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    this.props.onError(error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function AssetLoader({ index, onLoaded, onProgress }) {
  const reportProgress = useCallback((event) => onProgress(index, event), [index, onProgress]);
  const gltf = useLoader(GLTFLoader, stages[index].url, undefined, reportProgress);
  useEffect(() => onLoaded(index, gltf), [gltf, index, onLoaded]);
  return null;
}

function LoadedScene({ progressRef, gltfs, assetErrors, requestedAssets, requestAsset, onAssetLoaded, onAssetProgress, onAssetError, reducedMotion }) {
  const originGltf = gltfs[0];
  useEffect(() => {
    if (originGltf) requestAsset(1);
  }, [originGltf, requestAsset]);

  const errorHandlers = useMemo(() => stages.map((_, index) => (error) => onAssetError(index, error)), [onAssetError]);
  return (
    <>
      {gltfs.some(Boolean) && <StoryFleet progressRef={progressRef} gltfs={gltfs} reducedMotion={reducedMotion} />}
      {stages.map((stage, index) => requestedAssets[index] && !gltfs[index] && !assetErrors[index] && (
        <SceneLoadBoundary key={stage.id} onError={errorHandlers[index]}>
          <Suspense fallback={null}>
            <AssetLoader index={index} onLoaded={onAssetLoaded} onProgress={onAssetProgress} />
          </Suspense>
        </SceneLoadBoundary>
      ))}
    </>
  );
}

function ExperienceCanvas({ progressRef, reducedMotion, lowPower, gltfs, assetErrors, requestedAssets, requestAsset, onAssetLoaded, onAssetProgress, onAssetError }) {
  const [pageVisible, setPageVisible] = useState(() => typeof document === "undefined" || document.visibilityState !== "hidden");
  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return (
    <Canvas
      className="ship-experience-canvas"
      camera={{ position: [0.7, 2.65, 10.4], fov: 42, near: 0.01, far: 1200 }}
      dpr={[1, lowPower ? 1 : 1.5]}
      frameloop={pageVisible ? "always" : "never"}
      gl={{ antialias: !lowPower, powerPreference: lowPower ? "low-power" : "high-performance", alpha: true }}
      fallback={(
        <div className="ship-experience-fallback" role="status">
          This cinematic ship experience needs WebGL. Enable hardware acceleration or open it in a WebGL-capable browser.
        </div>
      )}
      onCreated={({ gl }) => gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.5))}
    >
      <color attach="background" args={[new Color("#050b12")]} />
      <ShipAtmosphere reducedMotion={reducedMotion} lowPower={lowPower} progressRef={progressRef} />
      <LoadedScene
        progressRef={progressRef}
        gltfs={gltfs}
        assetErrors={assetErrors}
        requestedAssets={requestedAssets}
        requestAsset={requestAsset}
        onAssetLoaded={onAssetLoaded}
        onAssetProgress={onAssetProgress}
        onAssetError={onAssetError}
        reducedMotion={reducedMotion}
      />
    </Canvas>
  );
}

export default function ShipExperience() {
  const storyRef = useRef(null);
  const progressRef = useRef(0);
  const progressFillRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [gltfs, setGltfs] = useState([null, null]);
  const [assetProgress, setAssetProgress] = useState([0, 0]);
  const [assetErrors, setAssetErrors] = useState(["", ""]);
  const [requestedAssets, setRequestedAssets] = useState([true, false]);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const [lowPower] = useState(() => typeof navigator !== "undefined" && (
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    Boolean(navigator.connection?.saveData)
  ));
  const requestAsset = useCallback((index) => {
    setRequestedAssets((current) => current[index] ? current : current.map((requested, item) => requested || item === index));
  }, []);
  const markAssetLoaded = useCallback((index, gltf) => {
    setGltfs((current) => current[index] === gltf ? current : current.map((item, slot) => slot === index ? gltf : item));
    setAssetProgress((current) => current.map((value, slot) => slot === index ? 1 : value));
    setAssetErrors((current) => current.map((value, slot) => slot === index ? "" : value));
  }, []);
  const markAssetProgress = useCallback((index, event) => {
    if (!event.lengthComputable || !event.total) return;
    const progress = Math.min(0.99, event.loaded / event.total);
    setAssetProgress((current) => current[index] >= progress || progress - current[index] < 0.035
      ? current
      : current.map((value, slot) => slot === index ? progress : value));
  }, []);
  const markAssetError = useCallback((index, error) => {
    setAssetErrors((current) => current.map((value, slot) => slot === index
      ? (error?.message || "The model could not be parsed.")
      : value));
    if (index < stages.length - 1) requestAsset(index + 1);
  }, [requestAsset]);

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return undefined;
    const update = (event) => setReducedMotion(event.matches);
    setReducedMotion(query.matches);
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const root = storyRef.current;
    if (!root) return undefined;
    const context = gsap.context(() => {
      if (!reducedMotion) {
        gsap.fromTo(".ship-story-title", { opacity: 0, y: 26, letterSpacing: "0.16em" }, {
          opacity: 1, y: 0, letterSpacing: "0.04em", duration: 1.8, delay: 0.2, ease: "power2.out",
        });
        gsap.utils.toArray("[data-story-reveal]").forEach((element) => {
          gsap.fromTo(element, { opacity: 0.25, y: 22 }, {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top 82%", end: "top 45%", scrub: true },
          });
        });
      }
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          progressRef.current = self.progress;
          if (progressFillRef.current) gsap.set(progressFillRef.current, { scaleX: self.progress });
          const chapter = self.progress < 0.24 ? 0 : self.progress < 0.59 ? 1 : 2;
          setActiveChapter((current) => current === chapter ? current : chapter);
        },
      });
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 150);
    window.addEventListener("load", refresh);
    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, [reducedMotion]);

  const ready = gltfs.every(Boolean);
  const loadingIndex = stages.findIndex((_, index) => requestedAssets[index] && !gltfs[index] && !assetErrors[index]);
  const pendingIndex = loadingIndex >= 0 ? loadingIndex : stages.findIndex((_, index) => !gltfs[index] && !assetErrors[index]);
  const status = ready
    ? "The crossing is ready"
    : assetErrors.some(Boolean)
      ? `${stages[assetErrors.findIndex(Boolean)].title} could not load; the available ships remain visible`
      : pendingIndex >= 0
        ? `${stages[pendingIndex].title} loading${requestedAssets[pendingIndex]
          ? (assetProgress[pendingIndex] > 0 ? ` · ${Math.round(assetProgress[pendingIndex] * 100)}%` : " · preparing")
          : " next"}`
        : "Preparing the vessels…";

  const goToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };
  const replay = () => window.scrollTo({
    top: storyRef.current?.offsetTop || 0,
    behavior: reducedMotion ? "auto" : "smooth",
  });

  return (
    <main className="ship-experience-page">
      <title>The Ship of Theseus | TEDxPVGCOET</title>
      <div className="ship-experience-canvas-shell" aria-hidden="true">
        <ExperienceCanvas
          progressRef={progressRef}
          reducedMotion={reducedMotion}
          lowPower={lowPower}
          gltfs={gltfs}
          assetErrors={assetErrors}
          requestedAssets={requestedAssets}
          requestAsset={requestAsset}
          onAssetLoaded={markAssetLoaded}
          onAssetProgress={markAssetProgress}
          onAssetError={markAssetError}
        />
        <div className="ship-experience-vignette" />
      </div>

      <div className="ship-experience-status" role="status" aria-live="polite">
        <span className={ready || assetErrors.some(Boolean) ? "status-dot ready" : "status-dot"} />
        {status}
      </div>

      {!gltfs.some(Boolean) && (
        <div className="ship-experience-loading" role="status" aria-live="polite">
          <div className="ship-experience-loading-panel">
            <p>THE SHIP OF THESEUS</p>
            <h2>{assetErrors[0] ? "The vessel could not be prepared" : "Preparing the voyage"}</h2>
            <span>{assetErrors[0] ? assetErrors[0] : assetProgress[0] > 0
              ? `Loading Origin · ${Math.round(assetProgress[0] * 100)}%`
              : "Preparing the first ship model"}</span>
            <div className="ship-experience-loading-track">
              <i className={assetProgress[0] > 0 ? "" : "indeterminate"} style={{ transform: assetProgress[0] > 0 ? `scaleX(${assetProgress[0]})` : undefined }} />
            </div>
            <small>The story and storm are ready while the first model arrives.</small>
          </div>
        </div>
      )}

      <nav className="ship-experience-chapters" aria-label="Story chapters">
        {storyLabels.map((label, index) => (
          <button
            key={label}
            className={activeChapter === index ? "active" : ""}
            type="button"
            aria-label={`Go to ${label} chapter`}
            aria-current={activeChapter === index ? "step" : undefined}
            onClick={() => goToSection(["chapter-origin", "chapter-change", "chapter-revelation"][index])}
          >
            <span>0{index + 1}</span><i />
          </button>
        ))}
      </nav>
      <button className="ship-experience-replay" type="button" onClick={replay}>↺ <span>Replay</span></button>

      <div className="ship-experience-progress" aria-hidden="true">
        <span ref={progressFillRef} />
      </div>

      <div className="ship-story" ref={storyRef}>
        <section className="ship-story-section ship-story-cover" id="story-beginning">
          <div className="ship-story-cover-copy">
            <p className="ship-story-kicker" data-story-reveal>AN OPEN QUESTION, CARRIED BY THE SEA</p>
            <h1 className="ship-story-title">SHIP <span>OF</span><br />THESEUS</h1>
            <p className="ship-story-intro" data-story-reveal>
              A vessel leaves the shore. The years begin to change it.
              What, then, keeps it itself?
            </p>
            <button className="ship-story-scroll" type="button" onClick={() => goToSection("chapter-origin")}>
              <span className="scroll-mark" /> Scroll to begin
            </button>
          </div>
        </section>

        <section className="ship-story-section ship-story-chapter chapter-origin" id="chapter-origin">
          <div className="ship-story-copy" data-story-reveal>
            <p className="ship-story-kicker">01 / ORIGIN</p>
            <h2>At first, it is simply a boat.</h2>
            <p>Wood, canvas, a mast against the dark. It has a name, a maker, and a first voyage.</p>
            <p className="ship-story-question">If it changes, when does it stop being the same vessel?</p>
          </div>
          <span className="ship-story-coordinate">A beginning is easy to name.</span>
        </section>

        <section className="ship-story-section ship-story-chapter chapter-change" id="chapter-change">
          <div className="ship-story-copy" data-story-reveal>
            <p className="ship-story-kicker">02 / CHANGE</p>
            <h2>One part at a time.</h2>
            <p>A plank gives way. A sail is mended. The hull grows, the rigging multiplies, and the sea keeps its own account.</p>
            <p className="ship-story-question">Is continuity held in the pieces, or in the passage between them?</p>
          </div>
          <span className="ship-story-coordinate">The voyage continues.</span>
        </section>

        <section className="ship-story-section ship-story-chapter chapter-revelation" id="chapter-revelation">
          <div className="ship-story-copy" data-story-reveal>
            <p className="ship-story-kicker">03 / REVELATION</p>
            <h2>Everything can be different.<br /><em>Something still carries through.</em></h2>
            <p>The vessel that arrives bears little resemblance to the one that left. Yet its story has not broken.</p>
            <p className="ship-story-question">Perhaps identity is not what remains untouched, but what remains connected.</p>
          </div>
          <span className="ship-story-coordinate">A name, weathered into a promise.</span>
        </section>

        <section className="ship-story-section ship-story-ending" id="story-ending">
          <div className="ship-story-ending-copy" data-story-reveal>
            <p className="ship-story-kicker">THE SHIP OF THESEUS</p>
            <h2>Changed by the journey.<br /><em>Made whole by continuing.</em></h2>
            <div className="ship-story-actions">
              <button type="button" onClick={replay}>Replay the voyage <span>↺</span></button>
              <Link to="/">Continue to event details <span>↗</span></Link>
            </div>
            <p className="ship-story-signoff">TEDxPVGCOET · IDEAS THAT KEEP MOVING</p>
          </div>
        </section>
      </div>
    </main>
  );
}
