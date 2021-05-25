import React from 'react';
import {Button, Form, Card, Row, Container, Col} from "react-bootstrap";
import UserContext from '../../Contexts/UserContext';

export interface IProps{
  updateToken: Function
}
export interface IState{
    review: string;
    rating: number;
    genre: string;
    played: boolean;
}

export default class ReviewCreate extends React.Component<IProps, IState>{
    static contentType = UserContext
    constructor(props: IProps) {
        super(props);
        this.state = {
            review: "",
            rating: 3,
            genre: "",
            played: true,
        }
    }

    setReview = (review: string) => {
      this.setState({
        review: review,
      })
    }

    setRating = (rating: number) => {
      this.setState({
        rating: rating,
      })
    }

    setGenre = (genre: string) => {
      this.setState({
        genre: genre,
      })
    }

    setPlayed = (played: boolean) => {
      this.setState({
        played: played,
      })
    }

    handleChange(e: React.BaseSyntheticEvent) {
      this.setState((prevstate) => ({
        ...prevstate,
        [e.target.name]: e.target.value as Pick<IState, keyof IState>,
      }));
    }

     postReview(e: React.BaseSyntheticEvent) {
       e.preventDefault();

        console.log("Check the Review database!")

             fetch(`http://localhost:3000/review/post`, {
              method: "POST",
              body: JSON.stringify({
                review: this.state.review,
                rating: this.state.rating,
                genre: this.state.genre,
                played: this.state.played,
                //userId: this.context.user,
              }),
              headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
              }),
            })
              .then((res) => res.json())
              .then((reviewData) => {
                this.setState({
                  review: "",
                  rating: 3,
                  genre: "",
                  played: true,
                })
            //     props.fetchReviews();
            //     props.handleClose();
                console.log(reviewData)

             })
              .catch((err) => console.log(err.message));
            }
    

    render(){
      return(
        <div>
           <Container className="mb-5">
        <Row className="justify-content-center pt-5">
          <Col xs={6}>
            <Card>
              <Card.Body>
                <h1 className="text-center">Post</h1>
                <hr />
        <Form onSubmit={(e) => this.postReview(e)} className="p-2">
        <Form.Group>
          <Form.Label>Please leave a review:</Form.Label>
          <Form.Control
            as="textarea"
            onChange={(e) => {
              this.handleChange(e);
            }}
            name="review"
            rows={2}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Rate the Game!</Form.Label>
        <Form.Control as="select" onChange={(e) => {this.handleChange(e)}} name="rating">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Genre:</Form.Label>
          <Form.Control
            as="textarea"
            onChange={(e) => {
              this.handleChange(e);
            }}
            name="genre"
            rows={1}
          />
        </Form.Group>
        
        <Form.Label>Played?</Form.Label>
        <Form.Control
        as="select"
        className="mr-sm-2"
        id="inlineFormCustomSelect"
        custom
        onChange={(e) => {
          this.handleChange(e);
        }}
        name="played"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Form.Control>

        <div className="d-flex justify-content-center">
          <Button type="submit" variant="warning">
            Click to Submit Your Review!
          </Button>
        </div>
        </Form>
        </Card.Body>
        </Card>
        </Col>
        </Row>
        </Container>
        </div>
      )
    }
}