HTMLWidgets.widget({

  name: 'C3AreaChart_perc',

  type: 'output',

  factory: function(el, width, height) {
    
    
    // create custom function for week of year
    
    function getWeek(title){
      const today = title;
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7) - 1;
    }
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

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
            "months": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November",             "Dezember"],
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
                          // use Time for x-axis
                          x: "Time",

                      // use the remaining data for y-values
                        value: keys,
                    },

                    // set chart types
                    types: {

                    // default is line, we want totals to be displayed as bars
                        Anteil: 'spline',
                        OptimalerLagerwert: 'area',
                        VerfuegbarerOptimalerLagerwert: 'area'
                    },
                    axes: {
                        Prozent: 'y2',
                        OptimalerLagerwert: 'y',
                        VerfuegbarerOptimalerLagerwert: 'y'
                    }
                },
                grid: {
                    y: {
                        lines: [
                          {value: 0, class: "cc"}
                          ]
                    },
                    
                    x: {
                        lines: [
                            {value: date, text: date, class: "cc"}
                          ]
                    }
                },
                axis: {
                    x: {
                      //  x axis as timeseries
                        type: "timeseries",

                        // tick format x-axis
                        tick: {
                            format: "%Y-%m"
                        }
                    },
                    y: {
                        tick: {
                            format: ger.numberFormat("$,.2f")
                        }
                    },
                    y2: {
                        show: true,
                        
                        max: 1,
                        
                        tick: {
                            format: d3.format(',%')
                        }
                    }
                },
                tooltip: {
          		    // tooltip
          		    format: {
          		     title: function(title){return 'Jahr: ' + title.getFullYear() + ', Monat: ' + (title.getMonth() + 1) + ', KW: ' + getWeek(title);}
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