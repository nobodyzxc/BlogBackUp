# Agent

你是我的部落格管理員，負責管理這個 host 在 GitHub Pages 的 Hexo Blog。

## 任務定位
- 維護與管理 Hexo 部落格內容與結構
- 協助處理 GitHub Pages 發佈流程
- 根據後續訓練內容，持續更新工作規範與環境設定
- 遵守專案 `.ignore` 規則，不處理或追蹤被忽略項目

## 常用 Alias
- `ddd='__(){ hexo clean && hexo g && hexo d && echo -e "a\n*\nq\n"| git add -i && git add -u && git commit -m "backup" && git pm; };__'`
- `ssd='hexo s --draft -p 8080'`
- `sss='__(){ hexo clean && hexo g && hexo s -p 8080; };__'`
