# depthcam-selection アーキテクチャメモ

## 採用スタック
- フロント: Next.js 14 (App Router) + TypeScript + React
- 3D描画: Three.js (react-three-fiber + drei)
- 状態管理: Zustand (センサー/シーン選択、UI状態)
- UIコンポーネント: Tailwind CSS + Headless UI (モーダルやドロップダウン)
- データ取得: `data/` フォルダ内の静的JSON読み込み（ビルド時/ランタイムでfetch）
- デプロイ: Vercel (Edge対応ページは将来的に検討)

## ディレクトリ構成案
```
root
├─ app/               # Next.js App Router
│  ├─ layout.tsx
│  ├─ page.tsx        # トップページ（センサー比較）
│  └─ scenes/         # シーン詳細などサブページ（必要に応じて）
├─ components/
│  ├─ SensorSelector.tsx
│  ├─ SceneSelector.tsx
│  ├─ DepthViewCanvas.tsx  # react-three-fiber キャンバス
│  └─ CoverageStats.tsx
├─ hooks/
│  └─ useSensorData.ts
├─ lib/
│  ├─ types.ts
│  ├─ loadSensors.ts   # JSONロードユーティリティ
│  └─ math/
├─ public/
│  └─ assets/          # 必要ならアイコン等
├─ data/
│  ├─ sensors.json
│  └─ scenes.json
└─ docs/
   ├─ sensor-specs.md
   └─ architecture.md
```

## コア機能の流れ
1. ページ初期化時に`data/sensors.json`と`data/scenes.json`を読み込む。
2. Zustandストアで現在選択中のセンサー/シーン/解像度を管理。
3. `SceneSelector`でシーンを選択 → Three.jsシーンへ反映。
4. `SensorSelector`でセンサーと解像度・FPSを選択 → Three.jsで視錐台を更新。
5. `DepthViewCanvas`でシーン直方体とセンサー視野を表示。
6. ビジネスロジック(`lib/math`)で被覆率・未カバー量を計算し、`CoverageStats`で表示。

## 初期スプリント目標
1. Next.js + TypeScript プロジェクト初期化。
2. `data/` の静的読み込みと型定義。
3. センサー/シーン選択UI（リスト表示と切り替え）
4. Three.jsキャンバスで直方体と視野矩形をレンダリング。
5. 被覆率計算ロジックの雛形実装。

## 将来拡張メモ
- 複数カメラ同時表示・比較モード。
- CSV/JSONで設定をエクスポート・インポート。
- 本番データソース（APIやDB）への移行。
- 屋外シーン・遮蔽物オブジェクトの導入。
- 認証（SSO）やアクセスログ連携。
