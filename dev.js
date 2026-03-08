// ==UserScript==
// @name         E3 Local Dev Loader
// @description  Testing Server
// @namespace    local.dev
// @version      0.1.0
// @match        https://e3p.nycu.edu.tw/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      127.0.0.1
// ==/UserScript==

(function () {
	"use strict";

	const BASE = "http://127.0.0.1/";
	const bust = Date.now();

	function getText(url) {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: "GET",
				url: BASE + url,
				onload: res => resolve(res.responseText),
				onerror: reject
			});
		});
	}

	async function main() {
		try {
			const css = await getText("index.css");
			GM_addStyle(css);
			const css2 = await getText("home.css");
			GM_addStyle(css2);
			const js = await getText("index.js");
			const fn = new Function(js);
			fn();
		} catch (err) {
			console.error("[TM local dev] load failed:", err);
		}
	}

	main();
})();
