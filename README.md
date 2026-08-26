# think-collapse

把每轮最终结果之前的完整过程折叠成一个 Codex 风格的耗时行。
Collapse the complete pre-result process of every turn into one Codex-style duration row.

这是一个 DSH 客户端插件（web profile）。每轮回答完成后，插件会保留用户消息和最终
输出，把中间的 Think、工具调用、进度、重试等过程统一折叠到一个“耗时 X 分 X 秒”
折叠条中。点击折叠条可查看完整过程，再次点击即可收起。

## 文件结构

```
think-collapse-plugin/
├── package.json        # dsh.client 声明 + dsh.bundle.patch
├── cordis.patch.yml    # 把插件挂载进 profile 组合
├── client/
│   └── client.js       # 客户端束包：按轮次折叠最终结果前的过程
└── README.md
```


