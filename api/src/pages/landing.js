import React from "react";
import { Card } from "react-bootstrap";
import { CardGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
// import rawg from './images/orig.jpeg';

function Landing (){
    return(
        <div style={{display: 'flex', justifyContent: 'center'}} className="mt-5">
            <CardGroup style={{width:"80%"}}  >
                <Card bg={"dark"} text={"light"} >
                    <Card.Img variant="top" src="https://pipedream.com/s.v0/app_1gKhAk/logo/orig" />
                    <Card.Body>
                        <Card.Title>RAWG API</Card.Title>
                        <Card.Text>
                        The RAWG Video Games Database API is a RESTful API that provides video game information such as release dates, game ratings, screenshots, trailers, and more. It covers a wide range of platforms including PC, consoles, and mobile devices, and contains data on more than 500,000 games. Developers can use this API to build applications and websites that require video game data.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" href="https://rawg.io/apidocs">RAWG API</Button>
                    </Card.Footer>
                </Card>
                <Card bg={"dark"} text={"light"}>
                    <Card.Img variant="top" src="https://pbs.twimg.com/profile_images/763061332702736385/KoK6gHzp_400x400.jpg" />
                    <Card.Body>
                        <Card.Title>ReactJS</Card.Title>
                        <Card.Text>
                        Build encapsulated components that manage their own state, then compose them to make complex UIs.
                        Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" href="https://react.dev/">React</Button>{''}
                    </Card.Footer>
                </Card>
                <Card bg={"dark"} text={"light"}>
                    <Card.Img variant="top" src="https://pbs.twimg.com/media/CIRgqwWVAAAZ5Vf.png" />
                    <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                        React-Bootstrap replaces the Bootstrap JavaScript. Each component has been built from scratch as a true React component, without unneeded dependencies like jQuery.
                        As one of the oldest React libraries, React-Bootstrap has evolved and grown alongside React, making it an excellent choice as your UI foundation.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" href="https://react-bootstrap.github.io/">React Bootstrap</Button>
                    </Card.Footer>
                </Card>
            </CardGroup>
        </div>

        
    )
}
export default Landing;
