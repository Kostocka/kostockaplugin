import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

async function addLinesToGitignore() {
    try {
        const rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!rootPath) {
            vscode.window.showErrorMessage('Рабочая папка не открыта. Пропускаем добавление в .gitignore.');
            return;
        }

        const gitignorePath = path.join(rootPath, '.gitignore');
        const config = vscode.workspace.getConfiguration('kostockaplugin');
        const lines: string[] = config.get('gitignoreLines', []);

        if (fs.existsSync(gitignorePath)) {
            const content = fs.readFileSync(gitignorePath, 'utf-8');
            const newLines = lines.filter(line => !content.includes(line));
            if (newLines.length > 0) {
                fs.appendFileSync(gitignorePath, '\n' + newLines.join('\n'));
                vscode.window.showInformationMessage('Добавлены строки в .gitignore: ' + newLines.join(', '));
            } else {
                vscode.window.showInformationMessage('Все строки уже присутствуют в .gitignore.');
            }
        } else {
            fs.writeFileSync(gitignorePath, lines.join('\n'));
            vscode.window.showInformationMessage('.gitignore файл не найден. Создан новый и добавлены строки.');
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Ошибка при работе с .gitignore: ${errorMessage}`);
    }
    
}

async function createAndSwitchBranch() {
    try {
        const config = vscode.workspace.getConfiguration('kostockaplugin');
        const branchName: string = config.get('defaultBranchName', 'feature/default-branch');

        if (!/^[a-zA-Z0-9-_./]+$/.test(branchName)) {
            vscode.window.showErrorMessage('Некорректное имя ветки. Проверьте настройки.');
            return;
        }

        const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
        if (!gitExtension) {
            vscode.window.showErrorMessage('Расширение Git недоступно.');
            return;
        }

        const api = gitExtension.getAPI(1);
        const repository = api?.repositories?.[0];
        if (!repository) {
            vscode.window.showErrorMessage('Git-репозиторий не найден. Пропускаем создание ветки.');
            return;
        }

        const branches = await repository.getBranches();
        if (branches.some((branch: { name: string }) => branch.name === branchName)) {
            vscode.window.showInformationMessage(`Ветка ${branchName} уже существует. Переключаемся на нее.`);
            await repository.checkout(branchName);
        } else {
            vscode.window.showInformationMessage(`Создаем и переключаемся на новую ветку: ${branchName}`);
            await repository.createBranch(branchName, true);
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Ошибка при создании или переключении ветки: ${errorMessage}`);
    }
}


async function runAllTasks() {
    try {
        console.log('Запуск всех задач...');
        await addLinesToGitignore();
        await createAndSwitchBranch();
        console.log('Задачи завершены.');
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Ошибка при выполнении задач: ${errorMessage}`);
    }
    
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Ваше расширение "kostockaplugin" активно!');

    const runAllTasksCommand = vscode.commands.registerCommand('kostockaplugin.runAllTasks', async () => {
        try {
            console.log('Команда "runAllTasks" вызвана!');
            await runAllTasks();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`Ошибка при выполнении команды: ${errorMessage}`);
        }
    });

    context.subscriptions.push(runAllTasksCommand);

    const config = vscode.workspace.getConfiguration('kostockaplugin');
    const keybinding: string = config.get('keybinding', 'ctrl+alt+r');

    context.subscriptions.push(
        vscode.commands.registerCommand(`extension.bindKey.runAllTasks`, () => {
            vscode.commands.executeCommand('kostockaplugin.runAllTasks');
        })
    );

    vscode.commands.executeCommand('setContext', 'kostockaplugin.runAllTasksKeybinding', keybinding);

    console.log('Команда "runAllTasks" зарегистрирована.');
}

export function deactivate() {}
