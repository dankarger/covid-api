import {
    ChartCustom, createChart, printData, removeData, addData, dataChartRecovered,
    dataChartNames, dataChartDeaths, dataChartCritical, dataChartConfirmed, updateCategoryGraph,changeGraphType,
    showCountryGraph } from "./graph.js";

const PROXIE_URL = 'https://intense-mesa-62220.herokuapp.com/'
const API1_URL = 'https://restcountries.herokuapp.com/api/v1/region/'
const API2_URL = 'https://corona-api.com/countries/'
export const currentDate = "("+new Date().toDateString()+")"
export const categoryButtonsDiv = document.querySelector('.category-buttons-div')

const dateObject = document.querySelector('.date');
dateObject.textContent = currentDate

export let region =''
let regionsList = []
export let dataCollected = []

//function to get the countries of a certain region from the country API
async function getContriesFromRegion(region) {
    try {
        return await axios.get(PROXIE_URL+API1_URL+region,[
            // {
            //     headers:"Access-Control-Allow-Origin",
            //     Accept: "application/json",
            // }
        ]);

    }
    catch(error) {
        console.log(error);
    }
}

//Function that arrange the countries codes
function arrangeCountries(data) {
    let listOfCountries = []
    data.data.forEach(countrie => {
        if(countrie.cca2!=='XK') listOfCountries.push(countrie.cca2)
    })
    return listOfCountries
}

//Function that iterate on the countries region and receive the data for each country(from getCovidDataPerCountry())
async function getCovidDataCountriesPerRegion(region) {
        let result = []
        region.forEach(countrie => {
            result.push(getCovidDataPerCounrie(countrie))
        })
        result = await Promise.all(result)  // maybe fix
        regionsList = result
        return result

}
// const results = await Promise.all(covidArr.map((p) => p.catch((e) => e)));
// const validResults = results.filter((result) => !(result instanceof Error));

//Get data from the covid API for a selected country
async function getCovidDataPerCounrie(countrie) {
    try {
        return  await axios.get(PROXIE_URL + API2_URL + countrie);
    } catch (error) {
        console.log(error);
    }
}

function arrangeData(data){
    dataCollected= data
}


const regionsButtons = document.querySelector('.regions-buttons-div');
export const countryButtons = document.querySelector('.countries-buttons');
export const worldMap = document.querySelector('.map-div');
export const chartTypeButtonsDiv = document.querySelector('.chart-type-buttons-div');

// export const categoryButtonsDiv = document.querySelector('.category-buttons-div')

//EVENT LISTENERS

//Event listener for the region buttons, that start a chain of functions
regionsButtons.addEventListener('click',(event)=> {
         region = event.target.dataset.region
        getContriesFromRegion(region)
            .then(data => arrangeCountries(data))
            .then(listOfCountries => getCovidDataCountriesPerRegion(listOfCountries))
            .then(result => arrangeData(result)).then(() => {
             createChart()
            hideMap()
            showCategoryButtons()
             printData(dataCollected)

            // console.log('ee', regionsList[1].data.data.latest_data)
        })
    }
)

//Event listener ?
countryButtons.addEventListener('click',(event)=>{
    console.log('hi',event.target.dataset.button);
    console.log('data-collect',dataCollected)
    const result = dataCollected.find(obj => {
        return obj.data.data.name === event.target.dataset.button;
    })
    console.log('result',result)
    showCountryGraph(result)

})

// Event listener for the category buttons that update the chart.
categoryButtonsDiv.addEventListener('click',(event)=>{
    let data = event.target.dataset.button
    let label = event.target.dataset.name

    // addData(ChartCustom, dataChartNames, data,label);
    // addData(ChartCustom ,dataChartNames,dataChartRecovered,label);
    updateCategoryGraph(data,label)

})

//change graph type
// chartTypeButtonsDiv.addEventListener('click',(event)=>{
//
//     changeGraphType(event.target.dataset.type)
//
// })

//Function to hide the map
function hideMap(){
    worldMap.style.background='none'
    worldMap.style.height=0
}
//Function that show the div of category buttons after the region select.
function showCategoryButtons() {
    categoryButtonsDiv.style.display = 'flex'
}
// TODO:add loader spinner
// TODO:disable buttons after press
// TODO:make responsive
// TODO:country graph
// TODO:add select button
// TODO:add comments
// TODO:write readme.ms