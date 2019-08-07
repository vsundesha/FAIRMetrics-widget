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
			const widgetTooltip = document.createElementNS("http://www.w3.org/2000/svg","svg");
			
			widgetContainer.setAttribute("width",width);
			//overflow visible for tool
			widgetContainer.style.overflow ="visible"
			widgetContainer.addEventListener('mousemove', e => ShowTooltip(e));
			
			widgetContainer.addEventListener('mouseout', e => HideTooltip(e));
			//Varis from browser to browser !!!!! chrome works best with 0 0 50 50
			widgetContainer.setAttribute("viewBox", "0 15 50 20");
			
			
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
			<g class="tooltip">
				<text font-family="Arial" y=30>
					<title>${metricsData}</title>
					<tspan fill="url(#F)">F</tspan>  
					<tspan fill="url(#A)">A</tspan>
					<tspan fill="url(#I)">I</tspan>
					<tspan fill="url(#R)">R</tspan>
				</text>
				<rect width="30px" height="10px" fill="blue" id="tooltip-span" >
				<p>hola</p>
				</rect> 
			</g>
			<style>
			.tooltip {
				text-decoration:none;
				
			}
	
			g rect {
				display:none;
			}
			g:hover rect {
				display:block;
				
				overflow:hidden;
			}
			</style>
			`


			// <rect id="tooltip" opacity="1" width="100%"  height="${width}">
			// 		<text>Hola</text>
			// 	</rect>
			
			function ShowTooltip(e) {
				const tooltip = shadow.getElementById('tooltip-span');
				console.log(e);
				let x = e.offsetX;
				let y = e.offsetY;
				// tooltip.setAttribute("transform","translate("+x+","+y+")")
				tooltip.setAttribute("y","33px");
				tooltip.setAttribute("x","10px");
			}
			
			function HideTooltip(evt) {
				console.log("remove")
				// let tooltip = shadow.getElementById('tooltip');
				// tooltip.setAttribute("opacity", 0);
			}

			


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