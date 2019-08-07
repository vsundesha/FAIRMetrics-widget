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
			
			//define tooltip
			const widgetTooltip = document.createElement('svg');
			widgetTooltip.setAttribute("id","tooltip");
			widgetTooltip.setAttribute("display","none");
			widgetTooltip.setAttribute("style","position:absolute; display:none;");
	
			//define container
			const widgetContainer = document.createElementNS("http://www.w3.org/2000/svg",'svg');
			const text = `<p>Findable : ${metricsData[0]}<br>Accessible : ${metricsData[1]}<br>Interoperable : ${metricsData[2]}<br>Reusable : ${metricsData[3]}</p>`
			widgetContainer.setAttribute("width",width);
			//overflow visible for tool
			widgetContainer.style.overflow ="hidden"
			widgetContainer.addEventListener('mousemove', e => showTooltip(e, text));
			
			
			widgetContainer.addEventListener('mouseout', e => hideTooltip(e));
			//Varis from browser to browser !!!!! chrome works best with 0 0 50 50
			widgetContainer.setAttribute("viewBox", "0 18 50 13");
			widgetContainer.style.backgroundColor="white"

			
			
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
				<title></title>
				<tspan fill="url(#F)">F</tspan>  
				<tspan fill="url(#A)">A</tspan>
				<tspan fill="url(#I)">I</tspan>
				<tspan fill="url(#R)">R</tspan>
			</text>
			<style>
				#tooltip {
					color: black;
					background: white;
					padding: 5px;
					opacity:0.9;
					box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
				}
			</style>
			
			`
			function showTooltip(evt, text) {
				const tooltip = shadow.getElementById("tooltip");
				
				
				tooltip.style.display = "block";
				tooltip.innerHTML = text;
				tooltip.style.left = evt.pageX + 10 + 'px';
				tooltip.style.top = evt.pageY + 10 + 'px';
				
			}
			  
			function hideTooltip(e) {
				const tooltip = shadow.getElementById("tooltip");
				tooltip.style.display = "none";
			}
			const shadow = this.attachShadow({ mode: 'open' });
			
			//append tooltip svg to shadow
			shadow.appendChild(widgetTooltip);

			//append fair metrics svg to shadow
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