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
			//widgetContainer.setAttribute("viewBox", "0 0 0 0");
			//widgetContainer.setAttribute("style",'outline: 1px solid red; font-size: 2em; overflow: visible;')
			widgetContainer.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			widgetContainer.setAttribute("height",size)
			widgetContainer.setAttribute("width",size*2.5)
			let fontSize = size
			let strokeWidth = 0//ontSize/size*0.2
			let x = 0
			let y = fontSize-fontSize/7;
			
			const strokeColor = "black";

			
			
			
			
			widgetContainer.innerHTML=`
		<defs>
			<LinearGradient id="F" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="${metricsData[0]*63+20}%"   stop-color="#06aed5" />
				<stop offset="${metricsData[0]*63+20}%" stop-color="#eaeaea" />
			</LinearGradient>
		</defs>
		<defs>
			<LinearGradient id="A" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="${metricsData[1]*63+20}%"   stop-color="#f0c808" />
				<stop offset="${metricsData[1]*63+20}%" stop-color="#eaeaea" />
			</LinearGradient>
		</defs>
		<defs>
			<LinearGradient id="I" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="${metricsData[2]*63+20}%"   stop-color="#59cd90" />
				<stop offset="${metricsData[2]*63+20}%" stop-color="#eaeaea" />
			</LinearGradient>
		</defs>
		<defs>
			<LinearGradient id="R" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="${metricsData[3]*63+20}%"   stop-color="#e23b49" />
				<stop offset="${metricsData[3]*63+20}%" stop-color="#eaeaea" />
			</LinearGradient>
		</defs>
				<text x=${x} y=${y} font-size=${fontSize} fill="url(#F)" stroke=${strokeColor} stroke-width=${strokeWidth} >F</text>
				<text x=${x+size*0.5} y=${y} font-size=${fontSize} fill="url(#A)" stroke=${strokeColor} stroke-width=${strokeWidth}>A</text>
				<text x=${x+size*1.25} y=${y} font-size=${fontSize} fill="url(#I)" stroke=${strokeColor} stroke-width=${strokeWidth}>I</text>
				<text x=${x+size*1.6} y=${y} font-size=${fontSize} fill="url(#R)" stroke=${strokeColor} stroke-width=${strokeWidth}>R</text>

			`
			


			//get color for styling
			// function getColor(metric) {
			// 	let color = 'white';
			// 	if (metric < 0.3) {
			// 		color = 'red';
			// 	} else if (metric >= 0.3 && metric < 0.7) {
			// 		color = 'yellow';
			// 	} else if (metric >= 0.3) {
			// 		color = 'green';
			// 	}
			// 	return color;
			// }

			
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