import {dataCollected,countryButtons,region,worldMap,categoryButtonsDiv} from "./main.js";
const myChart = document.getElementById('chart').getContext('2d');

let dataCart = []
export let dataChartNames = []
export let dataChartConfirmed = [];
export let dataChartCritical = [];
export let dataChartRecovered = [];
export let dataChartDeaths = [];
export let  currentChartType = 'bar'

// Chart.defaults.global.defaultFontFamily='Lato';
// Chart.defaults.global.defaultFontSize='Lato';
// Chart.defaults.global.defaultFontColor='#777';
let data
// const config = {
//     type: "line",
//     data: data,
//     options: {
//         plugins: {
//             title: {
//                 display: true,
//                 text: "",
//                 font: { size: 25 },
//             },
//         },
//         scales: {
//             x: {
//                 stacked: false,
//                 beginAtZero: true,
//                 ticks: {
//                     autoSkip: false,
//                 },
//             },
//         },
//     },
// };


export let ChartCustom
 //Create a new chart
 export function createChart() {
    worldMap.classList.toggle('hide')
     if (ChartCustom) ChartCustom.destroy()
         ChartCustom = new Chart(myChart,
                 {
                 type: currentChartType,
                 data: {
                    labels:[],

                 },
                 options: {
                     backgroundColor: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600',],
                     plugins: {
                         title: {
                             display: true,
                             text: "",
                             font: {size: 25},
                         },
                     },
                     scales: {
                         x: {
                             stacked: false,
                             beginAtZero: true,
                             ticks: {
                                 autoSkip: false,
                             },
                         },
                     },
                 },
             })
 }

// update the global variables data and send them to addData function, and activate the function to create
//the buttons for the individual countries.
export function printData(data) {
    dataChartNames=[];
    dataChartConfirmed=[];
    dataChartCritical=[];
    dataChartRecovered=[];
    dataChartDeaths=[];
    data.forEach(country=>{
        dataChartNames.push(country.data.data.name)
        dataChartConfirmed.push(country.data.data.latest_data.confirmed)
        dataChartCritical.push(country.data.data.latest_data.critical)
        dataChartRecovered.push(country.data.data.latest_data.recovered)
        dataChartDeaths.push(country.data.data.latest_data.deaths)
    })
    // console.log('confi',dataChartNames)

    addData(ChartCustom ,dataChartNames,dataChartConfirmed,'Confirmed Cases',region)
    injectButtons()
}

//destroy the chart to update it
export function removeData() {
    ChartCustom.destroy()

}
//Add new data to the chart
export function addData(chart,names, data,label,title) {
    // console.log(names);
    chart.data.labels=names;
    chart.options.plugins.title.text ='Covid in '+capatilize(title);
    chart.data.datasets.push({data});
    chart.data.datasets.label=[];
    chart.data.datasets[0].label=[label];
    chart.update();

}

//Update the graph depending on the subcategories
export function updateCategoryGraph(data,label) {
    removeData()
    createChart()
    const expr = data;
    switch (expr) {
        case 'dataChartCritical':
            data=dataChartCritical
            break;
        case 'dataChartRecovered':
            data=dataChartRecovered
            break;
        case 'dataChartDeaths':
            data=dataChartDeaths;
            break;
        case 'dataChartConfirmed':
            data=dataChartConfirmed;
            break;
        default:
            data=dataChartConfirmed;
    }
    addData(ChartCustom ,dataChartNames,data,label,region)
}


export function showCountryGraph(country){
    const countryName=country.data.data.name;
    const confirmed = country.data.data.latest_data.confirmed;
    const critical = country.data.data.latest_data.critical;
    const recovered = country.data.data.latest_data.recovered;
    const deaths = country.data.data.latest_data.deaths;
    const data =[confirmed,critical,recovered,deaths]
    const names =['Confirmed','Critical','Recovered','Deaths']
    removeData()
    createChart()
    ChartCustom.options.plugins.title.text ='Covid in '+countryName;
    ChartCustom.update()
    addData(ChartCustom, names, data,countryName,countryName)
}

//Create the buttons depending on the countries region
function injectButtons(){
    countryButtons.innerHTML='';
    dataChartNames.forEach(name=>{
        countryButtons.innerHTML+=(`<button class="button-name" data-button="${name}">${name}</button>`)
    })

}

//change the graph type -
export function changeGraphType(type){
    // let newChart = ChartCustom.data
    // removeData();
    // ChartCustom = new Chart(myChart,{
    //     type:type,
    //     data:newChart
    //
        currentChartType = type;
        let newChartData = ChartCustom.data;
        let newChartOptions = ChartCustom.options;
        let newChartScales = ChartCustom.scales;
        ChartCustom.destroy();
        ChartCustom = new Chart(chart, {
            type:type,
            data: newChartData,
            options:newChartOptions,
            scales:newChartScales
        });
         ChartCustom.update();
    // }
    // createChart()
    // addData(newChart)
    // ChartCustom= newChart

    // ChartCustom.update();
}

//Capitilize a name
function capatilize(str) {
    return str.toUpperCase().substr(0,1)+str.substr(1);
}


//
// categoryButtonsDiv.addEventListener('click',(event)=>{
//     console.log('hhhhh',event.target)
//     dataChartRecovered
//     addData(chart, names, dataChartRecovered,'Recovered')
// })
//
// #003f5c
// #58508d
// #bc5090
// #ff6361
// #ffa600