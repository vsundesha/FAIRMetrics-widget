class FairMetrics extends HTMLElement {
	constructor() {
		super();
		const ShadowRootInit = { mode: 'open' };
		const shadow = this.attachShadow(ShadowRootInit);

		//get data
		const data = this.metrics;
		if (
			data &&
			Array.isArray(JSON.parse(data)) &&
			JSON.parse(data).length == 4
		) {
			const metricsData = JSON.parse(data);

			const size = this.size;

			//Sequence of letters
			const sequence = 'FAIR';

			//definde canvas
			const widgetContainer = document.createElement('canvas');
			widgetContainer.setAttribute('width', size * 2.33);
			widgetContainer.setAttribute('height', size);
			const ctx = widgetContainer.getContext('2d');

			//Text font size
			ctx.font = size + 'px sans-serif';

			//get color for styling
			function getColor(metric) {
				let color = 'white';
				if (metric < 0.3) {
					color = 'red';
				} else if (metric >= 0.3 && metric < 0.7) {
					color = 'yellow';
				} else if (metric >= 0.3) {
					color = 'green';
				}
				return color;
			}

			//Color each letter
			function drawWidget(str, x, y) {
				for (let i = 0; i <= str.length; i++) {
					const ch = str.charAt(i);
					const metric = metricsData[i];
					const color = getColor(metric);
					ctx.fillStyle = color;
					ctx.strokeStyle = getColor(metric);
					ctx.fillText(str.charAt(i), x, y);
					ctx.strokeText(str.charAt(i), x, y);
					x += ctx.measureText(ch).width;
				}
			}

			drawWidget(sequence, 0, size - size / 8);

			shadow.appendChild(widgetContainer);
		}
	}

	get metrics() {
		return this.getAttribute('data-fair-metrics') || '';
	}

	get size() {
		return this.getAttribute('size') || '';
	}

	connectedCallback() {
		console.log('Custom chart element added to page.');
	}

	disconnectedCallback() {
		console.log('Custom chart element removed from page.');
	}

	adoptedCallback() {
		console.log('Custom chart element moved to new page.');
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log('Custom chart element attributes changed.');
	}
}

customElements.define('fair-metrics', FairMetrics);
