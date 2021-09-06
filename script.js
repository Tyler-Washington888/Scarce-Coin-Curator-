const button = document.querySelector('button');
const input = document.querySelector('#search');
const searchCoin = document.querySelector(".searchCoin");

const BASE_URL = "http://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

function cryptoPriceFormat(price) {
  if (price < .01) {
    price *= 100000;
    price = Math.round(price);
    return '$' + (price / 100000).toString();
  }
  return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', useGrouping: true }).format(price);
}

async function fetchSearch(coin) {
  try {
    // get data from api
    let searchUrl = `http://api.coingecko.com/api/v3/coins/${coin}?vs_currency=usd`
    let res = await axios.get(searchUrl, { crossdomain: true });

    // empting the coin query 
    let coinInfoData = document.querySelector('.coinInfoData');
    coinInfoData.innerText = "";

    let rightImageDiv = document.createElement('img');
    rightImageDiv.id = 'rightImage';
    let nameH1 = document.createElement('h1');
    nameH1.id = "rightName"
    let symbolH2 = document.createElement('h2');
    symbolH2.id = "rightSymbol"
    let priceChange = document.createElement('h2');
    priceChange.id = "rightPriceChange"
    let priceRight = document.createElement('h2');
    priceRight.id = "rightPrice"
    let circSupply = document.createElement('h2');
    circSupply.id = "rightSupply"
    let scarcityScore = document.createElement('h2');
    scarcityScore.id = 'rightScarcityScore';

    rightImageDiv.src = res.data.image.large;
    nameH1.innerText = res.data.name;
    priceChange.innerText = res.data.market_data.price_change_percentage_24h.toFixed(2) + '%';
    if (res.data.market_data.price_change_percentage_24h < 0) {
      priceChange.style.color = 'red';
    } else {
      priceChange.style.color = 'lightgreen';
    }
    symbolH2.innerText = res.data.symbol.toUpperCase();
    priceRight.innerText = cryptoPriceFormat(res.data.market_data.current_price.usd);
    circSupply.innerText = new Intl.NumberFormat('en', { style: 'decimal', useGrouping: true }).format(res.data.market_data.circulating_supply);

    coinInfoData.appendChild(rightImageDiv);
    coinInfoData.appendChild(nameH1);
    coinInfoData.appendChild(symbolH2);
    coinInfoData.appendChild(priceChange);
    coinInfoData.appendChild(priceRight);
    coinInfoData.appendChild(circSupply);


    let coinCircSupply = res.data.market_data.circulating_supply;

    scarcityScore.innerText = "Scarcity Score: 1";
    coinInfoData.appendChild(scarcityScore);
    console.log(scarcityScore);

    if (coinCircSupply <= 10000000000) {
      scarcityScore.innerText = "Scarcity Score: 2";
      coinInfoData.appendChild(scarcityScore);
      console.log(scarcityScore);
    } if (coinCircSupply <= 1000000000) {
      scarcityScore.innerText = "Scarcity Score: 3";
      coinInfoData.appendChild(scarcityScore);
      console.log(scarcityScore);
    } if (coinCircSupply <= 100000000) {
      scarcityScore.innerText = "Scarcity Score: 4";
      coinInfoData.appendChild(scarcityScore);
      console.log(scarcityScore);
    } if (coinCircSupply <= 20000000) {
      scarcityScore.innerText = "Scarcity Score: 5";
      coinInfoData.appendChild(scarcityScore);
      console.log(scarcityScore);
    }
  } catch (error) {
    console.log(error);
  }
}
button.addEventListener('click', () => fetchSearch(input.value));




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
  let newDataCell1 = document.createElement('TD');
  newDataCell1.id = 'coinRankData';
  newDataCell1.innerHTML = coinData.market_cap_rank;
  newTableRow.append(newDataCell1);
  let newDataCell9 = document.createElement('TD');
  let coinImage = document.createElement('img');
  coinImage.class = 'tableDataElement'
  coinImage.src = coinData.image;
  newDataCell9.appendChild(coinImage);
  newTableRow.appendChild(newDataCell9);
  let newDataCell2 = document.createElement('TD');
  newDataCell2.class = 'tableDataElement';
  newDataCell2.id = 'nameSymbol';
  newDataCell2.innerHTML = `${coinData.name} <span class="saveDisplay" style="text-transform:uppercase">${coinData.symbol}</span>`;
  newTableRow.append(newDataCell2);
  let newDataCell3 = document.createElement('TD');
  newDataCell3.class = 'tableDataElement';
  newDataCell3.innerHTML = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', useGrouping: true }).format(coinData.current_price);
  newTableRow.append(newDataCell3);
  let newDataCell4 = document.createElement('TD');
  newDataCell4.class = 'tableDataElement';
  newDataCell4.innerHTML = new Intl.NumberFormat('en', { style: 'decimal', useGrouping: true }).format(coinData.circulating_supply);
  newTableRow.append(newDataCell4);
  let newDataCell5 = document.createElement('TD');
  newDataCell5.id = 'totalSupply';
  if (coinData.id == 'monero') {
    newDataCell5.innerHTML = '17,987,124';
  } else {
    newDataCell5.innerHTML = new Intl.NumberFormat('en', { style: 'decimal', useGrouping: true }).format(coinData.total_supply);
  }
  newTableRow.append(newDataCell5);
  let newDataCell6 = document.createElement('TD');
  newDataCell6.id = 'coinMarketCap';
  let uglyNum = Math.round((coinData.market_cap));
  newDataCell6.innerHTML = '$' + new Intl.NumberFormat('en', { style: 'decimal', currency: 'USD', useGrouping: true }).format(uglyNum);
  newTableRow.append(newDataCell6);

  let newDataCell10 = document.createElement('TD');
  newDataCell10.class = "24hrCahnge"
  newDataCell10.innerText = coinData.price_change_percentage_24h.toFixed(2) + '%';
  if (coinData.price_change_percentage_24h < 0) {
    newDataCell10.style.color = 'red';
  } else {
    newDataCell10.style.color = 'lightgreen';
  }
  newTableRow.append(newDataCell10);
  let tableBody = document.querySelector('tbody');
  tableBody.appendChild(newTableRow);
}
fetchSearch('bitcoin');
