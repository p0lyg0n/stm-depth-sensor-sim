export type SupportedLanguage = "ja" | "en" | "ko";

export interface TranslationEntry {
  appName: string;
  appDescription: string;
  appNotes: string;
  sensorPanel: {
    title: string;
    description: string;
    resolutionPlaceholder: string;
    specTitle: string;
  };
  sensorSpec: {
    heading: string;
    vendor: string;
    type: string;
    depthRange: string;
    fov: string;
    baseline: string;
    power: string;
    interfaces: string;
    imu: string;
    depthRes: string;
    rgbRes: string;
    notes: string;
  };
  scenePanel: {
    title: string;
    description: string;
    sizeLabel: (values: { width: number; depth: number; height: number }) => string;
    cameraPositionLabel: (values: { x: number; y: number; z: number }) => string;
    goalLabel: (goal?: string) => string;
  };
  cameraPanel: {
    title: string;
    description: string;
    heightLabel: string;
    distanceModeLabel: string;
    distanceModeAuto: string;
    distanceModeManual: string;
    manualDistanceLabel: string;
  };
  coveragePanel: {
    title: string;
    description: string;
    sceneLabel: string;
    sensorLabel: string;
    coverageLabel: string;
    coveragePending: string;
  };
  depthView: {
    overlayTitle: string;
    axisX: string;
    axisY: string;
    axisZ: string;
    pitchLabel: string;
    distanceUnit: string;
    angleUnit: string;
    maxRangeLabel: string;
    requiredRangeLabel: string;
    outOfRange: string;
    coverageGap: string;
  };
  language: {
    label: string;
    japanese: string;
    english: string;
    korean: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationEntry> = {
  ja: {
    appName: "Sports Time Machine Depth Sensor Sim",
    appDescription:
      "スポーツタイムマシンで使用する1ユニットの深度センサーを評価するための社内向けWebアプリです。",
    appNotes:
      "Z は基準壁からカメラまでの距離です。自動モードでは対象直方体を覆える最小距離を探索し、手動モードでは入力した距離で視錐を描画します。必要距離がセンサーの最大距離や入力した距離を超える場合は、レンジまたは視野角が不足していることを意味します。",
    sensorPanel: {
      title: "センサー選択",
      description:
        "比較したい深度センサーを切り替えて仕様と視野シミュレーションを確認します。",
      resolutionPlaceholder: "解像度を選択",
      specTitle: "センサー仕様"
    },
    sensorSpec: {
      heading: "センサー仕様",
      vendor: "メーカー",
      type: "種別",
      depthRange: "深度測定範囲",
      fov: "深度FOV (H×V)",
      baseline: "ベースライン",
      power: "消費電力",
      interfaces: "インターフェース",
      imu: "IMU",
      depthRes: "深度解像度",
      rgbRes: "RGB解像度",
      notes: "備考"
    },
    scenePanel: {
      title: "シーン選択",
      description: "測定範囲や環境を切り替えてセンサーのカバレッジを検証します。",
      sizeLabel: ({ width, depth, height }) =>
        `範囲サイズ: 幅 ${width}m / 奥行 ${depth}m / 高さ ${height}m`,
      cameraPositionLabel: ({ x, y, z }) =>
        `初期カメラ位置: x ${x}m, y ${y}m, z ${z}m`,
      goalLabel: (goal) => (goal ? `目標: ${goal}` : "")
    },
    cameraPanel: {
      title: "カメラの位置",
      description:
        "センサーの高さと壁からの距離を調整します。自動モードでは最小距離を探索し、手動モードでは任意の距離で視野を確認できます。",
      heightLabel: "高さ (m)",
      distanceModeLabel: "距離調整",
      distanceModeAuto: "自動",
      distanceModeManual: "手動",
      manualDistanceLabel: "壁からの距離 (m)"
    },
    coveragePanel: {
      title: "カバレッジ指標",
      description:
        "算出ロジックは今後実装予定です。現状はシーンやセンサーを切り替えて概況を確認するためのサマリーです。",
      sceneLabel: "シーン",
      sensorLabel: "センサー",
      coverageLabel: "被覆率",
      coveragePending: "計算未実装"
    },
    depthView: {
      overlayTitle: "カメラ位置 (mm) 基準: x0,y0,z0",
      axisX: "X",
      axisY: "Y",
      axisZ: "Z",
      pitchLabel: "下向き角度",
      distanceUnit: "mm",
      angleUnit: "°",
      maxRangeLabel: "センサー最大距離",
      requiredRangeLabel: "必要距離",
      outOfRange: "⚠ センサーの測距範囲を超えています",
      coverageGap: "⚠ この距離では視野角の制約により全体を覆えません"
    },
    language: {
      label: "言語",
      japanese: "日本語",
      english: "英語",
      korean: "韓国語"
    }
  },
  en: {
    appName: "Sports Time Machine Depth Sensor Sim",
    appDescription:
      "Internal web tool for evaluating single depth sensor units used in Sports Time Machine projects.",
    appNotes:
      "Z represents the distance from the reference wall to the camera. Auto mode searches for the minimal distance that covers the entire box, while manual mode visualizes the frustum at the specified distance. If the required distance exceeds the sensor\'s maximum range or your chosen distance, range or field of view is insufficient.",
    sensorPanel: {
      title: "Sensor Selection",
      description:
        "Switch between depth sensors to review specifications and visualize the simulated field of view.",
      resolutionPlaceholder: "Select resolution",
      specTitle: "Sensor Specifications"
    },
    sensorSpec: {
      heading: "Sensor Specifications",
      vendor: "Vendor",
      type: "Type",
      depthRange: "Depth range",
      fov: "Depth FOV (H×V)",
      baseline: "Baseline",
      power: "Power",
      interfaces: "Interfaces",
      imu: "IMU",
      depthRes: "Depth resolutions",
      rgbRes: "RGB resolutions",
      notes: "Notes"
    },
    scenePanel: {
      title: "Scene Selection",
      description: "Change measurement environments to verify coverage for each sensor.",
      sizeLabel: ({ width, depth, height }) =>
        `Area size: Width ${width}m / Depth ${depth}m / Height ${height}m`,
      cameraPositionLabel: ({ x, y, z }) =>
        `Default camera position: x ${x}m, y ${y}m, z ${z}m`,
      goalLabel: (goal) => (goal ? `Goal: ${goal}` : "")
    },
    cameraPanel: {
      title: "Camera Position",
      description:
        "Adjust the sensor height and distance from the wall. Auto mode finds the minimum distance, while manual mode lets you inspect any distance.",
      heightLabel: "Height (m)",
      distanceModeLabel: "Distance Control",
      distanceModeAuto: "Auto",
      distanceModeManual: "Manual",
      manualDistanceLabel: "Distance from wall (m)"
    },
    coveragePanel: {
      title: "Coverage Metrics",
      description:
        "Computation logic will be implemented later. For now this panel summarizes the selected scene and sensor.",
      sceneLabel: "Scene",
      sensorLabel: "Sensor",
      coverageLabel: "Coverage",
      coveragePending: "Not implemented"
    },
    depthView: {
      overlayTitle: "Camera position (mm) origin: x0,y0,z0",
      axisX: "X",
      axisY: "Y",
      axisZ: "Z",
      pitchLabel: "Tilt angle",
      distanceUnit: "mm",
      angleUnit: "°",
      maxRangeLabel: "Sensor max range",
      requiredRangeLabel: "Required distance",
      outOfRange: "⚠ Scene exceeds sensor range",
      coverageGap: "⚠ Field of view cannot cover the entire scene at this distance"
    },
    language: {
      label: "Language",
      japanese: "Japanese",
      english: "English",
      korean: "Korean"
    }
  },
  ko: {
    appName: "Sports Time Machine Depth Sensor Sim",
    appDescription:
      "스포츠 타임머신 프로젝트에서 사용할 단일 깊이 센서를 평가하기 위한 사내용 웹 애플리케이션입니다.",
    appNotes:
      "Z 값은 기준 벽과 카메라 사이의 거리입니다. 자동 모드에서는 직육면체 전체를 덮는 최소 거리를 탐색하고, 수동 모드에서는 입력한 거리에서의 시야를 그립니다. 필요 거리가 센서 최대 거리나 입력한 거리보다 크면 측정 범위 또는 시야각이 부족합니다.",
    sensorPanel: {
      title: "센서 선택",
      description: "비교할 깊이 센서를 전환하면서 사양과 시야 시뮬레이션을 확인합니다.",
      resolutionPlaceholder: "해상도를 선택",
      specTitle: "센서 사양"
    },
    sensorSpec: {
      heading: "센서 사양",
      vendor: "제조사",
      type: "유형",
      depthRange: "깊이 측정 범위",
      fov: "깊이 FOV (H×V)",
      baseline: "베이스라인",
      power: "소비 전력",
      interfaces: "인터페이스",
      imu: "IMU",
      depthRes: "깊이 해상도",
      rgbRes: "RGB 해상도",
      notes: "비고"
    },
    scenePanel: {
      title: "씬 선택",
      description: "측정 범위와 환경을 전환하여 센서의 커버리지를 검증합니다.",
      sizeLabel: ({ width, depth, height }) =>
        `영역 크기: 폭 ${width}m / 깊이 ${depth}m / 높이 ${height}m`,
      cameraPositionLabel: ({ x, y, z }) =>
        `초기 카메라 위치: x ${x}m, y ${y}m, z ${z}m`,
      goalLabel: (goal) => (goal ? `목표: ${goal}` : "")
    },
    cameraPanel: {
      title: "카메라 위치",
      description: "센서의 높이와 벽으로부터의 거리를 조정합니다. 자동 모드는 최소 거리를, 수동 모드는 원하는 거리를 확인할 수 있습니다.",
      heightLabel: "높이 (m)",
      distanceModeLabel: "거리 조절",
      distanceModeAuto: "자동",
      distanceModeManual: "수동",
      manualDistanceLabel: "벽까지 거리 (m)"
    },
    coveragePanel: {
      title: "커버리지 지표",
      description: "계산 로직은 추후 구현 예정입니다. 현재는 선택한 씬과 센서를 요약해서 보여줍니다.",
      sceneLabel: "씬",
      sensorLabel: "센서",
      coverageLabel: "커버리지",
      coveragePending: "미구현"
    },
    depthView: {
      overlayTitle: "카메라 위치 (mm) 기준: x0,y0,z0",
      axisX: "X",
      axisY: "Y",
      axisZ: "Z",
      pitchLabel: "하향 각도",
      distanceUnit: "mm",
      angleUnit: "°",
      maxRangeLabel: "센서 최대 거리",
      requiredRangeLabel: "필요 거리",
      outOfRange: "⚠ 이 조건에서는 센서 측정 범위를 초과합니다",
      coverageGap: "⚠ 이 거리에서는 시야각으로 전체 장면을 덮을 수 없습니다"
    },
    language: {
      label: "언어",
      japanese: "일본어",
      english: "영어",
      korean: "한국어"
    }
  }
};

export function formatCoverage(coverageRatio: number | undefined, language: SupportedLanguage) {
  if (coverageRatio === undefined) return translations[language].coveragePanel.coveragePending;
  return `${(coverageRatio * 100).toFixed(1)}%`;
}
