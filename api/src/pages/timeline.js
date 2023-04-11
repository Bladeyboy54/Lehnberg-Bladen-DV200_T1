import React from "react";
import LineChart from "../components/LineChart";
import { useState, useEffect } from 'react';
import axios from 'axios';

function Timeline(){

    const [Labels, setLabels] = useState([])
    const [lineData, setLineData] = useState([])
    const apiKey = "?key=18a129ee851a4354b439424c7f90a3f5"

    useEffect(() => {
        axios.get('https://api.rawg.io/api/developers'+apiKey)
        .then(res => {
            console.log(res.data)
            let results = res.data.results[0].games
            let names = []
            let releaseDate = []
            let releaseTimestamp = []
            
            for (let i = 0; i < res.data.results[0].games.length; i++) {
                names.push(res.data.results[0].games[i].name)
                axios.get('https://api.rawg.io/api/games/'+res.data.results[0].games[i].id+apiKey)
                .then(res1 => {
                    console.log(res1.data.released);
                    releaseDate.push(res1.data.released)
                })
            }
            console.log(names)
            setLabels(names)
            console.log(results)
            setLineData(releaseDate)

        })
        .catch(err => {
            console.log(err)
        })
    },[])

    const developers = {
        Labels: Labels,
        options: {
            scales: {
                xAxes: [{
                    type: 'data'
                }]
            }
        },
        datasets: [{
            label: 'Labels',
            data: lineData,
            tension: 0.6
        }]
    }

    return(
        <div style={{width: "70%", display: 'flex', justifyContent: 'center' }}> 
            <LineChart chartData={developers} />
        </div>
       
    )
}

export default Timeline;