import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { CardGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import PolarAreaChart from "../components/PolarAreaChart";
import CardHeader from "react-bootstrap/esm/CardHeader";

function Compare(){
    const apiKey = "?key=18a129ee851a4354b439424c7f90a3f5"
    const [slug, setSlug] = useState("red-dead-redemption-2");
    const [ratings, setRating] = useState([])
    const [img1, setImg1] = useState("")
    const [store1Count, setStore1Count] = useState(0);
    const [store2Count, setStore2Count] = useState(0);
    const [store1Name, setStore1Name] = useState('');
    const [store2Name, setStore2Name] = useState('');
    const [addedStatus, setAddedStatus] = useState([])

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
        color: "#FFFFFF",
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
        label: 'Games Avaliable',
        data: [store1Count, store2Count]
      }]
    }

    useEffect(() => {
      axios.get("https://api.rawg.io/api/games/" + slug + apiKey)
      .then((res) => {
        console.log(res.data.added_by_status)
        setAddedStatus(res.data.added_by_status)
      })
    }, [slug])

    const addStatus = {
      labels: ['Yet', 'Owned', 'Beaten', 'To Play', 'Dropped', 'Playing'],
      datasets: [
        {
          label: 'Status',
          data: [
            addedStatus.yet,
            addedStatus.owned,
            addedStatus.beaten,
            addedStatus.toplay,
            addedStatus.dropped,
            addedStatus.playing,
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderWidth: 1,
        },
      ],
    }

    return(
        <div className="mt-5">
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Form className="d-flex" style={{width: "20%", borderRadius: "30px"}}>
              <Form.Control
                type="text"
                className="me-2"
                aria-label="Search"
                value={slug}
                onChange={(e) => setSlug(e.target.value)} 
              />
              <Button variant="outline-success" >Search</Button>
            </Form>
          </div>
          
          <br></br>
          <img src={img1} style={{width: "40%", borderRadius: "30px"}} />
            <CardGroup className="m-5"  >
              <Card bg="dark" text="light">
                <CardHeader>
                  <PieChart chartData={rating} />
                </CardHeader>
                <Card.Body>
                  <Card.Title>User Ratings of the Game</Card.Title>
                </Card.Body>
              </Card>
              <Card bg="dark" text="light">
                <CardHeader>
                  <BarChart chartData={gamesCount} />
                </CardHeader>
                <Card.Body>
                  <Card.Title>Games avaliable on the Store</Card.Title>
                </Card.Body>
              </Card>
              <Card bg="dark" text="light">
                <CardHeader>
                <PolarAreaChart chartData={addStatus} />
                </CardHeader>
                <Card.Body>
                  <Card.Title>Player Game Status</Card.Title>
                </Card.Body>
              </Card>
            </CardGroup>
        </div>
    )
}

export default Compare;