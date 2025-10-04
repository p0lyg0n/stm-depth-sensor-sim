"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef, useLayoutEffect } from "react";
import type { ResolutionSpec, SceneSpec, SensorSpec } from "@/lib/types";
import type { TranslationEntry } from "@/lib/i18n";
import { useTranslation } from "@/hooks/useTranslation";

interface DepthViewCanvasProps {
  scene?: SceneSpec;
  sensor?: SensorSpec;
  resolution?: ResolutionSpec;
  cameraHeight: number;
}

interface FrustumInfo {
  position: THREE.Vector3;
  direction: THREE.Vector3;
  near: number;
  far: number;
  nearWidth: number;
  nearHeight: number;
  farWidth: number;
  farHeight: number;
  localMeters: { x: number; y: number; z: number };
  localMillimeters: { x: number; y: number; z: number };
  pitchDeg: number;
}

const STEP_DISTANCE = 0.02;
const EPSILON = 1e-4;

export function DepthViewCanvas({
  scene,
  sensor,
  resolution,
  cameraHeight
}: DepthViewCanvasProps) {
  const { t } = useTranslation();

  const frustumInfo = useMemo(() => {
    if (!scene || !sensor || !resolution) return undefined;

    const { width, depth, height } = scene.dimensions_m;
    const halfWidth = width / 2;
    const halfDepth = depth / 2;

    const corners = [
      new THREE.Vector3(-halfWidth, 0, -halfDepth),
      new THREE.Vector3(halfWidth, 0, -halfDepth),
      new THREE.Vector3(-halfWidth, height, -halfDepth),
      new THREE.Vector3(halfWidth, height, -halfDepth),
      new THREE.Vector3(-halfWidth, 0, halfDepth),
      new THREE.Vector3(halfWidth, 0, halfDepth),
      new THREE.Vector3(-halfWidth, height, halfDepth),
      new THREE.Vector3(halfWidth, height, halfDepth)
    ];

    const verticalFovRad = THREE.MathUtils.degToRad(sensor.depthFov_deg.vertical);
    const horizontalFovRad = THREE.MathUtils.degToRad(sensor.depthFov_deg.horizontal);

    const cameraY = Math.max(cameraHeight, 0.2);

    const minDistanceByWidth = halfWidth / Math.tan(horizontalFovRad / 2);
    const startDistance = Math.max(minDistanceByWidth, 0.3);

    let solution: FrustumInfo | undefined;

    for (
      let distance = startDistance;
      distance <= 100 && !solution;
      distance += STEP_DISTANCE
    ) {
      const position = new THREE.Vector3(0, cameraY, -distance);

      let minYaw = Number.POSITIVE_INFINITY;
      let maxYaw = Number.NEGATIVE_INFINITY;
      let minPitch = Number.POSITIVE_INFINITY;
      let maxPitch = Number.NEGATIVE_INFINITY;

      for (const corner of corners) {
        const relative = corner.clone().sub(position);
        const horizontalLen = Math.sqrt(relative.x ** 2 + relative.z ** 2);
        const yaw = Math.atan2(relative.x, relative.z);
        const pitch = Math.atan2(relative.y, horizontalLen);

        minYaw = Math.min(minYaw, yaw);
        maxYaw = Math.max(maxYaw, yaw);
        minPitch = Math.min(minPitch, pitch);
        maxPitch = Math.max(maxPitch, pitch);
      }

      const yawSpan = maxYaw - minYaw;
      const pitchSpan = maxPitch - minPitch;

      if (
        yawSpan > horizontalFovRad + EPSILON ||
        pitchSpan > verticalFovRad + EPSILON
      ) {
        continue;
      }

      const yaw = (minYaw + maxYaw) / 2;
      const pitch = (minPitch + maxPitch) / 2;

      const direction = new THREE.Vector3(
        Math.sin(yaw) * Math.cos(pitch),
        Math.sin(pitch),
        Math.cos(yaw) * Math.cos(pitch)
      ).normalize();

      let minProjection = Number.POSITIVE_INFINITY;
      let maxProjection = Number.NEGATIVE_INFINITY;

      for (const corner of corners) {
        const projection = corner.clone().sub(position).dot(direction);
        minProjection = Math.min(minProjection, projection);
        maxProjection = Math.max(maxProjection, projection);
      }

      const near = Math.max(0.1, minProjection - 0.2);
      const far = Math.max(near + 0.5, maxProjection + 0.2);

      const nearHeight = 2 * Math.tan(verticalFovRad / 2) * near;
      const nearWidth = 2 * Math.tan(horizontalFovRad / 2) * near;
      const farHeight = 2 * Math.tan(verticalFovRad / 2) * far;
      const farWidth = 2 * Math.tan(horizontalFovRad / 2) * far;

      const originCorner = new THREE.Vector3(halfWidth, 0, halfDepth);
      const localX = originCorner.x - position.x;
      const localY = position.y - originCorner.y;
      const localZ = originCorner.z - position.z;

      solution = {
        position,
        direction,
        near,
        far,
        nearWidth,
        nearHeight,
        farWidth,
        farHeight,
        localMeters: { x: localX, y: localY, z: localZ },
        localMillimeters: {
          x: localX * 1000,
          y: localY * 1000,
          z: localZ * 1000
        },
        pitchDeg: THREE.MathUtils.radToDeg(pitch)
      };
    }

    return solution;
  }, [scene, sensor, resolution, cameraHeight]);

  const originPosition = useMemo(() => {
    if (!scene) return undefined;
    const { width, depth } = scene.dimensions_m;
    return new THREE.Vector3(width / 2, 0, depth / 2);
  }, [scene]);

  const pitchDownDeg = frustumInfo ? Math.max(0, -frustumInfo.pitchDeg) : undefined;

  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900/30">
      <Canvas camera={{ position: [6, 4, 6], fov: 45 }}>
        <color attach="background" args={["#111a2b"]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 10, 8]} intensity={0.9} />
        <Suspense fallback={null}>
          <SceneBox scene={scene} originPosition={originPosition} />
          <SensorGizmo frustumInfo={frustumInfo} />
          {originPosition && (
            <BasisArrows origin={originPosition} labels={t.depthView} />
          )}
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
      {frustumInfo && (
        <div className="pointer-events-none absolute left-4 top-4 space-y-1 rounded-md bg-slate-900/80 px-3 py-2 text-xs text-slate-100 shadow">
          <p className="font-semibold text-slate-200">{t.depthView.overlayTitle}</p>
          <p>
            {t.depthView.axisX}: {frustumInfo.localMillimeters.x.toFixed(0)} {t.depthView.distanceUnit}
          </p>
          <p>
            {t.depthView.axisY}: {frustumInfo.localMillimeters.y.toFixed(0)} {t.depthView.distanceUnit}
          </p>
          <p>
            {t.depthView.axisZ}: {frustumInfo.localMillimeters.z.toFixed(0)} {t.depthView.distanceUnit}
          </p>
          {pitchDownDeg !== undefined && (
            <p>
              {t.depthView.pitchLabel}: {pitchDownDeg.toFixed(1)}{t.depthView.angleUnit}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function SceneBox({
  scene,
  originPosition
}: {
  scene?: SceneSpec;
  originPosition?: THREE.Vector3;
}) {
  if (!scene) return null;
  const { width, depth, height } = scene.dimensions_m;
  return (
    <group position={[0, height / 2, 0]}>
      <mesh
        position={[0, -height / 2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#2e3f57" side={THREE.DoubleSide} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
        <lineBasicMaterial color="#60a5fa" />
      </lineSegments>
      {originPosition && (
        <mesh position={[originPosition.x, originPosition.y, originPosition.z]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
        </mesh>
      )}
    </group>
  );
}

function SensorGizmo({ frustumInfo }: { frustumInfo?: FrustumInfo }) {
  const groupRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (groupRef.current && frustumInfo) {
      groupRef.current.position.copy(frustumInfo.position);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        frustumInfo.direction
      );
      groupRef.current.setRotationFromQuaternion(quaternion);
    }
  }, [frustumInfo]);

  const frustumGeometry = useMemo(() => {
    if (!frustumInfo) return undefined;
    const { near, far, nearWidth, nearHeight, farWidth, farHeight } = frustumInfo;

    const nearHalfW = nearWidth / 2;
    const nearHalfH = nearHeight / 2;
    const farHalfW = farWidth / 2;
    const farHalfH = farHeight / 2;

    const nearCorners = [
      new THREE.Vector3(-nearHalfW, nearHalfH, near),
      new THREE.Vector3(nearHalfW, nearHalfH, near),
      new THREE.Vector3(nearHalfW, -nearHalfH, near),
      new THREE.Vector3(-nearHalfW, -nearHalfH, near)
    ];

    const farCorners = [
      new THREE.Vector3(-farHalfW, farHalfH, far),
      new THREE.Vector3(farHalfW, farHalfH, far),
      new THREE.Vector3(farHalfW, -farHalfH, far),
      new THREE.Vector3(-farHalfW, -farHalfH, far)
    ];

    const geometry = new THREE.BufferGeometry();
    const points: number[] = [];

    nearCorners.forEach((corner) => {
      points.push(0, 0, 0, corner.x, corner.y, corner.z);
    });

    for (let i = 0; i < 4; i++) {
      const current = nearCorners[i];
      const next = nearCorners[(i + 1) % 4];
      points.push(current.x, current.y, current.z, next.x, next.y, next.z);
    }

    for (let i = 0; i < 4; i++) {
      const currentNear = nearCorners[i];
      const currentFar = farCorners[i];
      points.push(currentNear.x, currentNear.y, currentNear.z, currentFar.x, currentFar.y, currentFar.z);
    }

    for (let i = 0; i < 4; i++) {
      const current = farCorners[i];
      const next = farCorners[(i + 1) % 4];
      points.push(current.x, current.y, current.z, next.x, next.y, next.z);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [frustumInfo]);

  if (!frustumInfo || !frustumGeometry) return null;

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.12, 0.06, 0.16]} />
        <meshStandardMaterial color="#fb923c" />
      </mesh>
      <lineSegments geometry={frustumGeometry}>
        <lineBasicMaterial color="#fb923c" />
      </lineSegments>
    </group>
  );
}

function BasisArrows({
  origin,
  labels
}: {
  origin: THREE.Vector3;
  labels: TranslationEntry["depthView"];
}) {
  return (
    <group position={[origin.x, origin.y, origin.z]}>
      <AxisArrow direction={[1, 0, 0]} color="#ef4444" label={labels.axisX} />
      <AxisArrow direction={[0, 1, 0]} color="#22c55e" label={labels.axisY} />
      <AxisArrow direction={[0, 0, 1]} color="#3b82f6" label={labels.axisZ} />
    </group>
  );
}

function AxisArrow({
  direction,
  color,
  label
}: {
  direction: [number, number, number];
  color: string;
  label: string;
}) {
  const length = 1;
  const tipLength = 0.18;
  const shaftLength = length - tipLength;

  const dirVector = useMemo(
    () => new THREE.Vector3(...direction).normalize(),
    [direction]
  );
  const quaternion = useMemo(
    () =>
      new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dirVector
      ),
    [dirVector]
  );

  const shaftPosition = useMemo(
    () => dirVector.clone().multiplyScalar(shaftLength / 2),
    [dirVector, shaftLength]
  );
  const conePosition = useMemo(
    () => dirVector.clone().multiplyScalar(length),
    [dirVector, length]
  );
  const labelPosition = useMemo(
    () => dirVector.clone().multiplyScalar(length + 0.15),
    [dirVector, length]
  );

  return (
    <group>
      <mesh quaternion={quaternion} position={shaftPosition}>
        <cylinderGeometry args={[0.02, 0.02, shaftLength, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh quaternion={quaternion} position={conePosition}>
        <coneGeometry args={[0.06, tipLength, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Html position={labelPosition.toArray()} center>
        <div className="rounded bg-slate-900/80 px-1 py-1 text-[10px] text-slate-100 shadow">
          {label}
        </div>
      </Html>
    </group>
  );
}

