console.log('hi')
const PROXIE_URL = 'https://intense-mesa-62220.herokuapp.com/'
const API1_URL = 'https://restcountries.herokuapp.com/api/v1/region/'
const API2_URL = 'https://corona-api.com/countries/'

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
function arrangeCountries(data) {
    const listOfCountries = []
    data.data.forEach(countrie=>{
        console.log(countrie.name.common,countrie.cca2)
        listOfCountries.push(countrie.cca2)
    })
    getCovidDataCountriesPerRegion(listOfCountries)}


async function getCovidDataCountriesPerRegion(region) {
    const countriesData = []

    await region.forEach(countrie=>{
        const data =  getCovidDataPerCounrie(countrie)
        countriesData.push(data)
    })
    // const countrieData =  await  getCovidDataPerCounrie('AF')
    console.log(countriesData)
    console.log('d',countriesData)
}
async function getCovidDataPerCounrie(countrie) {
    try {
        const data = await axios.get(PROXIE_URL+API2_URL+countrie,[
            {
                headers:"Access-Control-Allow-Origin",
                Accept: "application/json",
                // Content-Type: "application/json",
            }
        ]);
        return data
    }
    catch(error) {
        console.log(error);
    }


}
getContriesFromRegion('asia')