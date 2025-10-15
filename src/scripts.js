var vg_1 = "../vega-lite/radar_chart.vg.json"
var vg_2 = "../vega-lite/roads.vg.json"
var vg_3 = "../vega-lite/stations.vg.json"
var vg_4 = "../vega-lite/area_chart.vg.json"
var vg_5 = "../vega-lite/aqi_states.vg.json"

// Store views globally for cross-chart communication
let views = {};

// Function to update all charts when state changes
function updateSharedState(selectedState) {
    console.log(views)
    Object.keys(views).forEach(key => {
        if (views[key]) {
            views[key].signal('selected_state', selectedState).run();
        }
    });
}

vegaEmbed("#radar", vg_1).then(function(result) {
    views.radar = result.view;
}).catch(console.error);

vegaEmbed("#roads", vg_2).then(function(result) {
    views.roads = result.view;
}).catch(console.error);

vegaEmbed("#stations", vg_3).then(function(result) {
    views.stations = result.view;
    const slider = document.getElementById('timeSlider');
    const label = document.getElementById('timeLabel');

    slider.addEventListener('input', function() {
        const value = parseInt(this.value);
        views.stations.signal('time_select', value).run();
        
        // Update label
        const year = Math.floor(value / 12) + 2005;
        const month = value % 12;
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        label.textContent = `${monthNames[month]} ${year}`;
    });
    
}).catch(console.error);

vegaEmbed("#aqi_monthly", vg_4).then(function(result) {
    views.aqi_monthly = result.view;
}).catch(console.error);

vegaEmbed('#aqi_states', vg_5).then(function(result) {
    views.aqi_states = result.view;
    const slider = document.getElementById('timeSlider');

    slider.addEventListener('input', function() {
        const value = parseInt(this.value);
        views.aqi_states.signal('time_select', value).run();
    });

    // listen to state selection changes
    result.view.addSignalListener('selected_state', (name, value) => {    
        var selectedState;
        try {
            selectedState = value.state[0]
        }
        catch {
            selectedState = null
        }

        // update dot map to focus on state
        views.stations.signal('selected_state', selectedState).run();

        // update area chart to focus on state
        views.aqi_monthly.signal('selected_state', selectedState).run();
    });

}).catch(console.error);