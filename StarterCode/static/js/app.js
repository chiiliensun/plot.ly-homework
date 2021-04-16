
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
      updatePlot(data.names[0]);
      updateMetaData(data.names[0]);
  });
};

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual

// Function to read in data from samples.JSON for bar chart
function updatePlot(samplesBar) {

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
        }];


      let layout1 = {
        title: "Top OTUs Found in an Individual"
      };


      Plotly.newPlot("bar", trace1, layout1);
    });
};

// 3. Create a bubble chart that displays each sample.
function updateMetaData(samplesBubbles) {
    d3.json('samples2.json').then(data => {

      // filtering data by the input value
      let metaSamples = data.metadata.filter(metaID => metaID.id ===samplesBubbles)[0];

      // use d3 to select the demographics panel
      let panel = d3.select("#sample-metadata")

      // clear the previous data
      panel.html("");

      // iterate through keys JavaScript 02-Activities, 06 & 07
      Object.entries(userInfo).forEach(([key, value]) => console.log(`Key: ${key}, Value: ${value}`));
    };

}

// Use otu_ids for the x values.


// Use sample_values for the y values.


// Use sample_values for the marker size.


// Use otu_ids for the marker colors.


// Use otu_labels for the text values.

// 4. Display the sample metadata, i.e., an individual's demographic information.


// 5. Display each key-value pair from the metadata JSON object somewhere on the page.


// 6. Update all of the plots any time that a new sample is selected.
function optionChanged(samples) {
  updatePlot(samples);
};

init();
