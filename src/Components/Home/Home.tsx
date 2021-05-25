import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Home.css";
import GameDisplay from "./HomeGameDisplay";
import ReviewDisplay from "../Review/ReviewDisplay";

export interface IGenre {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
}
export interface IResults {
  background_image: string;
  name: string;
  genre: IGenre;
}
export interface IProps {
  review: any
}
export interface IState {
  gameResult: any;
  searchInput: string;
}

export default class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      gameResult: [],
      searchInput: "",
    };
  }

  componentDidMount() {
    fetch(
      "https://api.rawg.io/api/games?key=01f87fa0d7d048538f0a36afe283fb7a",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
      this.setState({ gameResult: data.results })
    console.log(this.state.gameResult)});
  }

  componentDidUpdate() {
    console.log(this.state.gameResult);
  }

  render() {
    return (
      <div>
        <Container
          className="pt-5"
          //  onMouseOver={mousePosition()}
        >
          <Row noGutters>
            {/* Main Content */}
            <Col xs={12} className="gameDisplay">
              {/* Search */}
              <Row>
                <Col>
                  <Form.Control
                    className="movie-search btn-secondary"
                    id="search"
                    type="button"
                    //   value={searchInput}
                    //   onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search..."
                  />
                </Col>
              </Row>
              {/* Game Display */}
              {/* <GameDisplay gameResult={this.state.gameResult} /> */}
              <ReviewDisplay review={this.props.review}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
