## Пейпо Константин М3105 
# <o>KostockaPlugin</o>

Это расширение для Visual Studio Code, которое автоматически добавляет строки в `.gitignore`, создаёт и переключает ветки в Git а так же собирает папку build через cmake

## Особенности

- Добавляет пользовательские строки в `.gitignore`
- Создаёт новую ветку Git и переключается на неё
- Создаёт папку build и собирает cmake

## <g>Установка</g>

1. Откройте VS Code
2. Перейдите в **Extensions** (`Cmd+Shift+X`)
3. Нажмите на три точки в вернем углу и перейдите в `Установка из VSIX`
4. Найдите скачаный плагин и установите

## Использование

После установки плагин по нажатию `Cmd+Shift+T` выполнит следующие действия:
- Добавит строки в `.gitignore`
- Создаст ветку Git и переключится на неё
- Создаст cmake build

## Настройки
По умолчанию в `.gitignore` записывается `.vscode, build,.DS_Store,.DS_Store?` a ветка имеет название `default-branch`

Все это можно изменить в настройках плагина
В сочетании клавиш VS Code можно изменить назначеные клавишы

## <r>Примечание</r>
Данный плагин персонализирован под опреденые задачи и его поведение в различных проектах неопределено

<style>
r { color: Red }
o { color: Orange }
g { color: Green }
</style>
