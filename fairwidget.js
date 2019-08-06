class FairMetrics extends HTMLElement {
	constructor() {
		super();

		//get data
		const data = this.metrics;
		if (
			data &&
			Array.isArray(JSON.parse(data)) &&
			JSON.parse(data).length == 4
		) {
			const metricsData = JSON.parse(data);

			const width = this.width;
			//definde svg
			
			const widgetContainer = document.createElementNS("http://www.w3.org/2000/svg",'svg');
			
			widgetContainer.setAttribute("width",width);
			widgetContainer.setAttribute("height","auto")
			//Varis from browser to browser !!!!! chrome works best with 0 0 50 50
			widgetContainer.setAttribute("viewBox", "0 15 50 20");
			// widgetContainer.setAttribute("width",width)
			
			widgetContainer.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			
			widgetContainer.innerHTML=`
			<defs>
				<LinearGradient id="F" x1="0%" y1="100%" x2="0%" y2="0%">
					<stop offset="${metricsData[0]*64+19}%" stop-color="#06aed5" />
					<stop offset="${metricsData[0]*64+19}%" stop-color="#eaeaea" />
				</LinearGradient>
			</defs>
			<defs>
				<LinearGradient id="A" x1="0%" y1="100%" x2="0%" y2="0%">
					<stop offset="${metricsData[1]*64+19}%" stop-color="#f0c808" />
					<stop offset="${metricsData[1]*64+19}%" stop-color="#eaeaea" />
				</LinearGradient>
			</defs>
			<defs>
				<LinearGradient id="I" x1="0%" y1="100%" x2="0%" y2="0%">
					<stop offset="${metricsData[2]*64+19}%" stop-color="#59cd90" />
					<stop offset="${metricsData[2]*64+19}%" stop-color="#eaeaea" />
				</LinearGradient>
			</defs>
			<defs>
				<LinearGradient id="R" x1="0%" y1="100%" x2="0%" y2="0%">
					<stop offset="${metricsData[3]*64+19}%" stop-color="#e23b49" />
					<stop offset="${metricsData[3]*64+19}%" stop-color="#eaeaea" />
				</LinearGradient>
			</defs>
			<text font-family="Arial" y=30>
				<tspan fill="url(#F)">F</tspan>  
				<tspan fill="url(#A)">A</tspan>
				<tspan fill="url(#I)">I</tspan>
				<tspan fill="url(#R)">R</tspan>
			</text>
			`
			const shadow = this.attachShadow({ mode: 'open' });
			
			
			shadow.appendChild(widgetContainer);
			
		}
	}

	get metrics() {
		return this.getAttribute('data-fair-metrics') || '[0,0,0,0]';
	}

	get width() {
		return this.getAttribute('width') || '100%';
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