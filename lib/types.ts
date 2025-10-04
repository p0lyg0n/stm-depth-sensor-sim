export type FpsOption = number;

export interface ResolutionSpec {
  label?: string;
  width: number;
  height: number;
  fps: FpsOption[];
}

export interface DepthRange {
  min: number;
  max: number;
  recommendedMax?: number;
}

export interface FieldOfView {
  horizontal: number;
  vertical: number;
  diagonal?: number;
}

export interface SensorSpec {
  id: string;
  name: string;
  vendor: string;
  sensorType: "stereo_rgb_depth" | "tof" | string;
  baseline_mm?: number;
  depthRange_m: DepthRange;
  depthFov_deg: FieldOfView;
  rgbFov_deg?: FieldOfView;
  depthResolutions: ResolutionSpec[];
  rgbResolutions?: ResolutionSpec[];
  imu?: Record<string, boolean>;
  illumination?: Record<string, string | number | boolean>;
  interfaces: string[];
  power_W?: number;
  operatingTemperature_C?: {
    min: number;
    max: number;
  };
  environmentalRating?: string;
  sdkSupport?: string[];
  notes?: string[];
}

export interface SceneDimensions {
  width: number;
  depth: number;
  height: number;
}

export interface SceneSpec {
  id: string;
  name: string;
  description?: string;
  environment: "indoor" | "outdoor" | string;
  dimensions_m: SceneDimensions;
  origin: {
    reference: string;
    notes?: string;
  };
  defaultCameraPose?: {
    position_m: {
      x: number;
      y: number;
      z: number;
    };
    rotation_deg?: {
      yaw?: number;
      pitch?: number;
      roll?: number;
    };
    notes?: string;
  };
  constraints?: Record<string, string>;
  annotations?: string[];
}
