import { Col, Row } from "react-bootstrap";
import UserContext from "../../Contexts/UserContext";
import React from "react";
import ReviewIndex from "./ReviewIndex";

export interface IProps {
  review: any;
}

interface IFetch {
  createdAt: string;
  genre: string;
  id: number;
  played: boolean;
  rating: number;
  review: string;
}

export interface IState {
  user: string | null;
  extendedReview: boolean;
  fetchReviews: any[];
  deleteReviews: any;
  newReviews: IFetch[];
}

export default class ReviewDisplay extends React.Component<IProps, IState> {
  static contentType = UserContext;
  constructor(props: IProps) {
    super(props);
    this.state = {
      user: "",
      extendedReview: false,
      fetchReviews: [],
      deleteReviews: [],
      newReviews: [],
    };
  }

  setUser = (user: string | null) => {
    this.setState({
      user: user,
    });
  };

  deleteReview(e: React.BaseSyntheticEvent) {
    e.preventDefault();

    fetch(process.env.REACT_APP_SERVER_API_URL+`/review/`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${ReviewDisplay.contentType}`,
      }),
      body: JSON.stringify({ id: this.props.review.id }),
    })
      .then(() => this.state.deleteReviews())
      .catch((err) => console.log(err));
  }
  // handleChange(e: React.BaseSyntheticEvent) {
  //     this.setState((prevstate) => ({
  //       ...prevstate,
  //       [e.target.name]: e.target.value as Pick<IState, keyof IState>,
  //     }));
  //   }

  // componentDidUpdate(){
  //     if (this.props.review.userId) {
  //         this.setUser(this.props.review.userId);
  //         return;
  //       }

  //       if (this.context.isAuth && this.context.user.id === this.props.review.userId) {
  //         this.setUser(this.context.user);
  //       } else {
  //         fetch(`http://localhost:3000/user/${this.props.review.userId}`)
  //           .then((res) => res.json())
  //           .then((res) => {
  //             console.log(res);
  //             this.setUser(res);
  //           });
  //       }
  // }

  setNewReviews = (newReviews: IFetch[]) => {
    this.setState({
      newReviews: newReviews,
    });
  };

  //I'm looking for a get all reviews

  //       getReview(){
  //         console.log(this.state.newReviews)

  //           fetch(`http://localhost:3000/review/${}`, {
  //               method: "GET",
  //               headers: new Headers({
  //                   "Content-Type": "application/json",
  //                 }),
  //             })
  //             .then((res) => res.json())
  //             .then((res) => console.log(res))
  //         .catch((err) => console.log(err.message));
  // }

  testFunction = () => {
    fetch(process.env.REACT_APP_SERVER_API_URL+`/review/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // this.setState({
        //     newReviews: data

        // })
        this.setNewReviews(data);
        //console.log("Fetching test")
        console.log(this.state.newReviews);
        // this.setUser(res);
      })
      .catch((err) => console.log(err));
  };

//   componentDidMount() {
//     this.testFunction();
   
// //   }
//   timeoutFunction = () => {
//     setTimeout(() => {
//       console.log(this.state.newReviews[0].id)
//       }, 3000);
//   }

  render() {
    return (
      <div>
        {/* {this.testFunction()} */}
        <Col xs={10} style={{ color: "white" }}>
          <div className="p-3 mt-3" style={{ border: "1px solid", color: "yellow" }}>
            <p>Test Reviews:</p>
         
            {/* {console.log(this.state.newReviews[0].id)} */}
  
            {/* {this.state.newReviews.map((review) => {
              return ( 
              <ReviewIndex />
              review={review.review}
              genre={review.genre}
              rating={review.rating}
              )
            {review.review}
        })} */}
        {/* {console.log(review.review)} */}
            <div className="d-flex justify-content-between">
              <div>
                <p>Rating Test:</p>
              </div>
            </div>
          </div>
        </Col>
     
      </div>
    );
  }
}
