import {
    ChartCustom, createChart, printData, removeData, addData, dataChartRecovered,
    dataChartNames, dataChartDeaths, dataChartCritical, dataChartConfirmed, updateCategoryGraph,changeGraphType
} from "./graph.js";

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

function arrangeCountries(data) {
    let listOfCountries = []
    data.data.forEach(countrie => {
        if(countrie.cca2!=='XK') listOfCountries.push(countrie.cca2)
    })
    return listOfCountries
}
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
export const dataButtons = document.querySelector('.data-buttons');
export const worldMap = document.querySelector('.map-div');
export const chartTypeButtonsDiv = document.querySelector('.chart-type-buttons-div');

// export const categoryButtonsDiv = document.querySelector('.category-buttons-div')


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
            console.log(dataCollected)
            // console.log('ee', regionsList[1].data.data.latest_data)
        })
    }
)

dataButtons.addEventListener('click',(event)=>{
    console.log(event.target.dataset.button)

})


categoryButtonsDiv.addEventListener('click',(event)=>{
    let data = event.target.dataset.button
    let label = event.target.dataset.name
    console.log('hhhhh',label)
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

function hideMap(){
    worldMap.style.background='none'
    worldMap.style.height=0
}
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