import React from "react";
import LineChart from "../components/LineChart";
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

function Timeline(){

    const [labels, setLabels] = useState([])
    const [lineData, setLineData] = useState([])
    const apiKey = "?key=18a129ee851a4354b439424c7f90a3f5"

    useEffect(() => {
        axios.get('https://api.rawg.io/api/developers'+apiKey)
        .then(res => {
            console.log(res.data)
            let results = res.data.results[0].games
            let names = []
            let releaseDate = []
            let releaseTimestamps = []
            console.log(res.data.results[0].games.length);
            for (let i = 0; i < res.data.results[0].games.length; i++) {
                axios.get('https://api.rawg.io/api/games/'+res.data.results[0].games[i].id+apiKey)
                .then(res1 => {
                    const releaseDate = res1.data.released
                    // console.log(moment(releaseTimestamps).valueOf())
                    // releaseTimestamps.push(moment.utc(releaseDate).format('YYYY-MM-DD'));
                    names.push(res.data.results[0].games[i].name)

                    releaseTimestamps.push(parseInt(moment.utc(releaseDate).format('YYYY')));
                    // console.log(moment.utc(releaseDate).format('YYYY-MM-DD'));
                    
                    if (releaseTimestamps.length === res.data.results[0].games.length) {
                        // console.log(releaseTimestamps)
                        setLabels(names);
                        setLineData(releaseTimestamps);
                        console.log(releaseTimestamps);
                        
                    }
                    // // console.log(res1.data.released);
                    // // releaseDate.push(res1.data.released)
                    // console.log(lineData);
                })
               

            }
            // console.log(names)
            // setLabels(names)
            // console.log(results)
            // setLineData(releaseDate)

        })
        .catch(err => {
            console.log(err)
        })
    },[])

    const developers = {
        Labels: labels,
        options: {
            locale: 'en-ZA',
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Game Name'
                    }
                }],
                yAxes: [{
                    type: 'time',
                    time: {
                        unit: 'year',
                        displayFormats: {
                            year: 'YYYY',
                        },
                    

                    },
                    // scaleLabel: {
                    //     display: true,
                    //     labelString: 'Release Date'
                    // },
                    // ticks: {
                    //     callback: function(value) {  
                    //         return moment(value).format('MMM YYYY');
                    //     }
                    // }
                }]
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        },
        datasets: [{
            label: 'Ubisoft',
            // data: lineData.map((timestamp, i) => ({x: labels[i], y: moment(timestamp).valueOf() })),
            data: lineData.map((timestamp, i) => ({x: labels[i], y: timestamp })),

            tension: 0.6
        }]
    }

    return(
        <div className="mt-5" style={{width: "70%", marginLeft: "auto", marginRight: "auto"}}> 
            <Card>
                <CardHeader>
                   <LineChart chartData={developers} /> 
                </CardHeader>
                <Card.Body>
                    <Card.Title>Games Relaesed By Ubisoft between 2012 & 2018</Card.Title>
                </Card.Body>
            </Card>
            
        </div>
       
    )
}

export default Timeline;