// CodeBuddy CLI 启动器：标题栏按钮 / 命令面板 / 资源管理器右键 在独立分组终端中启动 cbc
const vscode = require('vscode');
const cp = require('child_process');
const path = require('path');

const CLI_COMMAND = 'cbc';
const BASE_NAME = 'CodeBuddy';

// 自动推断工作目录：标题栏/命令面板启动落在当前工作区根目录
function resolveWorkspaceCwd() {
	const folders = vscode.workspace.workspaceFolders;
	if (folders && folders.length > 0) {
		return folders[0].uri.fsPath;
	}
	return undefined;
}

function launch(cwd) {
	// 终端复用：同名终端已存在则只聚焦，避免重复开分组（同一目录重复启动不会新增终端）
	const name = cwd ? `${BASE_NAME} · ${path.basename(cwd)}` : BASE_NAME;
	const existing = vscode.window.terminals.find((t) => t.name === name);
	if (existing) {
		existing.show();
		return;
	}
	const terminal = vscode.window.createTerminal({
		name,
		cwd,
		location: { viewColumn: vscode.ViewColumn.Beside, preserveFocus: false }
	});
	terminal.show();
	try {
		cp.execSync(`${CLI_COMMAND} --version`, { stdio: 'pipe' });
	} catch {
		vscode.window.showErrorMessage(
			`未检测到 ${BASE_NAME} CLI（${CLI_COMMAND}）。请先安装后再使用本功能。`
		);
	}
	terminal.sendText(CLI_COMMAND);
}

function activate(context) {
	context.subscriptions.push(
		// 标题栏按钮 / 命令面板：在当前工作区根目录启动
		vscode.commands.registerCommand('codebuddyCli.launch', () => launch(resolveWorkspaceCwd())),
		// 资源管理器右键：在指定文件夹启动
		vscode.commands.registerCommand('codebuddyCli.launchHere', (uri) =>
			launch(Array.isArray(uri) ? (uri[0] && uri[0].fsPath) : (uri && uri.fsPath))
		)
	);
}

function deactivate() {}

module.exports = { activate, deactivate };
