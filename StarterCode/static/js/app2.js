
// Use the D3 library to read in samples.json - starter
// d3.json('samples2.json').then(data => {
//     console.log(data);
// })

// Initializes the page with a default plot
function init() {

  // Use D3 to select the dropdown menu (02-Activities 08-Ins_Dropdown_Events)
  let dropdownMenu = d3.select("#selDataset");

  // Use D3 library to read in samples.json to select the dropdown menu
  d3.json("samples2.json").then(data => {

      // Assign the value of the dropdown menu option to a variable
      data.names.forEach(function(name) {
        dropdownMenu.append("option").text(name).property("value");
      });

      // Set name from the list for functions to build plots
      updateBarPlot(data.names[0]);
      // updateBubblesPlot(data.names[0]);
      updateMetaData(data.names[0]);
  });
};

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual

// Function to read in data from samples.JSON for bar chart
function updateBarPlot(samplesBar) {

  // Use D3 library to read in samples.json
    d3.json('samples2.json').then(data => {


      // filtering data by the input value
      let dataSamples = data.samples.filter(nameID => nameID.id === samplesBar)[0];


      // Trace1 to plot bar graph
      let trace1 = [{
        // Use sample_values as the values for the bar chart
        x: dataSamples.sample_values.slice(0,10).reverse(),
        // Use otu_ids as the labels for the bar chart.
        y: dataSamples.otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        type: "bar",
        orientation: "h",
        // Use otu_labels as the hovertext for the chart.
        text: dataSamples.otu_labels,
        // sorts graph to make it easier to read - Plotly documentation
        yaxis: {type: "category"}
        }];

      // Set layout with title
      let layout1 = {
        title: "Top OTUs Found in an Individual",
      };

      // Build plot
      Plotly.newPlot("bar", trace1, layout1);

      // 3. Create a bubble chart that displays each sample.
      // Trace1 to plot bubble graph
      let trace2 = [{
        // Use otu_ids for the x values.
        x: dataSamples.out_ids,
        // Use sample_values for the y values.
        y: dataSamples.sample_values,
        mode: "markers",
        marker: {
          // Use sample_values for the marker size.
          size: dataSamples.sample_values,
          // Use otu_ids for the marker colors.
          color: dataSamples.otu_ids,
        },
        // Use otu_labels for the text values.
        text: dataSamples.otu_labels,
      }];

      // Set layout with title
      let layout2 = {
        title: "Top OTUs per Sample"
      };

      // Build plot
      Plotly.newPlot("bubble", trace2, layout2)
    });
};

// 4. Display the sample metadata, i.e., an individual's demographic information.

// Update demographic panel with change in drop down
function updateMetaData(samplesDemo) {

    // Use D3 library to read in samples.json to select the dropdown menu
    d3.json('samples2.json').then(data => {

      // filtering data by the input value
      let metaSamples = data.metadata.filter(metaID => metaID.id == samplesDemo);
      let demoResults = metaSamples[0];

      // use d3 to select the demographics panel
      let panel = d3.select("#sample-metadata")

      // clear the previous data
      panel.html("");

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

      // iterate through keys JavaScript 02-Activities, 06 & 07
      Object.entries(demoResults).forEach(([key, value]) => {
        // append on the panel variable for correct key values
        panel.append("h6").text(`${key}: ${value}`);
      });
    });
};


// 6. Update all of the plots any time that a new sample is selected.
function optionChanged(samples) {
  updateBarPlot(samplesBar);
  // updateBubblesPlot(samples);
  updateMetaData(samplesDemo);
};

// end/update dashbaord
init();
