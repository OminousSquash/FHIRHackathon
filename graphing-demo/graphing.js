const trace1 = {
  x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  y: [84, 96, 79, 151, 77, 67, 94, 87, 68],
  type: "scatter",
  mode: "lines+markers",
  marker: {
    color: [
      "blue",
      "blue",
      "blue",
      "red",
      "blue",
      "blue",
      "blue",
      "blue",
      "blue",
    ], // Specify colors for each point
    size: [6, 6, 6, 10, 6, 6, 6, 6, 6], // Specify sizes for each point
  },
  line: { color: "green" },
  // give it a title
  name: "heart rate over time",
};

const data = [trace1];

const layout = {
  title: "Heart Rate Over 10 Minute Intervals",
  xaxis: {
    title: "Time (minutes)",
  },
  yaxis: {
    title: "Heart Rate (bpm)",
  },
};

Plotly.newPlot("myDiv", data, layout);
