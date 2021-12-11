import {
     createChart, printData, updateCategoryGraph,
     showCountryGraph,  hideCountryInfo } from "./graph.js";
import {selectedRegionButton} from "./ui.js";


const PROXIE_URL = 'https://intense-mesa-62220.herokuapp.com/'
const API1_URL = 'https://restcountries.herokuapp.com/api/v1/region/'
const API2_URL = 'https://corona-api.com/countries/'
export const currentDate = "("+new Date().toDateString()+")"
export const categoryButtonsDiv = document.querySelector('.category-buttons-div')

let regionsCoronaDataArray ={}
let regionsListCountries= {}

const dateObject = document.querySelector('.date');
dateObject.textContent = currentDate

export let region =''
let regionsList = {}
export let dataCollected = []

//function to get the countries of a certain region from the country API
async function getCountriesFromRegion(region) {
    try {
        if(regionsListCountries[region]){
        return regionsListCountries[region]}
            else {
            const currentRegion= await axios.get(PROXIE_URL+API1_URL+region);
            regionsListCountries[region] = currentRegion;
            return currentRegion
        }
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
       if(regionsCoronaDataArray[region]){
           return regionsCoronaDataArray[region];
       }else {
           region.forEach(countrie => {
               result.push(getCovidDataPerCounrie(countrie))
           })
           result = await Promise.all(result)  // maybe fix
           regionsList = result
           regionsCoronaDataArray[region]= result
       }
        return result
}

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
const allButtonsArray = document.querySelectorAll('button')
export const worldMapDiv = document.querySelector('.map-div');
export const worldMap = document.querySelector('.map');
export const chartTypeButtonsDiv = document.querySelector('.chart-type-buttons-div');
const spinner = document.querySelector('.loader-spinner');

// export const categoryButtonsDiv = document.querySelector('.category-buttons-div')

//-----------EVENT LISTENERS---------------

//Event listener for the region buttons, that start a chain of functions
regionsButtons.addEventListener('click',(event)=> {
    if (event.target===regionsButtons) return
         region = event.target.dataset.region;
        disableButtons(allButtonsArray)
        worldMap.classList.add('zoom-map')
        getCountriesFromRegion(region)
            .then(data => arrangeCountries(data))
            .then(listOfCountries => getCovidDataCountriesPerRegion(listOfCountries))
            .then(result => arrangeData(result)).then(() => {
             createChart()
             showCategoryButtons()
             hideCountryInfo()
             setTimeout(hideMap,1200)
             printData(dataCollected)
             activateButtons(allButtonsArray)
             selectedRegionButton(event.target)

        })
    }
)

//Event listener
countryButtons.addEventListener('click',(event)=>{
    if (event.target===countryButtons) return
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
    if (event.target===categoryButtonsDiv) return
    let data = event.target.dataset.button
    let label = event.target.dataset.name
    updateCategoryGraph(data,label)

})

//--------------------------------------------------
//Function to hide the map
function hideMap(){
    worldMapDiv.classList.add('hide-map')
}
//Function that show the div of category buttons after the region select.
function showCategoryButtons() {
    categoryButtonsDiv.style.display = 'flex'
}

//disable and activate buttons functions
function disableButtons(buttons){
    spinner.classList.toggle('activate-spinner')
        buttons.forEach(button=>{
            button.disabled = true;
        })
}
function activateButtons(buttons){
    spinner.classList.toggle('activate-spinner')
    buttons.forEach(button=>{
        button.disabled = false;
    })
}

