HTMLWidgets.widget({

  name: 'C3DonutChart',

  type: 'output',

  factory: function(el, width, height) {
    
    // create an empty chart
    var chart = null;
    
    var ger = d3.locale ({
            "decimal": ".",
            "thousands": ",",
            "grouping": [3],
            "currency": ["", "€"],
            "dateTime": "%a %b %e %X %Y",
            "date": "%m/%d/%Y",
            "time": "%H:%M:%S",
            "periods": ["AM", "PM"],
            "days": ["Sontag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
            "shortDays": ["Son", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
            "months": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
            "shortMonths": ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    })
         

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
                      
                      // keys
                        value: keys,
                    },
                    type: "donut",
                },
                
                legend: {
                  position: "bottom"
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