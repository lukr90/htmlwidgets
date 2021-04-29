HTMLWidgets.widget({
  
  name: 'C3SplineChart',

  type: 'output',

  factory: function(el, width, height) {

    // create custom function for week of year
    
    function getWeek(title){
      const today = title;
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7) - 1;
    }

    // create an empty chart
    var chart = null;

    return {

      renderValue: function(x) {

        // if the chart does not exist, create it via c3.generate
        if(chart===null){

            keys = _.keys(x.dataset);

          	chart = c3.generate({

          	  // specify the container element we want the chart to render in
          		bindto: el,
          		  data: {

          		  // intialize with an empty array
          			json: [],
          			keys: {
          			      // use Time for x-axis
          			      x: 'Time',

          			  // use the remaining data for y-values
          				value: keys,
          			      },
          			// set chart types
          			  type: 'spline'
        		  },
          		  axis: {
          			      x: {
          			  //  x axis as timeseries
          				type: 'timeseries',

          				// tick format x-asis
          				tick: {
          					format: '%Y-%m-%d'
          				}
          			},
          		},
          		  tooltip: {
          		    // tooltip
          		    format: {
          		     title: function(title){return 'KW: ' + getWeek(title);}
          		    }
          		}
          	});
        }

        // at this stage the chart always exists
        // get difference in keys
        var old_keys = _.keys(chart.x());
        var new_keys = _.keys(x.dataset);
        var diff     = _.difference(old_keys,new_keys);

        // update the data and colors
        chart.load({
          json  : x.dataset,
          colors: x.colors,

          // unload data that we don't need anymore
          unload: diff
        });
      }
    };
  }
});