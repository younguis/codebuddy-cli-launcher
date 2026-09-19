// CodeBuddy CLI 启动器：编辑器标题栏按钮 / 命令面板在独立分组终端中启动 cbc
const vscode = require('vscode');
const cp = require('child_process');

const CLI_COMMAND = 'cbc';
const TERMINAL_NAME = 'CodeBuddy';

function launchCli() {
	// 参照 iflow companion 的做法：在编辑器旁边新开一个终端分组
	const terminal = vscode.window.createTerminal({
		name: TERMINAL_NAME,
		location: { viewColumn: vscode.ViewColumn.Beside, preserveFocus: false }
	});
	terminal.show();
	// 先探测 CLI 是否可用，仅提示不阻断
	try {
		cp.execSync(`${CLI_COMMAND} --version`, { stdio: 'pipe' });
	} catch {
		vscode.window.showErrorMessage(
			`未检测到 ${TERMINAL_NAME} CLI（${CLI_COMMAND}）。请先安装后再使用本功能。`
		);
	}
	terminal.sendText(CLI_COMMAND);
}

function activate(context) {
	const cmd = vscode.commands.registerCommand('codebuddyCli.launch', launchCli);

	context.subscriptions.push(cmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
