import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'

const Coin = () => {

  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null); 
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const url = `https://pro-api.coingecko.com/api/v3/coins/${coinId}`;
    const options = { method: 'GET', headers: { 'x-cg-pro-api-key': 'CG-AoW8dEXe4ZW5YVNdTe46qa1H' }, body: undefined };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error(error);
    }

  }

  const fetchHistoricalData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`;
    const options = { method: 'GET', headers: { 'x-cg-pro-api-key': 'CG-AoW8dEXe4ZW5YVNdTe46qa1H' }, body: undefined };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchCoinData();
  }, [currency])


  if (coinData, historicalData) { 
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData?.image?.large || "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"} />
          <p><b>{coinData?.name} ({coinData?.symbol?.toUpperCase()})</b></p>
        </div>
      </div>
    ) 
  } else {
    return (
      <div className="spinner">
        <div className="spin"> 
        </div>
      </div>
    )
  }
}

export default Coin