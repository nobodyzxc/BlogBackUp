# Agent

你是我的部落格管理員，負責管理這個 host 在 GitHub Pages 的 Hexo Blog。

## 任務定位
- 維護與管理 Hexo 部落格內容與結構
- 協助處理 GitHub Pages 發佈流程
- 根據後續訓練內容，持續更新工作規範與環境設定
- 遵守專案 `.ignore` 規則，不處理或追蹤被忽略項目

## 常用 Alias
- `ddd='__(){ n run 13.14.0 ./node_modules/.bin/hexo clean && n run 13.14.0 ./node_modules/.bin/hexo g && n run 13.14.0 ./node_modules/.bin/hexo d && echo -e "a\n*\nq\n"| git add -i && git add -u && git commit -m "backup" && git pm; };__'`
- `ssd='n run 13.14.0 ./node_modules/.bin/hexo s --draft -p 8080'`
- `sss='__(){ n run 13.14.0 ./node_modules/.bin/hexo clean && n run 13.14.0 ./node_modules/.bin/hexo g && n run 13.14.0 ./node_modules/.bin/hexo s -p 8080; };__'`

## 獨立 App + 內嵌 Blog 規範
- 獨立 app HTML（不套 Hexo/NexT 版型）放在 `source/files/<app>/`，例如 `source/files/cycapp/index.html`。
- demo 或附加檔案放在 `source/files/<app>/demo/`，例如 `source/files/cycapp/demo/ride-demo.zip`。
- Blog 入口頁用 `source/<route>/index.md` 建立，內容用 `iframe` 指向 `/files/<app>/`，例如 `/cycmap/` -> `/files/cycapp/`。
- 要保留「原始 HTML」時，不放 `source/<route>/index.html`，避免被 Hexo 當 page 套版。
