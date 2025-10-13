var vg_1 = "../vega-lite/radar_chart.vg.json";
var vg_2 = "../vega-lite/roads.vg.json";

vegaEmbed("#radar", vg_1).then(function(result) {
}).catch(console.error);
vegaEmbed("#roads", vg_2).then(function(result) {
}).catch(console.error);