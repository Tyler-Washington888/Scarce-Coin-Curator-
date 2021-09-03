const BASE_URL = "http://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

const button = document.querySelector('button');
const input = document.querySelector('#search');
const searchCoin = document.querySelector(".searchCoin")
button.addEventListener('click', fetchSearch)
async function fetchSearch() {
  try {
    let searchedCoin = input.value
    let SEARCH_URL = `http://api.coingecko.com/api/v3/coins/${searchedCoin}?vs_currency=usd`
    let res = await axios.get(`${SEARCH_URL}`, { crossdomain: true });
    let coinInfoData = document.querySelector('.coinInfoData');
    let rightImageDiv = document.createElement('img');
    rightImageDiv.class = 'rightImageDiv';
    rightImageDiv.src = res.data.image.large;
    console.log(res.data.image.large);
    coinInfoData.appendChild(rightImageDiv);
    let nameH1 = document.createElement('h1');
    nameH1.innerText = res.data.name;
    coinInfoData.appendChild(nameH1);
    let symbolH2 = document.createElement('h2')
    symbolH2.innerText = res.data.symbol;
    coinInfoData.appendChild(symbolH2);
    let priceRight = document.createElement('h2')
    priceRight.innerText = `${'$'}${res.data.market_data.current_price.usd}`;
    coinInfoData.appendChild(priceRight);
    let circSupply = document.createElement('h2')
    circSupply.innerText = res.data.market_data.circulating_supply;
    coinInfoData.appendChild(circSupply);
  } catch (error) {
    console.log(error);
  }
}

async function getGoodData() {
  try {
    let res = await axios.get(`${BASE_URL}`, { crossdomain: true });
    for (let i = 0; i < 100; i++) {
      let coinData = res.data[i];
      let supply = res.data[i].circulating_supply;
      if (supply <= 20000000) {
        displayToTable(coinData);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
getGoodData();

function displayToTable(coinData) {
  let newTableRow = document.createElement('TR');
  newTableRow.class = 'newTableRow';
  let newDataCell0 = document.createElement('TD');
  newDataCell0.class = 'tableDataElement';
  newDataCell0.innerHTML = '';
  newTableRow.append(newDataCell0);
  let newDataCell1 = document.createElement('TD');
  newDataCell1.class = 'tableDataElement';
  if (coinData.market_cap_rank === undefined) {
    newDataCell1.innerHTML = " ";
  } else {
    newDataCell1.innerHTML = coinData.market_cap_rank;
  }
  newTableRow.append(newDataCell1);
  let newDataCell9 = document.createElement('TD');
  let coinImage = document.createElement('img');
  coinImage.class = 'tableDataElement'
  coinImage.src = coinData.image;
  newDataCell9.appendChild(coinImage);
  newTableRow.appendChild(newDataCell9);
  let newDataCell2 = document.createElement('TD');
  newDataCell2.class = 'tableDataElement';
  newDataCell2.innerHTML = `${coinData.name} <span style="text-transform:uppercase">${coinData.symbol}</span>`;
  newTableRow.append(newDataCell2);
  let newDataCell3 = document.createElement('TD');
  newDataCell3.class = 'tableDataElement';
  newDataCell3.innerHTML = `${'$'}${coinData.current_price}`
  newTableRow.append(newDataCell3);
  let newDataCell4 = document.createElement('TD');
  newDataCell4.class = 'tableDataElement';
  newDataCell4.innerHTML = coinData.circulating_supply;
  newTableRow.append(newDataCell4);
  let newDataCell5 = document.createElement('TD');
  newDataCell5.class = 'tableDataElement';
  newDataCell5.innerHTML = coinData.total_supply;
  newTableRow.append(newDataCell5);
  let newDataCell6 = document.createElement('TD');
  newDataCell6.class = 'coinMarketCap';
  newDataCell6.innerHTML = `${'$'}${coinData.market_cap}`
  newTableRow.append(newDataCell6);
  let newDataCell7 = document.createElement('TD');
  newDataCell7.class = 'blankRight';
  newDataCell7.innerHTML = '';
  newTableRow.append(newDataCell7)
  let tableBody = document.querySelector('tbody');
  tableBody.appendChild(newTableRow);
}

