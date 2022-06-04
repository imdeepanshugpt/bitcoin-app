import axios from 'axios';

export const getBitcoinPrices = async () => {
  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

  const result = await axios.get(URL);
  console.log(result);
  return result;
};
