const BASE_URL = "api.coingecko.com/api/v3/coins/markets?vs_currency=usd";


async function boardUpdate() {
  let name = await axios.get(`${BASE_URL}${name}`);
  // let scarceCoins = [];
  for (let i = 0; i < 10; i++) {
    // scarceCoins.push(
    //   {
    //     name: 

    // }
    console.log(name)

  }






}
boardUpdate();