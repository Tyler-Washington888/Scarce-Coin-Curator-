const BASE_URL = "http://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";



async function boardUpdate() {

  try {
    let coins = await axios.get(`${BASE_URL}`, { crossdomain: true })
    // let symbols = (coins.data.symbol)
    console.log(coins)

  } catch (error) {
    console.log(error);

  }
}
boardUpdate();



// what I wanna do 

