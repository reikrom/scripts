// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-09-09
// @description  try to take over the world!
// @author       You
// @match        https://github.com/notifications
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

;(function () {
	'use strict'

	const selectItems = () => {
		const allMerged = document.querySelectorAll('.octicon-git-merge')
		const allClosed = document.querySelectorAll(
			'.octicon-git-pull-request-closed'
		)
		const combined = [...allMerged, ...allClosed]
		combined.forEach(
			(node) =>
				setTimeout(() =>
					node.parentNode.parentElement.parentElement.parentElement
						.querySelector('input')
						.click()
				),
			1000
		)
	}

    const header= document.querySelector('[data-job-url*="mark-all-notifications"]');

    const button = document.createElement('button');
    button.innerText = 'select All merged & closed'
    button.addEventListener('click', selectItems);
    header.append(button)

	// Your code here...
})()
