import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";

function Compare(){
    const apiKey = "?key=18a129ee851a4354b439424c7f90a3f5"
    const [slug, setSlug] = useState("satisfactory");
    const [ratings, setRating] = useState([])
    const [img1, setImg1] = useState("")
    const [store1Count, setStore1Count] = useState(0);
    const [store2Count, setStore2Count] = useState(0);
    const [store1Name, setStore1Name] = useState('');
    const [store2Name, setStore2Name] = useState('');

    useEffect(() => {
      axios.get("https://api.rawg.io/api/games/" + slug + apiKey)
      .then((res) => {
        console.log(res.data);
        setRating(res.data.ratings)
        setImg1(res.data.background_image)
      })
    }, [slug])

    const rating = {
      labels: ratings.map((data) => data.title),
      options: {
        // scales: {
        //   xAxes: [{
        //     type: 'date'
        //   }]
        // }
      },
      datasets: [{
        label: 'Percent',
        data: ratings.map((data) => data.percent),
        tension: 0.6,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 197, 0, 1)'
        ]
      }]
    }

    useEffect(() => {
      axios.get("https://api.rawg.io/api/games/" + slug + apiKey)
      .then((res) => {
        //console.log(res.data.stores[0].store.games_count)
        //console.log(res.data.stores[1].store.games_count)
        const store1 = res.data.stores[0].store;
        const store2 = res.data.stores[1].store;
        setStore1Count(store1.games_count);
        setStore2Count(store2.games_count);
        setStore1Name(store1.name);
        setStore2Name(store2.name);
      })

    }, [slug])

    const gamesCount = {
      labels: [store1Name, store2Name],
      datasets: [{
        label: 'Games Sold',
        data: [store1Count, store2Count]
      }]
    }

    useEffect(() => {
      axios.get("https://api.rawg.io/api/games/" + slug + apiKey)
      .then((res) => {
        console.log(res.data.added_by_status)
      })
    }, [slug])

    return(
        <div>
          <p>Compare</p>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)}/>
          <br></br>
          <img
            src={img1} 
            style={{
              width: "40%"
            }} 
          />
          <div>
            <div 
              style={{
                width: '30%',
                height: '30%'
              }}
            >
              <PieChart chartData={rating} />
            </div>
            <div
              style={{
                width: '30%',
                height: '30%'
              }}
            >
            <BarChart chartData={gamesCount} />
            </div>
          </div>
          
        </div>
    )
}

export default Compare;