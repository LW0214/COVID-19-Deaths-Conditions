// create datasets

const groups=["Influenza and pneumonia",
"Respiratory failure",
"Hypertensive diseases",
"Diabetes",
"Cardiac arrest"]

const data_20q1 = [
   {group: groups[0], value: 3239,key: "2020 Q1" },
   {group: groups[1], value: 2390},
   {group: groups[2], value: 1439},
   {group: groups[3], value: 1053},
   {group: groups[4], value: 1041}]

const data_20q2 = [
   {group: groups[0], value: 49361,key: "2020 Q2"},
   {group: groups[1], value: 40457},
   {group: groups[2], value: 25681},
   {group: groups[3], value: 18254},
   {group: groups[4], value: 15723}]

const data_20q3 = [
   {group: groups[0], value: 36480,key:"2020 Q3"},
   {group: groups[1], value: 28651},
   {group: groups[2], value: 18229},
   {group: groups[3], value: 15114},
   {group: groups[4], value: 8802}]

const data_20q4 = [
   {group: groups[0], value: 78943,key:"2020 Q4"},
   {group: groups[1], value: 66857},
   {group: groups[2], value: 33878},
   {group: groups[3], value: 28190},
   {group: groups[4], value: 18299}]

const data_21q1 = [
   {group: groups[0], value: 88632,key:"2021 Q1"},
   {group: groups[1], value: 72422},
   {group: groups[2], value: 32765},
   {group: groups[3], value: 27947},
   {group: groups[4], value: 24287}]

const data_21q2 = [
   {group: groups[0], value: 21129,key:"2021 Q2"},
   {group: groups[1], value: 16706},
   {group: groups[2], value: 7385},
   {group: groups[3], value: 6186},
   {group: groups[4], value: 5026}]

const data_21q3 = [
   {group: groups[0], value: 70659,key:"2021 Q3"},
   {group: groups[1], value: 53471},
   {group: groups[2], value: 18927},
   {group: groups[3], value: 16811},
   {group: groups[4], value: 14341}]

const data_21q4 = [
   {group: groups[0], value: 66154,key:"2021 Q4"},
   {group: groups[1], value: 52137},
   {group: groups[2], value: 18418},
   {group: groups[3], value: 16213},
   {group: groups[4], value: 12661}]

// set the dimensions and margins of the graph
const margin = {top: 50, right: 30, bottom: 70, left: 80},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// X axis
const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data_20q1.map(d => d.group))
  .padding(0.2);
svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x))
  //add label
  //https://observablehq.com/@jeantimex/simple-line-chart-with-axis-labels
  .append('text')
  .attr('class', 'axis-label')
  .text("Conditions")
  .attr('x', margin.left + (width - margin.left - margin.right) / 2)
  .attr("fill", "black")
  .style("font", "16px times")
  .attr('y', 50) // Relative to the x axis.

//   var insertLinebreaks = function (d) {
//     var el = d3.select(this);
//     var words = d.split(' ');
//     el.text('');

//     for (var i = 0; i < words.length; i++) {
//         var tspan = el.append('tspan').text(words[i]);
//         if (i > 0)
//             tspan.attr('x', 0).attr('dy', '15');
//     }
// };

// svg.selectAll('g.x.axis g text').each(insertLinebreaks);

// Add Y axis
const y = d3.scaleLinear()
  .domain([0, 90000]) // max value of death
  .range([ height, 0]);
svg.append("g")
  .attr("class", "myYaxis")
  .call(d3.axisLeft(y))
  //add label
  .append('text')
  .attr('class', 'axis-label')
  .text("Death Count")
  .attr('transform', 'rotate(-90)')
  .attr('x', -(margin.top + (height - margin.top - margin.bottom) / 2))
  .attr("fill", "black")
  .style("font", "16px times")
  .attr('y', -50) // Relative to the y axis.

// value of the previous click
// var u = svg.selectAll("rect")
//     .data(data)

// adds labels
d3.select("svg").append("g").attr("id","labels");
// adds percentage
d3.select("svg").append("g").attr("id","perc");

//adds text for current on
d3.select("svg").append("g").attr("id","curr");

//adds text for previously on
d3.select("svg").append("g").attr("id","prev_on");


// A function that create / update the plot for a given variable:
function update(data) {

  //change color of button
  // var currentColor = this
  // log.console("prev color: ",currentColor)
  // currentColor = (currentColor == "white") ? "green" : "white";
  // d3.select(this).style("fill", currentColor);
  // log.console("now color: ",currentColor)
  //d3.select(this).style("fill", "#red")

  //calculate percentage form previosu click
  var prev = svg.selectAll("rect").data()
  console.log("prev: ", prev);

  if (prev.length!=0){
    //find key of previously clicked
    var prev_key=[]
    prev_key.push(svg.selectAll("rect").data()[0].key)

    console.log("prev key: ", prev_key);
  }

  //output percentage except for first click
  // var prev_data=svg.selectAll("rect")
  //     .data()

  var u = svg.selectAll("rect")
    .data(data)

  u.join("rect")
    .transition()
    .duration(1000)
      .attr("x", d => x(d.group))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", "#69b3a2")
  const space=5

  var lab =
  d3.select("#labels")
    //.append("g")
    //  .attr("id", "labels")
    .selectAll("text")
    .data(data)
    //.enter()
    //.append("text")
    .join("text")
    .text(function(d) { return "count: " + d.value})
    .transition()
    .duration(1000)
      .attr("x", d => x(d.group))
      .attr("y", d => y(d.value)-space)
      .attr("fill", "#1f78b4")
      .style("font", "16px times")
      .attr("transform", `translate(${margin.left},${margin.top})`)

  if (prev.length!=0){ //if first not nan
    //https://stackoverflow.com/questions/60885907/get-percentage-value-from-difference-between-two-arrays-javascript
    const arr_perc=prev.map((old,i)=>Math.round((data[i].value-old.value)/old.value*100))

    console.log("key: ",data);
    console.log("prev: ",prev);
    console.log("perc: ",arr_perc);


    var total = [];
    for (let i = 0; i < arr_perc.length; i++) {
      const tmp={x:x(data[i].group),y:y(data[i].value),val: arr_perc[i]}
      total.push(tmp)
    }

var per =
  d3.select("#perc")
    //.append("g")
    //  .attr("id", "labels")
    .selectAll("text")
    .data(total)
    //.enter()
    //.append("text")
    .join("text")
    .text(d=>d.val+"%")
    .transition()
    .duration(600)
      .attr("x", d => d.x)
      .attr("y", d => d.y-16-5)
      .attr("fill", function(d){
        return d.val<0 ? "green":"red"
      })
      .style("font", "16px times")
      .attr("transform", `translate(${margin.left},${margin.top})`)


    var key=[]
    key.push(data[0].key)
    // console.log("key: ",key);

  var curr_txt=
    d3.select("#curr")
      .selectAll("text")
      .data(key)
      .join("text")
      .text(d=>"currently on: "+d)
      .transition()
      .duration(1000)
      .attr('x',  margin.left + (width - margin.left - margin.right) / 2)
      .attr('y', 60)
      .attr("fill", "#6a3d9a")
      .style("font", "16px times")
      //.attr("transform", `translate(${margin.left},${margin.top})`)

    var prev_txt=
    d3.select("#prev_on")
      .selectAll("text")
      .data(prev_key)
      .join("text")
      .text(d=>"previously clicked: "+d)
      .transition()
      .duration(1000)
      .attr('x',  margin.left + (width - margin.left - margin.right) / 2)
      .attr('y', 80)
      .attr("fill", "#b15928")
      .style("font", "16px times")


  }
}

//set color for button
d3.selectAll("button").attr("fill","white")
// Initialize the plot with the first dataset
update(data_20q1)
