window.__ModuleLoader__.load({
	id: "think-collapse",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;

		// Hide the assistant reasoning "Think" disclosure row entirely, so only
		// the assistant's result text remains visible. The row root carries the
		// stable attribute data-variant="think" (ReasoningRow.module.css in
		// @deepseek-ai/dsh-client-ui-conversation).
		const CSS = '[data-variant="think"] { display: none !important; }';

		function apply(ctx) {
			const style = document.createElement('style');
			style.setAttribute('data-plugin', 'think-collapse');
			style.textContent = CSS;
			document.head.appendChild(style);
			return () => {
				if (style.isConnected) style.remove();
			};
		}

		exports.apply = apply;
		return module.exports;
	}
});
