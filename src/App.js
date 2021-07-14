import bchlogo from "./bch-logo.png";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import axios from "axios";

function App() {
  const url = "https://index-api.bitcoin.com/api/v0/cash/price/usd";
  const [bchPrice, setPrice] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      setPrice(response.data);
    });
  }, [url]);

  const dailyPrice = "https://index-api.bitcoin.com/api/v0/cash/history";
  const [bchDailyPrice, getDailyPrice] = useState(null);

  useEffect(() => {
    axios.get(dailyPrice).then((response) => {
      getDailyPrice(response.data);
    });
  }, [dailyPrice]);

  const newsUrl = "https://news.bitcoin.com/feed/";
  const [newsFeed, getNews] = useState(null);

  useEffect(() => {
    axios
      .get(newsUrl, { "Content-Type": "application/xml; charset=utf-8" })
      .then((response) => {
        const allNews = response.data;
        getNews(response.data);
        console.log(allNews);
      })
      .catch((error) => console.error("News error"));
  }, [newsUrl]);

  // check if the bch price has data
  if (bchPrice) {
    // insert decimals to properly display bch price
    let bchCurrent = (bchPrice.price / 100).toFixed(2);

    // data for bch graph

    // const graphData = [bchDailyPrice];
    console.log(bchDailyPrice);
    const sampleData = [
      { name: "1", price: 150, pv: 2400, amt: 2400 },
      { name: "2", price: 215, pv: 1398, amt: 2210 },
      { name: "3", price: 400, pv: 9800, amt: 2290 },
      { name: "4", price: 560, pv: 3908, amt: 2000 },
      { name: "5", price: 500, pv: 4800, amt: 2181 },
      { name: "6", price: 300, pv: 3800, amt: 2500 },
      { name: "7", price: 450, pv: 4300, amt: 2100 },
    ];

    const renderGraph = (
      <LineChart
        width={600}
        height={300}
        data={sampleData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    );

    return (
      <div className="App">
        <header className="App-header">
          <div className="bitcoinCash">
            <img src={bchlogo} className="Bch-logo" alt="bch-logo" />
            <p>
              {" "}
              Bitcoin Cash (BCH) <b>${bchCurrent}</b>{" "}
            </p>
          </div>
          {renderGraph}
          <div className="buttons">
            <Button variant="hours" size="xxl">
              Hours
            </Button>{" "}
            <Button variant="days" size="xxl">
              Days
            </Button>{" "}
            <Button variant="months" size="xxl">
              Months
            </Button>{" "}
          </div>
          <div>
            <h2> XML News Feed</h2>
            {newsFeed}
          </div>
        </header>
      </div>
    );
  }

  return (
    <div>
      <h1>Error reading price chart :(</h1>
    </div>
  );
  // I tried my best
}

export default App;
