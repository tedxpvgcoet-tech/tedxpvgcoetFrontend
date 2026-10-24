import React, { useMemo, useRef } from "react";
import { BackSide, BufferAttribute, BufferGeometry, Color, FrontSide, ShaderMaterial } from "three";
import { useFrame } from "@react-three/fiber";

const OCEAN_WAVES = [
  { dx: 0.95, dz: 0.31, waveNumber: 0.22, amplitude: 0.34, speed: 1.25, gustPhase: 0.35, phase: 0.6 },
  { dx: -0.42, dz: 0.91, waveNumber: 0.37, amplitude: 0.24, speed: -1.45, gustPhase: 0.55, phase: 1.4 },
  { dx: 0.72, dz: -0.69, waveNumber: 0.78, amplitude: 0.12, speed: 2.2, gustPhase: 0.85, phase: 2.6 },
  { dx: -0.88, dz: -0.48, waveNumber: 1.24, amplitude: 0.065, speed: -2.9, gustPhase: 1.1, phase: 0.4 },
  { dx: 0.22, dz: 0.97, waveNumber: 1.85, amplitude: 0.025, speed: 3.5, gustPhase: 0.7, phase: 2.1 },
  { dx: 0.12, dz: -0.99, waveNumber: 0.5, amplitude: 0.11, speed: -1.8, gustPhase: 0.4, phase: 4.7 },
];
// Applied by both the GLSL displacement and JavaScript buoyancy sampler so
// visible wave travel and ship response stay synchronized.
const WAVE_TIME_SCALE = 1.8;

export function getWindGust(time) {
  const swell = Math.sin(time * 0.19 + Math.sin(time * 0.047) * 1.4);
  return Math.max(0, Math.min(1, 0.5 + swell * 0.5));
}

export function getStoryEnvironment(progress = 0) {
  const p = Math.max(0, Math.min(1, progress));
  const smooth = (start, end) => {
    const t = Math.max(0, Math.min(1, (p - start) / (end - start)));
    return t * t * (3 - 2 * t);
  };
  const sunset = smooth(0.58, 0.94);
  return {
    storm: 1 - smooth(0.34, 0.84),
    sunset,
    seaScale: 1 - sunset * 0.66,
  };
}

export function sampleStormWave(x, z, time = 0, gust = getWindGust(time), scale = 1, target = {}) {
  let height = 0;
  let slopeX = 0;
  let slopeZ = 0;
  for (const wave of OCEAN_WAVES) {
    const phase = (x * wave.dx + z * wave.dz) * wave.waveNumber +
      time * WAVE_TIME_SCALE * wave.speed + gust * wave.gustPhase + wave.phase;
    height += Math.sin(phase) * wave.amplitude;
    const slope = Math.cos(phase) * wave.amplitude * wave.waveNumber;
    slopeX += slope * wave.dx;
    slopeZ += slope * wave.dz;
  }
  target.height = height * scale;
  target.slopeX = slopeX * scale;
  target.slopeZ = slopeZ * scale;
  return target;
}

const waveLayerGlsl = OCEAN_WAVES.map((wave, index) => {
  const num = (value) => Number(value).toFixed(4);
  return `
    float phase${index} = (position.x * ${num(wave.dx)} + position.y * ${num(wave.dz)}) * ${num(wave.waveNumber)} +
      uTime * ${num(wave.speed * WAVE_TIME_SCALE)} + uGust * ${num(wave.gustPhase)} + ${num(wave.phase)};
    float slope${index} = cos(phase${index}) * ${num(wave.amplitude * wave.waveNumber)};
    height += sin(phase${index}) * ${num(wave.amplitude)};
    slopeX += slope${index} * ${num(wave.dx)};
    slopeZ += slope${index} * ${num(wave.dz)};
  `;
}).join("\n");

const waveFunctionGlsl = `
  vec3 sampleStormWave(vec2 position) {
    float height = 0.0;
    float slopeX = 0.0;
    float slopeZ = 0.0;
    ${waveLayerGlsl}
    return vec3(height, slopeX, slopeZ);
  }
`;

const skyVertexShader = `
  uniform float uTime;
  varying vec3 vDirection;
  void main() {
    vDirection = normalize(position);
    vec3 cloudDrift = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(cloudDrift, 1.0);
  }
`;

const skyFragmentShader = `
  uniform float uTime;
  uniform float uGust;
  uniform float uLightning;
  uniform float uStorm;
  uniform float uSunset;
  varying vec3 vDirection;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float cloudNoise(vec2 p) {
    float value = 0.0;
    float amplitude = 0.58;
    for (int i = 0; i < 3; i++) {
      value += noise(p) * amplitude;
      p *= 2.03;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec3 direction = normalize(vDirection);
    float horizon = smoothstep(-0.32, 0.55, direction.y);
    vec3 upperSky = vec3(0.007, 0.014, 0.029);
    vec3 horizonSky = vec3(0.035, 0.055, 0.075);
    vec3 sky = mix(horizonSky, upperSky, horizon);

    vec2 cloudUv = direction.xz / max(direction.y + 0.78, 0.2);
    float drift = uTime * ((0.025 + uGust * 0.022) * uStorm + 0.0025 * uSunset);
    float lowerMass = cloudNoise(cloudUv * 5.1 + vec2(-drift, drift * 0.42));
    float lowerDetail = cloudNoise(cloudUv * 10.7 + vec2(drift * 0.65, -drift));
    float upperMass = cloudNoise(cloudUv * 3.3 + vec2(drift * 0.35, drift * 0.18));
    float cloudField = lowerMass * 0.48 + lowerDetail * 0.22 + upperMass * 0.30;
    float cloudHorizonMask = 1.0 - smoothstep(0.26, 0.72, direction.y);
    float lowClouds = smoothstep(0.37, 0.63, cloudField) * cloudHorizonMask;
    float highClouds = smoothstep(0.46, 0.69, upperMass + lowerDetail * 0.18) *
      (1.0 - smoothstep(0.48, 0.8, direction.y));
    float cloudMask = clamp(lowClouds * 0.86 + highClouds * 0.48, 0.0, 0.92);
    float cloudShape = smoothstep(0.42, 0.76, cloudField);
    float silverEdge = smoothstep(0.67, 0.83, cloudField) * cloudMask;
    vec3 cloudColor = mix(vec3(0.016, 0.027, 0.043), vec3(0.082, 0.112, 0.14), silverEdge);
    cloudColor += vec3(0.018, 0.026, 0.034) * cloudShape;
    cloudColor += vec3(0.22, 0.25, 0.27) * uLightning * (0.28 + cloudShape * 0.72);
    vec3 stormSky = mix(sky, cloudColor, cloudMask * uStorm);

    float vertical = smoothstep(0.0, 0.78, max(direction.y, 0.0));
    vec3 sunsetHorizon = vec3(0.72, 0.34, 0.17);
    vec3 sunsetUpper = vec3(0.085, 0.125, 0.19);
    vec3 sunsetSky = mix(sunsetHorizon, sunsetUpper, vertical);
    float sunsetHaze = exp(-abs(direction.y - 0.035) * 17.0);
    float coralBand = exp(-abs(direction.y - 0.23) * 7.0);
    sunsetSky += vec3(0.31, 0.105, 0.048) * sunsetHaze;
    sunsetSky += vec3(0.16, 0.055, 0.072) * coralBand;
    float warmCloudMask = smoothstep(0.43, 0.68, cloudField) * cloudHorizonMask;
    float sunsetCloudEdge = smoothstep(0.60, 0.84, cloudField);
    vec3 warmCloud = mix(vec3(0.17, 0.105, 0.105), vec3(0.63, 0.33, 0.20), sunsetCloudEdge);
    sunsetSky = mix(sunsetSky, warmCloud, warmCloudMask * 0.48);
    vec3 sunDirection = normalize(vec3(-0.34, 0.035, -1.0));
    float sunDot = dot(direction, sunDirection);
    float sunDisc = smoothstep(0.99925, 0.99972, sunDot);
    float sunGlow = exp(-max(0.0, 1.0 - sunDot) * 72.0);
    sunsetSky += vec3(1.0, 0.69, 0.35) * (sunDisc * 1.25 + sunGlow * 0.42);
    sky = mix(stormSky, sunsetSky, uSunset);

    float lowHaze = exp(-abs(direction.y + 0.025) * 22.0) * 0.2;
    sky += vec3(0.035, 0.055, 0.069) * lowHaze * uStorm;
    gl_FragColor = vec4(sky, 1.0);
  }
`;

const oceanVertexShader = `
  uniform float uTime;
  uniform float uGust;
  uniform float uSeaScale;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying float vFoamPotential;
  ${waveFunctionGlsl}

  void main() {
    vec3 p = position;
    // Plane is rotated -PI/2: local -Y maps to world +Z.
    vec3 wave = sampleStormWave(vec2(p.x, -p.y)) * uSeaScale;
    p.z += wave.x;
    vNormal = normalize(normalMatrix * normalize(vec3(-wave.y, wave.z, 1.0)));
    float steepness = length(wave.yz);
    float crest = smoothstep(0.38, 0.72, wave.x + steepness * 0.5);
    vFoamPotential = max(crest, smoothstep(0.19, 0.34, steepness) * 0.82);
    vec4 worldPosition = modelMatrix * vec4(p, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const oceanFragmentShader = `
  uniform float uTime;
  uniform float uLightning;
  uniform float uSunset;
  uniform float uStorm;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying float vFoamPotential;

  float foamNoise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    if (normal.y < 0.0) normal = -normal;
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 moonDirection = normalize(vec3(-0.38, 0.82, 0.42));
    float diffuse = max(dot(normal, moonDirection), 0.0);
    vec3 halfDirection = normalize(viewDirection + moonDirection);
    float specular = pow(max(dot(normal, halfDirection), 0.0), 42.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.7);
    float reflectionNoise = foamNoise(floor(vWorldPosition.xz * 0.8 + uTime * 0.025));
    float moonGlint = specular * (0.22 + reflectionNoise * 0.62);
    float lightningReflection = pow(max(dot(normal, normalize(viewDirection + vec3(-0.2, 0.82, -0.3))), 0.0), 22.0);

    vec3 deepWater = vec3(0.010, 0.028, 0.055);
    vec3 reflectedWater = vec3(0.028, 0.074, 0.108);
    vec3 color = mix(deepWater, reflectedWater, fresnel * 0.62 + diffuse * 0.18);
    color += vec3(0.24, 0.36, 0.49) * moonGlint * 0.78 * (1.0 - uSunset * 0.9);
    color += vec3(0.34, 0.39, 0.42) * lightningReflection * uLightning * 0.85;

    float foamGrain = foamNoise(floor(vWorldPosition.xz * 2.1 + vec2(uTime * 0.72, -uTime * 0.54)));
    float foam = smoothstep(0.50, 0.79, vFoamPotential + (foamGrain - 0.5) * 0.34);
    color = mix(color, vec3(0.40, 0.49, 0.57), foam * 0.50 * uStorm);
    color += vec3(0.045, 0.065, 0.078) * uLightning * 0.32;
    // A narrow moon path is broken up by the live specular response and the
    // moving wave normals, rather than being painted as a static bright stripe.
    float moonPathCenter = -1.35 + sin(vWorldPosition.z * 0.055 + uTime * 0.035) * 0.9;
    float moonPath = exp(-abs(vWorldPosition.x - moonPathCenter) * 0.24);
    float brokenGlint = smoothstep(0.11, 0.48, specular * 1.35 + foamGrain * 0.16);
    color += vec3(0.31, 0.43, 0.57) * moonPath * brokenGlint * (1.0 - uSunset) * 0.62;
    vec3 sunsetWater = vec3(0.045, 0.053, 0.082);
    color = mix(color, color * 0.72 + sunsetWater, uSunset * 0.72);
    float reflectionPath = exp(-abs(vWorldPosition.x + 1.8 + sin(vWorldPosition.z * 0.055) * 1.2) * 0.24);
    float visibleSea = smoothstep(-25.0, 8.0, vWorldPosition.z);
    float goldBreakup = smoothstep(0.12, 0.5, specular * 1.35 + foamGrain * 0.16 + vFoamPotential * 0.11);
    color += vec3(1.0, 0.55, 0.25) * reflectionPath * visibleSea * (0.18 + goldBreakup * 0.82) * uSunset * 0.48;
    float pearlGlints = smoothstep(0.72, 0.94, foamGrain + vFoamPotential * 0.32) *
      smoothstep(0.18, 0.58, specular + vFoamPotential * 0.18);
    color += vec3(1.0, 0.79, 0.59) * pearlGlints * uSunset * 0.13;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const rainVertexShader = `
  attribute float aSeed;
  attribute float aLength;
  attribute float aLayer;
  uniform float uTime;
  uniform float uGust;
  uniform float uReducedMotion;
  uniform float uStorm;
  varying float vAlpha;
  varying float vLength;
  varying float vAngle;
  void main() {
    if (uStorm < 0.002) {
      gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
      gl_PointSize = 0.0;
      vAlpha = 0.0;
      vLength = 0.0;
      vAngle = 0.0;
      return;
    }
    vec3 p = position;
    float layerSpeed = mix(0.66, 1.0, aLayer);
    float gustPulse = mix(0.55 + 0.45 * uGust, 0.58, uReducedMotion);
    float motionScale = mix(1.0, 0.38, uReducedMotion);
    float fall = uTime * (13.0 + aSeed * 8.0) * layerSpeed * gustPulse * motionScale;
    p.y = mod(p.y + 12.0 - fall, 28.0) - 12.0;
    float windX = fall * (0.43 + uGust * 0.28);
    float windZ = fall * (0.18 + uGust * 0.13);
    float width = mix(18.0, 28.0, aLayer);
    float depth = mix(16.0, 26.0, aLayer);
    p.x = mod(p.x + windX + width * 0.5, width) - width * 0.5 + sin(uTime * 1.3 + aSeed * 24.0) * 0.12;
    p.z = mod(p.z + windZ + depth * 0.5, depth) - depth * 0.5 + cos(uTime * 0.8 + aSeed * 19.0) * 0.08;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = clamp(mix(4.0, 8.0, aLayer) * (28.0 / max(-mvPosition.z, 5.0)), 1.0, 7.5);
    vLength = aLength * (0.72 + uGust * 0.46);
    vAngle = mix(0.28, 0.48, aLayer) + uGust * 0.12 * (1.0 - uReducedMotion);
    vAlpha = mix(0.10, 0.31, aLayer) * (0.84 + aSeed * 0.16) * mix(1.0, 0.65, uReducedMotion) * uStorm;
  }
`;

const rainFragmentShader = `
  varying float vAlpha;
  varying float vLength;
  varying float vAngle;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float c = cos(vAngle);
    float s = sin(vAngle);
    vec2 streakUv = vec2(c * p.x + s * p.y, -s * p.x + c * p.y);
    float streak = (1.0 - smoothstep(0.015, 0.105, abs(streakUv.x))) *
      (1.0 - smoothstep(vLength * 0.34, vLength * 0.50, abs(streakUv.y)));
    gl_FragColor = vec4(0.69, 0.77, 0.82, streak * vAlpha);
  }
`;

function StormSky({ stormUniforms }) {
  const material = useMemo(() => new ShaderMaterial({
    vertexShader: skyVertexShader,
    fragmentShader: skyFragmentShader,
    uniforms: {
      uTime: stormUniforms.uTime,
      uGust: stormUniforms.uGust,
      uLightning: stormUniforms.uLightning,
      uStorm: stormUniforms.uStorm,
      uSunset: stormUniforms.uSunset,
    },
    side: BackSide,
    depthWrite: false,
    fog: false,
  }), [stormUniforms]);

  return (
    <mesh frustumCulled={false} renderOrder={-10}>
      <sphereGeometry args={[125, 48, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function OceanSurface({ reducedMotion, lowPower = false, stormUniforms }) {
  const uniforms = useMemo(() => ({
    uTime: stormUniforms.uTime,
    uGust: stormUniforms.uGust,
    uLightning: stormUniforms.uLightning,
    uSeaScale: stormUniforms.uSeaScale,
    uSunset: stormUniforms.uSunset,
    uStorm: stormUniforms.uStorm,
  }), [stormUniforms]);

  const subdivisions = reducedMotion ? 96 : lowPower ? 176 : 256;
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -2.58, 0]} renderOrder={-1}>
      <planeGeometry args={[240, 240, subdivisions, subdivisions]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={oceanVertexShader}
        fragmentShader={oceanFragmentShader}
        side={FrontSide}
        depthWrite
        toneMapped={false}
      />
    </mesh>
  );
}

function Rain({ lowPower = false, reducedMotion = false, stormUniforms }) {
  const points = useRef(null);
  const geometry = useMemo(() => {
    const count = reducedMotion ? (lowPower ? 300 : 480) : (lowPower ? 1650 : 3000);
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const lengths = new Float32Array(count);
    const layers = new Float32Array(count);
    let seed = 74813;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < count; i += 1) {
      const layer = i % 3 === 0 ? 0 : 1;
      positions[i * 3] = (random() - 0.5) * (layer ? 28 : 18);
      positions[i * 3 + 1] = random() * 28 - 12;
      positions[i * 3 + 2] = (random() - 0.5) * (layer ? 26 : 16);
      seeds[i] = random();
      lengths[i] = 0.4 + random() * 0.52;
      layers[i] = layer;
    }
    const cloud = new BufferGeometry();
    cloud.setAttribute("position", new BufferAttribute(positions, 3));
    cloud.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    cloud.setAttribute("aLength", new BufferAttribute(lengths, 1));
    cloud.setAttribute("aLayer", new BufferAttribute(layers, 1));
    return cloud;
  }, [lowPower, reducedMotion]);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uGust: stormUniforms.uGust,
    uReducedMotion: { value: reducedMotion ? 1 : 0 },
    uStorm: stormUniforms.uStorm,
  }), [reducedMotion, stormUniforms]);

  useFrame((_, delta) => {
    // Rain runs on a private delta clock: wave phase multipliers can change the
    // ocean without changing drop speed. Gusts share the scene simulation clock.
    uniforms.uTime.value += Math.min(delta, 0.05);
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={rainVertexShader}
        fragmentShader={rainFragmentShader}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

function LightningFlash({ stormUniforms, reducedMotion, progressRef }) {
  const moonLight = useRef(null);
  const rimLight = useRef(null);
  const ambientFill = useRef(null);
  const sunsetLight = useRef(null);
  const moonMaterial = useRef(null);
  const sunsetColor = useMemo(() => new Color("#f8bd83"), []);
  const moonBaseColor = useMemo(() => new Color("#b9d2e8"), []);
  const ambientBaseColor = useMemo(() => new Color("#9aadc0"), []);
  const ambientSunsetColor = useMemo(() => new Color("#d4a185"), []);
  const flash = useRef({
    seed: 48321,
    nextAt: 6.5,
    startedAt: -1,
    duration: 0.18,
    strength: 1,
  });

  useFrame(() => {
    const time = stormUniforms.uTime.value;
    const state = flash.current;
    const storm = stormUniforms.uStorm.value;
    const sunset = stormUniforms.uSunset.value;
    const storyProgress = progressRef?.current ?? 0;
    const firstChange = Math.max(0, Math.min(1, (storyProgress - 0.24) / (0.42 - 0.24)));
    const finalChange = Math.max(0, Math.min(1, (storyProgress - 0.59) / (0.75 - 0.59)));
    const middleStage = firstChange * firstChange * (3 - 2 * firstChange)
      * (1 - finalChange * finalChange * (3 - 2 * finalChange));
    if (storm < 0.005) {
      state.startedAt = -1;
      state.nextAt = time + 4.5;
    } else if (!reducedMotion && time >= state.nextAt) {
      state.seed = (state.seed * 16807) % 2147483647;
      const random = (state.seed - 1) / 2147483646;
      state.startedAt = time;
      state.duration = 0.12 + random * 0.13;
      state.strength = 0.72 + random * 0.65;
      state.nextAt = time + 7.5 + random * 10.5;
    }

    const progress = (time - state.startedAt) / state.duration;
    const intensity = !reducedMotion && storm >= 0.005 && progress >= 0 && progress <= 1
      ? state.strength * Math.pow(Math.sin(Math.PI * progress), 2.4) * storm
      : 0;
    stormUniforms.uLightning.value = intensity;
    if (moonLight.current) {
      moonLight.current.intensity = 2.05 * (1 - sunset) + 0.22 * sunset + intensity * 3.2 + middleStage * 1.05;
      moonLight.current.color.lerpColors(moonBaseColor, sunsetColor, sunset);
    }
    if (rimLight.current) rimLight.current.intensity = 0.82 * (1 - sunset) + middleStage * 0.72;
    if (ambientFill.current) {
      ambientFill.current.intensity = 0.42 * (1 - sunset) + 0.54 * sunset + intensity * 0.62 + middleStage * 0.14;
      ambientFill.current.color.lerpColors(ambientBaseColor, ambientSunsetColor, sunset);
    }
    if (sunsetLight.current) sunsetLight.current.intensity = sunset * 2.0;
    if (moonMaterial.current) moonMaterial.current.opacity = 1 - sunset;
  });

  return (
    <>
      <directionalLight ref={moonLight} position={[-8, 15, 8]} intensity={2.05} color="#b9d2e8" />
      <directionalLight ref={rimLight} position={[8, 8, -12]} intensity={0.82} color="#829db8" />
      <ambientLight ref={ambientFill} intensity={0.42} color="#9aadc0" />
      <directionalLight ref={sunsetLight} position={[-8, 5, -24]} intensity={0} color="#ffb36f" />
      <mesh position={[-20, 21, -55]}>
        <sphereGeometry args={[1.55, 20, 16]} />
        <meshBasicMaterial ref={moonMaterial} color={moonBaseColor} transparent opacity={1} toneMapped={false} />
      </mesh>
    </>
  );
}

function StormClock({ stormUniforms, reducedMotion, progressRef }) {
  const simulationTime = useRef(0);
  useFrame((_, delta) => {
    if (!reducedMotion) simulationTime.current += Math.min(delta, 0.05);
    const time = reducedMotion ? 0 : simulationTime.current;
    const environment = getStoryEnvironment(progressRef?.current ?? 0);
    stormUniforms.uTime.value = time;
    stormUniforms.uGust.value = reducedMotion ? 0 : getWindGust(time);
    stormUniforms.uStorm.value = environment.storm;
    stormUniforms.uSunset.value = environment.sunset;
    stormUniforms.uSeaScale.value = environment.seaScale;
  });
  return null;
}

function AtmosphereMood({ stormUniforms }) {
  const hemisphere = useRef(null);
  const frontFill = useRef(null);
  const stormColor = useMemo(() => new Color("#07111a"), []);
  const duskColor = useMemo(() => new Color("#24151a"), []);
  const stormSkyColor = useMemo(() => new Color("#5d7892"), []);
  const duskSkyColor = useMemo(() => new Color("#d69a70"), []);
  const stormGroundColor = useMemo(() => new Color("#071019"), []);
  const duskGroundColor = useMemo(() => new Color("#34201b"), []);
  const coolFillColor = useMemo(() => new Color("#71879a"), []);
  const warmFillColor = useMemo(() => new Color("#f0ad75"), []);
  useFrame(({ scene }) => {
    const sunset = stormUniforms.uSunset.value;
    if (scene.fog) {
      scene.fog.color.lerpColors(stormColor, duskColor, sunset);
      scene.fog.density = 0.012 * (1 - sunset * 0.58);
    }
    if (hemisphere.current) {
      hemisphere.current.color.lerpColors(stormSkyColor, duskSkyColor, sunset);
      hemisphere.current.groundColor.lerpColors(stormGroundColor, duskGroundColor, sunset);
    }
    if (frontFill.current) {
      frontFill.current.color.lerpColors(coolFillColor, warmFillColor, sunset);
      frontFill.current.intensity = 0.38 * (1 - sunset) + 0.24 * sunset;
    }
  });
  return (
    <>
      <hemisphereLight ref={hemisphere} args={["#5d7892", "#071019", 0.55]} />
      <directionalLight ref={frontFill} position={[7, 4, 8]} intensity={0.38} color="#71879a" />
    </>
  );
}

export default function ShipAtmosphere({ reducedMotion, lowPower = false, progressRef }) {
  const stormUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uGust: { value: 0 },
    uLightning: { value: 0 },
    uStorm: { value: 1 },
    uSunset: { value: 0 },
    uSeaScale: { value: 1 },
  }), []);
  return (
    <>
      <StormClock stormUniforms={stormUniforms} reducedMotion={reducedMotion} progressRef={progressRef} />
      <StormSky stormUniforms={stormUniforms} />
      <fogExp2 attach="fog" args={["#07111a", 0.012]} />
      <AtmosphereMood stormUniforms={stormUniforms} />
      <LightningFlash stormUniforms={stormUniforms} reducedMotion={reducedMotion} progressRef={progressRef} />
      <pointLight position={[0, -0.4, 0]} intensity={0.8} distance={9} color="#d09258" />
      <OceanSurface reducedMotion={reducedMotion} lowPower={lowPower} stormUniforms={stormUniforms} />
      <Rain lowPower={lowPower} reducedMotion={reducedMotion} stormUniforms={stormUniforms} />
    </>
  );
}
