var choropleth = "./vega-lite/stations.vg.json"
var area_chart = "./vega-lite/area_chart.vg.json"
var bar_chart = "./vega-lite/aqi_states.vg.json"

// store views globally
let views = {};

// first section
vegaEmbed("#stations", choropleth, {"actions": false}).then(function (result) {
    views.stations = result.view;
    const slider = document.getElementById('timeSlider');
    const label = document.getElementById('timeLabel');

    slider.addEventListener('input', function () {
        const value = parseInt(this.value);
        views.stations.signal('time_select', value).run();
        views.aqi_monthly.signal('time_select', value).run();
        views.aqi_states.signal('time_select', value).run();
    });

    slider.addEventListener('input', function() {
        const value = parseInt(this.value);
        const year = Math.floor(value / 12) + 2005;
        const month = value % 12;
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        label.textContent = `${monthNames[month]} ${year}`;
    });

}).catch(console.error);

vegaEmbed("#aqi_monthly", area_chart, {"actions": false}).then(function (result) {
    views.aqi_monthly = result.view;

}).catch(console.error);

vegaEmbed('#aqi_states', bar_chart, {"actions": false}).then(function (result) {
    views.aqi_states = result.view;

    // listen to state selection changes
    result.view.addSignalListener('selected_state', (name, value) => {
        var selectedState;
        try {
            selectedState = value.state[0]
        }
        catch {
            selectedState = null
        }

        console.log(selectedState)

        // update dot map to focus on state
        views.stations.signal('selected_state', selectedState).run();

        // update area chart to focus on state
        views.aqi_monthly.signal('selected_state', selectedState).run();
    });

}).catch(console.error);

var violin = "./vega-lite/violin_chart.vg.json"
var roads = "./vega-lite/roads.vg.json"
var donut = "./vega-lite/donut_chart.vg.json"

// second section
vegaEmbed("#aqi_dist", violin, {"actions": false}).then(function (result) {
    views.aqi_dist = result.view;

}).catch(console.error);

vegaEmbed("#roads", roads, {"actions": false}).then(function (result) {
    views.roads = result.view;

}).catch(console.error);

vegaEmbed("#donut", donut, {"actions": false}).then(function (result) {
    views.donut = result.view;

}).catch(console.error);


