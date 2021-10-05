// ==UserScript==
// @name         Redmine to Planfix
// @author       popstas
// @namespace    1mediainvest.ru
// @version        0.0.1
// @description  Redmine to Planfix
// @author       popstas
// @match        http://delo.uramedia.ru/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/1mediainvest/userscript-redmine-delo/master/dist/redmine-delo.user.js
// ==/UserScript==
/**
 * @param {Object} window.unsafeWindow window
 * @param {Object} $ jQuery
 */
let $; // заглушает ошибки в определении $ в модулях

(function() {
  'use strict';
  var u = 'undefined';
  var win = typeof unsafeWindow != u ? unsafeWindow : window;
  var $ = win.$;

  GM_addStyle(`
/* task page */
.action-show #content { background: #f7f7f7; border: none; }

/* task description */
div.issue { background: none }
.issue.details .subject h3 { font-size: 28px }

.issue.details .attributes { opacity: 0.2 }
.issue.details .attributes:hover { opacity: 1 }

.issue.details .description .contextual { display: none }
.issue.details .description:hover .contextual { display: block }

.issue.details #issue_tree { opacity: 0.2 }
.issue.details #relations { opacity: 0.2 }
.issue.details hr { display: none }

/* task action card */
#history .journal { margin-bottom: 30px; background: #fff; padding: 12px 12px 0; border-radius: 12px; }
#history .journal .action-header a { margin-left: 16px; }
#history .journal .task-status { float: right; color: #959595; }
/*#history .journal h4 { color: #fff; border: none; }*/
/*#history .journal h4 a:first-child { margin-left: -65px; }*/

/* status-3 - решена */
.issues .closed,
.issues .status-3{ opacity: 0.5 }
.issues .closed:hover,
.issues .status-3:hover { opacity: 1 }





/* Agile */
.controller-agile_boards #sidebar { display: none; }
.controller-agile_boards #content { width: auto !important; background: #f7f7f7; /*padding-left: 0;*/ }
.controller-agile_boards .agile-board { margin-left: -25px; }
.controller-agile_boards .container-fixed { overflow-x: auto; }
.controller-agile_boards table.list.issues-board { table-layout: auto; border: none; overflow-x: auto; }
.controller-agile_boards table.list.issues-board td,
.controller-agile_boards table.list.issues-board th{ min-width: 230px; padding: 10px; border: none; }
@media(min-width: 1300px) {
  .controller-agile_boards table.list.issues-board td,
  .controller-agile_boards table.list.issues-board th{ min-width: 300px; }
}
.controller-agile_boards table tr.issue { background: inherit !important; }


/* agile card */
.controller-agile_boards .issue-card {
  position: relative;
  width: auto; margin: 10px 0; padding: 12px; float: none; background: #fff; border-radius: 12px; border: none;
  box-shadow: 0 1px 2px rgb(156 156 156 / 25%);
}
.controller-agile_boards .issue-card .issue-id strong { position: absolute; bottom: 12px; right: 12px; font-size: 8px; }
.controller-agile_boards .issue-card .info { border: none; margin-bottom: -2px; }
.controller-agile_boards .issue-card .info .user { font-size: 8px; }
.controller-agile_boards .issue-card .name { font-size: 16px; }
.controller-agile_boards .issue-card .name a { color: #4573b1 !important; }
.controller-agile_boards .issue-card .attributes { position: absolute; bottom: 12px; left: 110px; font-size: 8px }
.controller-agile_boards .issue-card .attributes b { display: none; }
`);


  // удаляет лишнее на странице таски
  function removeGarbageActionsList(tasks) {
    tasks.each(function() {
      const task = $(this);
      task.find('h4').each(function(){
        const h4 = $(this);

        const header = $('<div class="action-header"></div>');

        const inner = h4.find('*');
        inner.appendTo(header);

        h4.wrap(header);
        h4.remove();
      });
    });
  }

  // удаляет лишнее на странице таски
  function processTask(tasks) {
    tasks.each(function() {
      const task = $(this);

      task.find('.details li').each(function(){
        const li = $(this);
        const text = li.text();
        //console.log(text);
        let res;

        // Статус
        if(res = text.match(/Параметр Статус изменился с(.*?) на (.*)/)) {
          const [_, from, to] = res;
          //console.log(to);
          task.find('.action-header').append(`<div class="task-status">${from} &rarr; ${to}</div>`);
          li.remove();
        };

        // Кому
        if(res = text.match(/Параметр Назначена изменился с (.*? .*?) на (.*)/)) {
          const [_, from, to] = res;
          //console.log(to);
          task.find('.action-header').append(` &rarr; ${to}`);
          li.remove();
        };
      });
    });
  }

  function processTaskItems() {
    const tasks = $('#history .journal');
    //console.log(tasks);
    removeGarbageActionsList(tasks);
    processTask(tasks);
  }

  $(function() {
    processTaskItems();
  });

})();
