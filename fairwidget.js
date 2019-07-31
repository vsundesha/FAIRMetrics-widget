// import {d3} from "https://d3js.org/d3.v5.min.js";
import * as c3 from "c3";

function createFairMetricsChart(id, data) {
  data.unshift("value")
  var chart = c3.generate({
    bindto: "#" + id,
    data: {
      x: 'Letter',
      columns: [
        ['Letter','F','A','I','R'],
        data
      ],
      names: {
        fair: "Fair"
      },
      type: "bar",
      colors: {
        value: function(d) {
          if(d.value<0.3){
            return 'red'
          } else if(d.value>=0.3 && d.value<0.7){
            return 'yellow'
          } else if(d.value>=0.3){
            return 'green'
          }
        }
      },
      
    },
    axis: {
      x: {
        type: 'category'
      },
      y:{
        max: 0.9
      }
    },
    legend: {
      show: false
    }
  });

  d3.select('.fairmetrics').insert('div', '.chart').attr('class', 'oeb-legend')
  .insert('div','.chart').attr('class','legend-scale')
  .insert('ul','.chart').attr('class','legend-labels')
  
  .selectAll('span')

  .data(['Online','Offline','No information captured', 'Access Time'])
  .enter().append('li').html(function (id) { return id; }).append('span')
  .attr('data-id', function (id) { return id; })
  
  .each(function (id) {
      d3.select(this).style('background-color', chart.color(id));
  })
}

function createFairGaugeChart(id, data) {
  const arrSum = arr => arr.reduce((a, b) => a + b, 0);
  let datasum = (arrSum(data) * 100) / data.length;

  var chart = c3.generate({
    bindto: "#" + id,

    data: {
      columns: [["Fair", datasum]],
      type: "gauge"
    },
    gauge: {},
    color: {
      pattern: ["#FF0000", "#F6C600", "#60B044"], // the three color levels for the percentage values.
      threshold: {
        values: [30, 60, 100]
      }
    }
  });
}

function createChart(id, data) {
  if (id.includes("fairmetrics")) {
    createFairMetricsChart(id, data);
  } else if (id.includes("fairgauge")) {
    createFairGaugeChart(id, data);
  } else {
    createFairMetricsChart(id, data);
  }
}

function loadChart(elems) {
  // console.log(elems);
  if (elems === undefined) {
    elems = document.getElementsByClassName("fairmetrics");
  }

  let i = 0;
  for (let y of elems) {
    try {
      i++;
      const dataId = y.getAttribute("id");
      const dataFAIR = JSON.parse(y.getAttribute("data-fair-metrics"));
      createChart(dataId, dataFAIR);
    } catch (err) {
      console.log("Internat error :" + err);
    }
  }
}

loadChart();
