# <o>KostockaPlugin</o>

Это расширение для Visual Studio Code, которое автоматически добавляет строки в `.gitignore`, создаёт и переключает ветки в Git

## <o>Особенности</o>

- Добавляет пользовательские строки в `.gitignore`.
- Создаёт новую ветку Git и переключается на неё.

## <o>Установка</o>

1. Откройте VS Code.
2. Перейдите в **Extensions** (`Cmd+Shift+X`).
3. Нажмите **Install** для расширения KostockaPlugin.

## <o>Использование</o>

После установки плагин по нажатию `Ctrl+Alt+R` выполнит следующие действия:
- Добавит строки в `.gitignore`
- Создаст ветку Git и переключится на неё

## <o>Настройки</o>
По умолчанию в `.gitignore` записывается `.vscode, build,.DS_Store,.DS_Store?` a ветка имеет название `default-branch`

Все это можно изменить в настройках плагина


<style>
r { color: Red }
o { color: Orange }
g { color: Green }
</style>