# CodeBuddy CLI 启动器

一个轻量的 VS Code 扩展，让你一键在**独立分屏终端**中启动 CodeBuddy CLI（`cbc`）。

> 交互方式受 [iFlow CLI Companion](https://github.com/iflow-ai/iflow-cli) 启发，但本扩展只做「启动器」一件事：**纯净、零运行时依赖、无需编译**。

## 功能特性

- **独立分组终端**：点击按钮即在编辑器右侧（`ViewColumn.Beside`）新开一个终端分组并运行 `cbc`，不挤占当前编辑区
- **编辑器标题栏按钮**：编辑器右上角常驻启动图标（采用 CodeBuddy CN 桌面版图标）
- **命令面板入口**：`Ctrl/Cmd + Shift + P` 输入 `CodeBuddy CLI: 启动终端`
- **CLI 缺失检测**：未安装 `cbc` 时给出明确提示，不静默失败
- **零依赖**：仅 `require('vscode')` 与 `child_process`，无 `node_modules`、无需打包构建

## 安装

### 方式一：从源码构建

```bash
# 需要已安装 Node.js 与 @vscode/vsce
npm install -g @vscode/vsce
vsce package --allow-missing-repository
code --install-extension codebuddy-cli-launcher-1.0.0.vsix
```

### 方式二：命令面板

1. `Ctrl/Cmd + Shift + P` 打开命令面板
2. 输入 `CodeBuddy CLI: 启动终端` 并回车

## 使用

- 点击编辑器标签页右上角的 CodeBuddy 图标，或
- 命令面板执行 `CodeBuddy CLI: 启动终端`

扩展会在右侧新开终端并自动执行 `cbc`，进入交互式 CLI。

## 可用命令

| 命令 ID | 命令面板名称 | 说明 |
| --- | --- | --- |
| `codebuddyCli.launch` | `CodeBuddy CLI: 启动终端` | 在独立分组终端中启动 CodeBuddy CLI |

## 工作原理

扩展激活时注册命令；命令执行时：

1. 调用 `vscode.window.createTerminal({ location: { viewColumn: ViewColumn.Beside } })` 在编辑器右侧新开一个终端分组；
2. 通过 `execSync('cbc --version')` 探测 CLI 是否可用（缺失仅提示，不阻断启动）；
3. `terminal.sendText('cbc')` 在终端中启动 CLI。

## 目录结构

```
codebuddy-cli-launcher/
├── extension.js           # 扩展入口（纯 JavaScript）
├── package.json           # 扩展清单与命令/菜单贡献
├── assets/
│   ├── icon.png           # 市场图标（CodeBuddy CN 桌面版图标）
│   └── icon-titlebar.png  # 标题栏按钮图标（32×32）
├── LICENSE
└── README.md
```

## 开发

在 VS Code 中打开本目录，按 `F5` 启动「扩展开发宿主」即可调试。

## 许可证

[MIT](./LICENSE) © JDGMR
