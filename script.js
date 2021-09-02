const BASE_URL = "http://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";



async function getGoodData(index = 0) {
  try {
    let res = await axios.get(`${BASE_URL}`, { crossdomain: true });
    let coinData = res.data[index];
    // for (let i = 0; i < 50; i++) {
    // let supply = res.data[index].circulating_supply;
    // if (supply <= 20000000) {
    displayToTable(coinData);
    // }
  }// displayCoin(coinData)
  catch (error) {
    console.log(error);
  }
}
getGoodData();

function displayToTable(coinData) {
  let newTableRow = document.createElement('TR');
  let newDataCell0 = document.createElement('TD');
  newDataCell0.class = 'blankLeft';
  newDataCell0.innerHTML = '';
  newTableRow.append(newDataCell0);
  let newDataCell1 = document.createElement('TD');
  newDataCell1.class = 'coinRank';
  newDataCell1.innerHTML = coinData.market_cap_rank;
  newTableRow.append(newDataCell1);
  let newDataCell9 = document.createElement('TD');
  let coinImage = document.createElement('img');
  coinImage.class = 'coinImage'
  coinImage.src = coinData.image;
  newDataCell9.appendChild(coinImage);
  newTableRow.appendChild(newDataCell9);
  let newDataCell2 = document.createElement('TD');
  newDataCell2.class = 'coinName';
  newDataCell2.innerHTML = `${coinData.name} ${coinData.symbol}`;
  newTableRow.append(newDataCell2);
  let newDataCell3 = document.createElement('TD');
  newDataCell3.class = 'coinPrice';
  newDataCell3.innerHTML = `${'$'}${coinData.current_price} `
  newTableRow.append(newDataCell3);
  let newDataCell4 = document.createElement('TD');
  newDataCell4.class = 'coinCirculatingSupply';
  newDataCell4.innerHTML = coinData.circulating_supply;
  newTableRow.append(newDataCell4);
  let newDataCell5 = document.createElement('TD');
  newDataCell5.class = 'coinTotalSupply';
  newDataCell5.innerHTML = coinData.total_supply;
  newTableRow.append(newDataCell5);
  let newDataCell6 = document.createElement('TD');
  newDataCell6.class = 'coinMarketCap';
  newDataCell6.innerHTML = coinData.market_cap;
  newTableRow.append(newDataCell6);
  let newDataCell7 = document.createElement('TD');
  newDataCell7.class = 'blankRight';
  newDataCell7.innerHTML = '';
  newTableRow.append(newDataCell7)
  let tableBody = document.querySelector('tbody');
  tableBody.appendChild(newTableRow);
}

// function editCoinInfo() {
//   coinList.innerHTML = ''
//   let randomIdx = randomIndex()
//   getGoodData(randomIdx);


// function displayCoin(coinData) {
  //   let coinDiv = document.createElement("div");
  //   let coinImage = document.createElement('img');
  //   coinImage.src = coinData.image;
  //   coinDiv.append(coinImage);
  //   let coinNameH1 = document.createElement('h1');
  //   coinNameH1.innerHTML = coinData.name;
  //   coinDiv.append(coinNameH1);
  //   let coinSymbolH2 = document.createElement('h2');
  //   coinSymbolH2.innertext = coinData.symbol;
  //   coinDiv.append(coinSymbolH2);
  //   let coinPriceH1 = document.createElement("h1");
  //   coinPriceH1.innerHTML = "$ " + coinData.current_price;
  //   coinDiv.append(coinPriceH1);
  //   let circulatingSupplyH1 = document.createElement('h1');
  //   circulatingSupplyH1.innerHTML = coinData.circulating_supply;
  //   coinDiv.append(circulatingSupplyH1);
  //   coinList.append(coinDiv);
  // }

  // let coinList = document.querySelector('.coinList');

  // let button = document.querySelector('button');
  // button.addEventListener('click', editCoinInfo)

  // function randomIndex() {
  //   return Math.floor(Math.random() * 100)
  // }


// }





