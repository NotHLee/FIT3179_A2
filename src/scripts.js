var vg_1 = "../vega-lite/radar_chart.vg.json";
var vg_2 = "../vega-lite/roads.vg.json";
var vg_3 = "../vega-lite/stations.vg.json"

vegaEmbed("#radar", vg_1).then(function(result) {
}).catch(console.error);
vegaEmbed("#roads", vg_2).then(function(result) {
}).catch(console.error);
vegaEmbed("#stations", vg_3).then(function(result) {
    const view = result.view;
    const slider = document.getElementById('timeSlider');
    const label = document.getElementById('timeLabel');

    slider.addEventListener('input', function() {
        const value = parseInt(this.value);
        view.signal('time_select', value).run();
        
        // Update label
        const year = Math.floor(value / 12) + 2005;
        const month = value % 12;
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        label.textContent = `${monthNames[month]} ${year}`;
    });
}).catch(console.error);
