import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import PieChart from "../components/PieChart";

function Compare(){
    const apiKey = "?key=18a129ee851a4354b439424c7f90a3f5"
    const [slug, setSlug] = useState("red-dead-redemption-2");
    const [ratings, setRating] = useState([])
    const [img1, setImg1] = useState("")

    useEffect(() => {
      axios.get("https://api.rawg.io/api/games/"+slug+apiKey)
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
        label: 'Users gained',
        data: ratings.map((data) => data.count),
        tension: 0.6
      }]
    }

    return(
        <>
        <p>Compare</p>
        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)}/>
        <img src={img1} style={{width: "60%"}} />
        <PieChart chartData={rating} />
        </>
    )
}

export default Compare;