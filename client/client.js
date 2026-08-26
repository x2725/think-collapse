window.__ModuleLoader__.load({
	id: "think-collapse",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;

		const FLOW_SELECTOR = '[data-chat-flow]';
		const ITEM_SELECTOR = ':scope > [data-chat-flow-kind]';
		const THINK_SELECTOR = '[data-variant="think"]';
		const MEMBER_ATTRIBUTE = 'data-think-collapse-member';
		const OPEN_ATTRIBUTE = 'data-think-collapse-open';
		const SUMMARY_ATTRIBUTE = 'data-think-collapse-summary';
		const PROCESSED_ATTRIBUTE = 'data-think-collapse-processed';

		const CSS = `
			[${MEMBER_ATTRIBUTE}]:not([${OPEN_ATTRIBUTE}]) {
				display: none !important;
			}
			[${SUMMARY_ATTRIBUTE}] {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				gap: 8px;
				width: 100%;
				margin: 4px 0 14px;
				padding: 10px 0 12px;
				border: 0;
				border-bottom: 1px solid var(--dsw-alias-border-l1);
				background: transparent;
				color: var(--dsw-alias-label-tertiary);
				font: inherit;
				font-size: 14px;
				line-height: 22px;
				text-align: left;
				cursor: pointer;
			}
			[${SUMMARY_ATTRIBUTE}]:hover {
				color: var(--dsw-alias-label-secondary);
			}
			[${SUMMARY_ATTRIBUTE}] > span:last-child {
				transition: transform 160ms ease;
			}
			[${SUMMARY_ATTRIBUTE}][aria-expanded="true"] > span:last-child {
				transform: rotate(90deg);
			}
		`;

		function durationLabel(tail) {
			const text = tail.textContent || '';
			const zh = text.match(/(?:用时|耗时)\s*((?:\d+\s*分)?\s*\d+\s*秒)/);
			if (zh) return `耗时 ${zh[1].replace(/\s+/g, '')}`;
			const en = text.match(/Ran for\s*([^·\n]+)/i);
			if (en) return `耗时 ${en[1].trim()}`;
			return '查看过程';
		}

		function lastIndexOfKind(items, kind) {
			for (let index = items.length - 1; index >= 0; index -= 1) {
				if (items[index].dataset.chatFlowKind === kind) return index;
			}
			return -1;
		}

		function makeSummary(label, members) {
			const button = document.createElement('button');
			button.type = 'button';
			button.setAttribute(SUMMARY_ATTRIBUTE, '');
			button.setAttribute('aria-expanded', 'false');

			const text = document.createElement('span');
			text.textContent = label;
			const chevron = document.createElement('span');
			chevron.textContent = '›';
			chevron.setAttribute('aria-hidden', 'true');
			button.append(text, chevron);

			button.addEventListener('click', () => {
				const open = button.getAttribute('aria-expanded') !== 'true';
				button.setAttribute('aria-expanded', String(open));
				for (const member of members) {
					if (open) member.setAttribute(OPEN_ATTRIBUTE, '');
					else member.removeAttribute(OPEN_ATTRIBUTE);
				}
			});
			return button;
		}

		function collapseTurn(items) {
			const user = items[0];
			const tail = items.at(-1);
			if (!user || !tail || tail.hasAttribute(PROCESSED_ATTRIBUTE)) return;

			const finalIndex = lastIndexOfKind(items, 'assistant-step');
			if (finalIndex < 1) return;
			const final = items[finalIndex];

			const members = items
				.slice(1, -1)
				.filter((member) => member !== final);
			for (const think of final.querySelectorAll(THINK_SELECTOR)) members.push(think);
			if (members.length === 0) return;

			for (const member of members) member.setAttribute(MEMBER_ATTRIBUTE, '');
			user.after(makeSummary(durationLabel(tail), members));
			tail.setAttribute(PROCESSED_ATTRIBUTE, '');
		}

		function collapseCompletedTurns() {
			for (const flow of document.querySelectorAll(FLOW_SELECTOR)) {
				const items = Array.from(flow.querySelectorAll(ITEM_SELECTOR));
				let start = -1;
				for (let index = 0; index < items.length; index += 1) {
					const kind = items[index].dataset.chatFlowKind;
					if (kind === 'user') start = index;
					if (kind === 'turn-tail' && start >= 0) {
						collapseTurn(items.slice(start, index + 1));
						start = -1;
					}
				}
			}
		}

		function apply(ctx) {
			const style = document.createElement('style');
			style.setAttribute('data-plugin', 'think-collapse');
			style.textContent = CSS;
			document.head.appendChild(style);

			const target = document.body || document.documentElement;
			collapseCompletedTurns();

			let scheduled = false;
			const observer = new MutationObserver(() => {
				if (scheduled) return;
				scheduled = true;
				queueMicrotask(() => {
					scheduled = false;
					collapseCompletedTurns();
				});
			});
			observer.observe(target, { childList: true, subtree: true });

			return () => {
				observer.disconnect();
				style.remove();
				for (const summary of document.querySelectorAll(`[${SUMMARY_ATTRIBUTE}]`)) summary.remove();
				for (const member of document.querySelectorAll(`[${MEMBER_ATTRIBUTE}]`)) {
					member.removeAttribute(MEMBER_ATTRIBUTE);
					member.removeAttribute(OPEN_ATTRIBUTE);
				}
				for (const tail of document.querySelectorAll(`[${PROCESSED_ATTRIBUTE}]`)) {
					tail.removeAttribute(PROCESSED_ATTRIBUTE);
				}
			};
		}

		exports.apply = apply;
		return module.exports;
	}
});
