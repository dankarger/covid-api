
const PROXIE_URL = 'https://intense-mesa-62220.herokuapp.com/'
const API1_URL = 'https://restcountries.herokuapp.com/api/v1/region/'
const API2_URL = 'https://corona-api.com/countries/'

let regionsList = []
let dataCollected = []

async function getContriesFromRegion(region) {
    try {
        const data = await axios.get(PROXIE_URL+API1_URL+region,[
            {
                headers:"Access-Control-Allow-Origin",
                Accept: "application/json",
            }
        ]);
        // arrangeCountries(data);
        return data
    }
    catch(error) {
        console.log(error);
    }
}

function arrangeCountries(data) {
    let listOfCountries = []
    data.data.forEach(countrie => {
        // console.log(countrie.name.common, countrie.cca2)
        listOfCountries.push(countrie.cca2)
    })
    return listOfCountries
    // listOfCountries = await Promise.all(listOfCountries)
    // getCovidDataCountriesPerRegion(listOfCountries)}
}
async function getCovidDataCountriesPerRegion(region) {
        let result = []
        region.forEach(countrie=>{
        result.push(getCovidDataPerCounrie(countrie))
    })
        result = await Promise.all(result)
        regionsList= result
       console.log('redult', typeof result)
        return result

    // const countrieData =  await  getCovidDataPerCounrie('AF')
    // console.log('result',result[0])

}
async function getCovidDataPerCounrie(countrie) {
    try {
        const data = await axios.get(PROXIE_URL + API2_URL + countrie);
        // console.log('dddd', data.data.data)
        // arrangeData(data.data.data)
        return data
    } catch (error) {
        console.log(error);
    }
}

function arrangeData(data){
    regionsList.push(data)
    // console.log('datatada',data)

}

getContriesFromRegion('asia')
    .then(data=>arrangeCountries(data))
    .then(listOfCountries=>getCovidDataCountriesPerRegion(listOfCountries))
    .then(result=>arrangeData(result)).then(()=>{
    console.log('test',regionsList[0])
    console.log('ee', regionsList[1].data.data.latest_data)
})
