import {countryButtons,region} from "./main.js";
const myChart = document.getElementById('chart').getContext('2d');
const countryInfo = document.querySelector('.country-info')


export let dataChartNames = []
export let dataChartConfirmed = [];
export let dataChartCritical = [];
export let dataChartRecovered = [];
export let dataChartDeaths = [];
export let  currentChartType = 'bar'

export let ChartCustom
 //Create a new chart
 export function createChart() {
     if (ChartCustom) ChartCustom.destroy();
         ChartCustom = new Chart(myChart,
                 {
                 type: currentChartType,
                 data: {
                    labels:[],
                 },
                 options: {
                     responsive:true,
                     maintainAspectRatio:false,
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
                                 autoSkip: true,
                                 callback: function(value){
                                     return this.getLabelForValue(value).substr(0,15)
                                 }
                             },
                             y: [{
                                 type: 'logarithmic',
                                 ticks: {
                                         autoSkip: false,
                                     },
                                 stacked: false,
                             }],
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
    showCountryInfo(countryName,confirmed,critical,recovered,deaths)
}


function showCountryInfo(countryName,confirmed,critical,recovered,deaths) {
        countryInfo.classList.remove('hide')
        countryInfo.innerHTML= '';
        countryInfo.innerHTML =`
            <p>Country: <span>${countryName}</span></p>
            <p>Confirmed: <span>${confirmed}</span></p>
            <p>Critical: <span>${critical}</span></p>
            <p>Recovered: <span>${recovered}</span></p>
            <p>Deaths: <span>${deaths}</span></p>
        `
}

export function hideCountryInfo() {
    countryInfo.classList.add('hide')

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

}

//Capitalize a name
function capatilize(str) {
    return str.toUpperCase().substr(0,1)+str.substr(1);
}

