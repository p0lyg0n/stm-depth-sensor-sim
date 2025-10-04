# Sports Time Machine Depth Sensor Sim

社内向けに深度センサーの視野カバレッジを検証するためのWebアプリです。スポーツタイムマシンで使用する1ユニットの深度センサーを想定し、3Dシミュレーションで視野とカバレッジを確認できます。

## 現状の主な機能
- **センサー選択**: ZED 2i / Femto Bolt を含む静的JSONから読み込み、仕様と視野を切り替え。
- **シーン選択**: 屋内テストシーン（幅4m × 奥行2m × 高さ2.4m）を読み込み、カバレッジを確認。
- **カメラ高さ調整**: UIから高さを入力し、全域をカバーできる最小距離と方向を自動計算。
- **3D視覚化**: Three.js (react-three-fiber) で対象範囲・視錐・基準軸を描画。カメラの俯角と基準壁角からの座標をオーバーレイ表示。
- **言語切替**: 日本語（デフォルト）/ 英語 / 韓国語のUI切り替え。

## 技術スタック
- Next.js 14 (App Router) + TypeScript
- React / Zustand / Tailwind CSS
- Three.js + @react-three/fiber + drei

## 開発環境セットアップ
```bash
# 依存インストール
npm install

# 開発サーバー起動 (http://localhost:3000)
npm run dev

# Lint チェック
npm run lint
```

## ディレクトリ構成（抜粋）
```
app/                 # Next.js App Router
  layout.tsx         # メタデータ・共通レイアウト
  page.tsx           # ダッシュボードエントリ
components/          # UI コンポーネント群
  DashboardShell.tsx
  DepthViewCanvas.tsx
  LanguageSwitcher.tsx
  ...
data/
  sensors.json       # 深度センサー仕様プリセット
  scenes.json        # シーン定義
hooks/
  useAppStore.ts     # Zustand ストア
  useTranslation.ts  # 多言語フック
lib/
  i18n.ts            # 翻訳辞書
  types.ts           # 型定義
  loadData.ts        # 静的データ読み込み
```

## デバッグメモ
- `npm run dev` でホットリロードしながらUI確認。
- Zustandストアは `hooks/useAppStore.ts`。必要に応じて `console.log` や React DevTools を利用。
- Three.jsの視錐表示を調整したい場合は `components/DepthViewCanvas.tsx` を参照（視線角度探索ロジックあり）。

## 今後のタスク候補
- カバレッジ指標の実装（現状はプレースホルダー）。
- センサー追加時のJSON更新、UIでの入力機能。
- FOVが解像度に依存する機種への対応（データ構造拡張）。
- 言語設定の永続化（localStorage等）。
- CI導入やユニットテスト整備。

## GitHub へのアップロード手順例
```bash
# 状態確認
git status

# 変更内容の確認
git diff

# コミット
git add .
git commit -m "Add multilingual UI and camera angle overlay"

# リモートリポジトリへプッシュ
git push origin main   # ブランチ名は適宜変更
```

---
継続開発時は、`README.md` を随時更新しながら進捗・仕様変更を管理してください。
