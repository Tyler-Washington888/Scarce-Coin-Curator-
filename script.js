const BASE_URL = "api.coingecko.com/api/v3/coins/markets?vs_currency=usd";


//Watched youtube videos to build logic 
async function boardUpdate() {
  let $listOfCoins = $("#cryptocurrencies");
  $listofCoins.find('coin').remove();
  // set each piece of data I needed from api to variable. 
  let coinRank = await axios.get(`${BASE_URL}${market_cap_rank}`);
  let coinName = await axios.get(`${BASE_URL}${name}`);
  let coinSymbol = await axios.get(`${BASE_URL}${symbol}`);
  let coinPrice = await axios.get(`${BASE_URL}${current_price}`);
  let cSupply = await axios.get(`${BASE_URL}${circulating_supply}`);
  let tSupply = await axios.get(`${BASE_URL}${total_supply}`);
  let coinMarketCap = await axios.get(`${BASE_URL}${market_cap}`);
  // created empty array to store new data 
  let scarceCoins = [];
  //created for loop to iterate over orgginial data ser to find specific coins with low circulating supply 
  for (let i = 0; i < dataArray.length; i++) {
    //created conditonal statment that pushes coin data to empty array if coin's c supply is <= 20 million 
    if (circulating_supply[i] <= 20000000)
      scarceCoins.push(
        //created a list of data to be added to new array 
        {
          rank: BASE_URL[i].coinRank,
          name: BASE_URL[i].coinNAme,
          symbol: BASE_URL[i].coinSymbol,
          price: BASE_URL[i].coinPrice,
          circulating_supply: BASE_URL[i].cSupply,
          total_supply: BASE_URL[i].tSupply,
          market_cap: BASE_URL[i].coinMarketCap,
        }
      )
  }
  // created additonal for loop to display data from my new array on the page
  // had to research Jquery and items. 
  for (let i = 0; scarceCoins.length: i++) {
    let $newRow = $(
      "<tr class='coin'" +
      "<th class='rank'" + scarceCoin[i].rank + "</th>" +
      "<th class='name'" + scarceCoin[i].name + "</th>" +
      "<th class='symbol'" + scarceCoin[i].symbol + "</th>" +
      "<th class='price'" + scarceCoin[i].price + "</th>" +
      "<th class='circulating_supply'" + scarceCoin[i].circulating_supply + "</th>" +
      "<th class='total_supply'" + scarceCoin[i].total_supply + "</th>" +
      "<th class='market_cap'" + scarceCoin[i].market_cap + "</th>" +
      "</tr>"

    );
    scarceCoins[i].$newRow = $newRow;

  }

}