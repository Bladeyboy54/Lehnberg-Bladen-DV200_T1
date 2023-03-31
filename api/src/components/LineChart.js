import React from 'react'
import {Line} from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { useState, useEffect } from 'react';
import axios from 'axios';

function LineChart({chartData}) {
  const [labels, setLabels] = useState([])
  const [lineData, setLineData] = useState([])


  useEffect (() => {
    console.log("Test");
    axios.get('https://api.rawg.io/api/developers?key=18a129ee851a4354b439424c7f90a3f5')
    .then(res => { 
      let results = res.data.results[0].games
      // let names = res.data.results[0].games.map(name)
      let names = []
      let releaseDate = []

      for (let i = 0; i < res.data.results[0].games.length; i++) {
        names.push(res.data.results[0].games[i].name)
        axios.get('https://api.rawg.io/api/games/'+res.data.results[0].games[i].id+'?key=18a129ee851a4354b439424c7f90a3f5')
        .then(res1 => { 
          console.log(res1.data.released);
          releaseDate.push(res1.data.released)
        })
      }
      console.log(names)
      setLabels(names)
      setLineData(releaseDate)
      console.log(results)
      // console.log(res.data.info)

    })
    .catch(err => {
      console.log(err)
    })
  },[])

  const developers = {
    labels: labels,
    options: {
      scales: {
        xAxes: [{
          type: 'date'
        }]
      }
    },
    datasets: [{
      label: 'Users gained',
      data: lineData,
      tension: 0.6
    }]
  }

  return (
    <Line data={developers} />
  )
}

export default LineChart