Удобнее всего отлаживать скрипт во внешнем редакторе:

1. Добавить расширению права на открытие файловых ссылок (галочка в настройках расширения)
2. Удалить в расширении весь код, кроме заголовков расширения
3. Добавить в заголовки:
``` js
// @require        file:///C:/projects/js/userscript-redmine-delo/src/_redmine-delo.js
```

Скрипт разделён на файлы. Для разработки нужно подключать файлы через `@require` по алфавиту.

Скрипт сборки просто склеит их по алфавиту.

Чтобы обращаться к глобалам, надо их прокидывать через win.
Начало любого отделённого файла, как правило, будет таким:
``` js
win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var $ = win.$;
```

Главный файл должен идти первым, иначе будет ошибка.

Обновляйте этот девелоперский кусок кода:
``` js
// ==UserScript==
// @name           Redmine to Planfix
// @unwrap
// @noframes
// @run-at         document-end
// @include        http://delo.uramedia.ru/*
// @match          http://delo.uramedia.ru/*
// @grant          GM_addStyle
// @require        file:///C:/projects/js/userscript-redmine-delo/src/_redmine-delo.js
// @require        file:///C:/projects/js/userscript-redmine-delo/src/vue.min.js
// ==/UserScript==
```

Тест сборки:
``` js
// ==UserScript==
// @name           PlanfixFix
// @unwrap
// @noframes
// @run-at         document-end
// @include        http://delo.uramedia.ru/*
// @match          http://delo.uramedia.ru/*
// @grant          GM_addStyle
// @require        file:///C:/projects/js/userscript-planfixfix/dist/redmine-delo.user.js
// ==/UserScript==
```