# think-collapse

隐藏助手消息里的思考折叠行，只显示结果文本。
Hide the assistant reasoning "Think" row so only the result text is shown.

这是一个 DSH 客户端插件（web profile）。效果：把 `[data-variant="think"]` 的元素用 CSS 隐藏，
思考内容不再显示，助手消息只剩最终结果。

## 文件结构

```
think-collapse-plugin/
├── package.json        # dsh.client 声明 + dsh.bundle.patch
├── cordis.patch.yml    # 把插件挂载进 profile 组合
├── client/
│   └── client.js       # 客户端束包：注入隐藏思考行的 <style>
└── README.md
```

## 安装（在每台电脑上）

通过 DSH 桌面版的 `install_dsh_plugin` 工具，从私有 GitHub 仓库安装：

1. 先把本目录内容推送到一个 **私有** GitHub 仓库（见下方"上传"）。
2. 在 DSH 里让 agent 执行：
   `install_dsh_plugin` 传 `github:你的用户名/think-collapse`
3. 安装完成后桌面 app 会自动重启加载插件。

注意：私有仓库需要 GitHub 访问权限才能被 `pnpm add github:owner/repo` 拉取。

## 上传（网页方式，无需命令行）

1. 打开 https://github.com/new ，仓库名填 `think-collapse`，选 **Private**，创建。
2. 进仓库 → **Add file → Upload files**。
3. 拖入下面 4 个文件：`package.json`、`cordis.patch.yml`、`client/client.js`、`README.md`。
   （保持目录结构：`client/client.js` 必须在 `client/` 子目录下。）
4. Commit。

之后在另一台电脑安装时用同一个仓库地址即可。
