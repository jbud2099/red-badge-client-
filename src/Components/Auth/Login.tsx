import React from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserContext, { UserContextProvider } from "../../Contexts/UserContext";
import "./Login.css";
import {RouteComponentProps} from 'react-router-dom';

export interface IProps{
 // setToken: (newToken: string) => void,
    //updateToken: (token: string) => void
    updateToken: Function
}
export interface IState {
    username: string,
    password: string,
     error: string,
    token: string
}

export default class Login extends React.Component <IProps, IState>{
  static contentType = UserContextProvider;
    constructor(props: any){
        super(props)
        this.state = {
            username: "",
            password: "",
            error: "",
            token: ""
        };
    }

    // componentDidMount() {
    //   if (localStorage.getItem('token')) {
    //   this.setState({
    //     token: localStorage.getItem("token") || ''

    //   });
    // }
    // }

    postLogin(e: React.BaseSyntheticEvent) {
      e.preventDefault();

      console.log("logged in!")

      let fetchBody = {
        username: this.state.username,
        password: this.state.password,
      };
  
      fetch("http://localhost:3000/user/login", {
        method: "POST",
        body: JSON.stringify(fetchBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          // if (res.status != 200) {
          //    this.setError("Invalid username or password.");
          //    console.log("error")
          // }
          return res.json();
        })
        .then((data) => {
           //if (!res.error) {
             this.props.updateToken(data.token);
           //}
          //this.context.setToken(res.token)
          console.log(data.token)
          localStorage.setItem('token', data.token)
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    };

    handleChange(e: React.BaseSyntheticEvent) {
      this.setState((prevstate) => ({
        ...prevstate,
        [e.target.name]: e.target.value as Pick<IState, keyof IState>,
      }));
    }


    setError = (error: string) => {
        this.setState({
          error: error,
        });
      };

    setUsername = (username: string) => {
        this.setState({
          username: username,
        })
      }

      setPassword = (password: string) => {
        this.setState({
          password: password,
        })
      }

      // setToken = (token: string) => {
      //   // React.useContext(UserContext)
      //   console.log(token)
      // }

      setToken = (newToken: string) => {
        this.setState({
          token: newToken,
        });
      };

    render() {
        return(
            <div>
               <Container className="mb-5">
        <Row className="justify-content-center pt-5">
          <Col xs={6}>
            <Card>
              <Card.Body>
                <h1 className="text-center">Login</h1>
                <hr />
                <div className="text-center pb-2" style={{ color: "yellow" }}>
                  {this.state.error}
                </div>
                <Form onSubmit={(e) => this.postLogin(e)}>
                  <Form.Group as={Row} controlId="formGroupUsername">
                    <Form.Label column sm="auto">
                      Username
                    </Form.Label>
                    <Col>
                      <Form.Control
                        onChange={(e) => this.handleChange(e)}
                        name="username"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formGroupPassword">
                    <Form.Label column sm="auto">
                      Password
                    </Form.Label>
                    <Col>
                      <Form.Control
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Row className="justify-content-center">
                    <LinkContainer to="/register">
                      <div className="registerBtnOut">
                        <Button
                          className="registerBtnMid"
                          variant="outline-secondary"
                        >
                          Register<span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </Button>
                      </div>
                    </LinkContainer>
                    <div className="submitBtnOut">
                      <Button
                        className="submitBtnMid"
                        variant="outline-warning"
                        type="submit"
                      >
                        Sign In
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </Button>
                    </div>
                  </Form.Row>
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