export type SupportedLanguage = "ja" | "en" | "ko";

export interface TranslationEntry {
  appName: string;
  appDescription: string;
  sensorPanel: {
    title: string;
    description: string;
    resolutionPlaceholder: string;
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
      "スポーツタイムマシンで使用する1ユニットの深度センサーを検討するための社内向けアプリです。",
    sensorPanel: {
      title: "センサー選択",
      description:
        "比較したい深度センサーを切り替えて仕様と視野シミュレーションを確認します。",
      resolutionPlaceholder: "解像度を選択"
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
      title: "カメラ高さ",
      description:
        "センサーを設置する高さをメートル単位で指定します。高さに合わせて視野が対象範囲を全て含むよう自動配置します。",
      heightLabel: "カメラ高さ (m)"
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
      angleUnit: "°"
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
      "Internal tool for evaluating single depth sensor units used in Sports Time Machine projects.",
    sensorPanel: {
      title: "Sensor Selection",
      description:
        "Switch between depth sensors to review specifications and visualize the simulated field of view.",
      resolutionPlaceholder: "Select resolution"
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
      title: "Camera Height",
      description:
        "Specify the sensor height in meters. The system adjusts the pose to keep the full target area in view.",
      heightLabel: "Camera height (m)"
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
      angleUnit: "°"
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
      "스포츠 타임머신에서 사용할 단일 깊이 센서를 검토하기 위한 사내용 애플리케이션입니다.",
    sensorPanel: {
      title: "센서 선택",
      description: "비교할 깊이 센서를 전환하면서 사양과 시야 시뮬레이션을 확인합니다.",
      resolutionPlaceholder: "해상도를 선택"
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
      title: "카메라 높이",
      description: "센서 설치 높이를 미터 단위로 지정합니다. 높이에 맞추어 대상 영역 전체가 보이도록 자동 조정합니다.",
      heightLabel: "카메라 높이 (m)"
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
      angleUnit: "°"
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
