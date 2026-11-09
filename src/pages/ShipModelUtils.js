import { Box3, Vector3 } from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";

export function makePreviewScene(gltf, stageId, { transition = false } = {}) {
  const scene = cloneSkeleton(gltf.scene);
  const ownsMaterials = true;
  const bounds = new Box3().setFromObject(scene);
  const center = bounds.getCenter(new Vector3());
  const size = bounds.getSize(new Vector3());
  const largestDimension = Math.max(size.x, size.y, size.z, 0.001);
  const scale = 5.5 / largestDimension;
  const sphere = bounds.getBoundingSphere({ center: new Vector3(), radius: 0 });

  scene.traverse((object) => {
    if (!object.isMesh) return;
    const prepareMaterial = (material) => {
      const target = ownsMaterials ? material.clone() : material;
      if (transition) {
        target.userData.shipOriginalDepthWrite = target.depthWrite;
        target.transparent = true;
        target.opacity = 0;
        target.depthWrite = false;
      }
      return target;
    };
    object.material = Array.isArray(object.material)
      ? object.material.map(prepareMaterial)
      : prepareMaterial(object.material);
  });

  return {
    scene,
    center: center.multiplyScalar(-scale),
    scale,
    radius: sphere.radius * scale,
    rawSize: size,
    ownsMaterials,
  };
}

export function releasePreviewMaterials(scene, ownsMaterials) {
  if (!ownsMaterials) return;
  scene?.traverse((object) => {
    if (!object.isMesh) return;
    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];
    materials.filter(Boolean).forEach((material) => material.dispose());
  });
}
