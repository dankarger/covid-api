// import {dataCollected} from "./main.js";
const myChart = document.getElementById('chart').getContext('2d');
let dataCart = []
let dataChartNames = []
let dataChartConfirmed = [];
let dataChartCritical = [];
let dataChartRecovered = [];
let dataChartDeaths = [];


//
// Chart.defaults.global.defaultFontFamily='Lato';
// Chart.defaults.global.defaultFontSize='Lato';
// Chart.defaults.global.defaultFontColor='#777';

//
// let ChartCustom = new Chart(myChart,
//     {
//     type:'bar',
//     data:{
//         labels:[],
//         datasets:[{
//             label:[],
//             data:[],
//             backgroundColor:[
//                 '#003f5c','#58508d','#bc5090','#ff6361','#ffa600',
//             ],
//             borderWidth:1,
//             borderColor:'#777',
//             hoverBorderWidth:3,
//             hoverBorderColor:'red'
//
//         }]
//     },
//     options:{
//         plugins:{
//             title:{
//                 display:true,
//                 text:'Bla Bla',
//                 font:{
//                     size:35
//                 }
//             },
//             legend:{
//                 position:'right',
//                 labels:{
//                     fontColor:'black'
//                 }
//             }
//         }
//     }
// })
let data
const config = {
    type: "line",
    data: data,
    options: {
        plugins: {
            title: {
                display: true,
                text: "",
                font: { size: 25 },
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
};

let ChartCustom
console.log('dd',ChartCustom)
 export function createChart() {
     if (ChartCustom) ChartCustom.destroy()

         ChartCustom = new Chart(myChart,
                 {
                 type: "bar",
                 data: [],
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
    console.log('confi',dataChartNames)
    // ChartCustom.data.labels.push(dataChartNames);
    // // ChartCustom.data.datasets.forEach((dataset) => {
    // // dataset.data.push(data));
    // console.log(dataChartNames)
    //     ChartCustom.update();
    // return dataCart=data

    // removeData()

    addData(ChartCustom, dataChartNames, dataChartConfirmed)
}

export function removeData() {
    ChartCustom.destroy()
    // chart.data.labels=[];
    // // chart.data.datasets.forEach((dataset) => {
    // //     dataset.data.pop();
    // // });
    // chart.data.datasets = []
    // chart.update();


}
function addData(chart, names, data) {

    console.log(names)
    chart.data.labels=names;
    chart.data.label=names
    // chart.data.labels.forEach((dataset) => {
    //     label.data.push(data);
    // });
    // chart.data.datasets.forEach((dataset) => {
    //     dataset.data.push(data);
    // });
    chart.data.datasets.push({data})
    // chart.data.datasets = data
    // removeData(ChartCustom)
    chart.update();

}

//
// #003f5c
// #58508d
// #bc5090
// #ff6361
// #ffa600