import { Row, Col } from "react-bootstrap";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import IResults from "./Home";

export interface IProps {
  gameResult: any[];
}
export interface IGame {
  results: any //IResults[];
}
export interface IState {
  dataReturned: boolean;
}
export default class GameDisplay extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      dataReturned: false,
    };
  }
  stateSetter = () => {
    setTimeout(() => {
      this.setState({ dataReturned: true });
    }, 1500);
  };
  componentDidMount() {
    //this.stateSetter();
    //console.log(this.props.gameResult) 
    this.props.gameResult !== undefined ? console.log(this.props.gameResult) : console.log("no gameResults")
   // console.log(this.props.gameResult[0].name)
  }

  render() {
    return (
      <div>
        <Row className="pt-3 viewRow">
          {/* {this.props.gameResult !== undefined
            ? this.props.gameResult.map((game: any) => {
                console.log(game);
                return <Col xs={3}></Col>;
              })
            : ""} */}
            {/* <p>{this.props.gameResult[0].name}</p> */}
        </Row>
      </div>
    );
  }
}
