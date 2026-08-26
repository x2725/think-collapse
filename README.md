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


