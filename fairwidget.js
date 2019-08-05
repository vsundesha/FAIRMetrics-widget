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

			const size = this.size;

			//Sequence of letters
			const sequence = 'FAIR';

			//definde canvas
			
			const widgetContainer = document.createElementNS("http://www.w3.org/2000/svg",'svg');
			widgetContainer.setAttribute("width",size)
			//Varis from browser to browser !!!!! chrome works best with 0 0 50 50
			widgetContainer.setAttribute("viewBox", "0 0 60 50");
			// widgetContainer.setAttribute("width",size)
			
			widgetContainer.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			
			widgetContainer.innerHTML=`
			<defs>
				<LinearGradient id="F" x1="0%" y1="100%" x2="0%" y2="0%">
					<stop offset="${metricsData[0]*63+20}%" stop-color="#06aed5" />
					<stop offset="${metricsData[0]*63+20}%" stop-color="#eaeaea" />
				</LinearGradient>
			</defs>
			<defs>
				<LinearGradient id="A" x1="0%" y1="100%" x2="0%" y2="0%">
					<stop offset="${metricsData[1]*63+20}%" stop-color="#f0c808" />
					<stop offset="${metricsData[1]*63+20}%" stop-color="#eaeaea" />
				</LinearGradient>
			</defs>
			<defs>
				<LinearGradient id="I" x1="0%" y1="100%" x2="0%" y2="0%">
					<stop offset="${metricsData[2]*63+20}%" stop-color="#59cd90" />
					<stop offset="${metricsData[2]*63+20}%" stop-color="#eaeaea" />
				</LinearGradient>
			</defs>
			<defs>
				<LinearGradient id="R" x1="0%" y1="100%" x2="0%" y2="0%">
					<stop offset="${metricsData[3]*63+20}%" stop-color="#e23b49" />
					<stop offset="${metricsData[3]*63+20}%" stop-color="#eaeaea" />
				</LinearGradient>
			</defs>
			<text y=30>
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