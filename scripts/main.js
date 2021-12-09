
const PROXIE_URL = 'https://intense-mesa-62220.herokuapp.com/'
const API1_URL = 'https://restcountries.herokuapp.com/api/v1/region/'
const API2_URL = 'https://corona-api.com/countries/'

const regionsList = []

async function getContriesFromRegion(region) {
    try {
        const data = await axios.get(PROXIE_URL+API1_URL+region,[
            {
                headers:"Access-Control-Allow-Origin",
                Accept: "application/json",
            }
        ]);
        arrangeCountries(data);
    }
    catch(error) {
        console.log(error);
    }
}

async function arrangeCountries(data) {
    let listOfCountries = []
    data.data.forEach(countrie => {
        console.log(countrie.name.common, countrie.cca2)
        listOfCountries.push(countrie.cca2)
    })
    listOfCountries = await Promise.all(listOfCountries)
    // getCovidDataCountriesPerRegion(listOfCountries)}
}
async function getCovidDataCountriesPerRegion(region) {
       const result = region.forEach(countrie=>{
        getCovidDataPerCounrie(countrie)
    })
    return result
    // printData(result)
    // const countrieData =  await  getCovidDataPerCounrie('AF')
    // console.log('result',result[0])

}
async function getCovidDataPerCounrie(countrie) {
    try {
        const data = await axios.get(PROXIE_URL + API2_URL + countrie);
        console.log('dddd', data.data.data)
        arrangeData(data.data.data)
        return data
    } catch (error) {
        console.log(error);
    }
}

function arrangeData(data){
    regionsList.push(data)
    // console.log('data',data)
}

getContriesFromRegion('asia')
    .then(data=>arrangeData(data))
    .then(listOfCountries=>getCovidDataCountriesPerRegion(listOfCountries))
    .then()
