// ==UserScript==
// @name         Select notification group
// @namespace    http://tampermonkey.net/
// @version      2024-09-03
// @description  Select all checkboxes within a repo group
// @author       reikrom
// @match        https://github.com/notifications
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function click(cb) {
        if (cb.id === 'daddy-input') return;
        setTimeout(() => cb.click(),100)
    }
    function selectGroup(group) {
        const allCheckBoxes = group.querySelectorAll('input[type="checkbox"]');
        allCheckBoxes.forEach(cb => {
            click(cb);
        })
    }

    function createDaddyInput() {
        let input = document.createElement('input');
        input.type = 'checkbox';
        input.id = 'daddy-input';
        input.style.margin = '0px 12px 0px 0px';
        input.style.transform = 'scale(1.2)';
        return input;
    }

    const pageGroups = document.querySelectorAll('.js-notifications-group');

    pageGroups.forEach(group => {
        const header = group.querySelector('.Box-header');
        const input = createDaddyInput();

        input.addEventListener('change', (event) => { event.target.value === 'on' ? selectGroup(group):null } );
        header.prepend(input);
    });

    // Your code here...
})();
