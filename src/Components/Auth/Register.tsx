import React from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { UserContextProvider }  from "../../Contexts/UserContext";
import "./Register.css";
import {RouteComponentProps} from "react-router-dom"; 

export interface IProps extends RouteComponentProps{}
export interface IState {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    verifyEmail: string,
    password: string,
    verifyPassword: string,
    errors: any,
    validated: boolean
}

export default class Register extends React.Component <{},IState>{
    constructor(props: {}) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            verifyEmail: "",
            password: "",
            verifyPassword: "",
            errors: [],
            validated: false
        }
    }
    setErrors = (errors: string) => {
      this.setState({
        errors: errors,
      });
    };

    setValidated = (validated: boolean) => {
        this.setState({
            validated: validated,
        })
    }

    setFirstName = (firstName: string) => {
      this.setState({
        firstName: firstName,
      })
    }

    setLastName = (lastName: string) => {
      this.setState({
        lastName: lastName,
      })
    }

    setUsername = (username: string) => {
      this.setState({
        username: username,
      })
    }

    setEmail = (email: string) => {
      this.setState({
        email: email,
      })
    }

    setVerifyEmail = (verifyEmail: string) => {
      this.setState({
        verifyEmail: verifyEmail,
      })
    }

    setPassword = (password: string) => {
      this.setState({
        password: password,
      })
    }

    setVerifyPassword = (verifyPassword: string) => {
      this.setState({
        verifyPassword: verifyPassword,
      })
    }

    runValidation = () => {
        let errs = [];
    
        //handle validation
        if (this.state.firstName.length < 1) {
          errs.push("firstName");
        }
        if (this.state.lastName.length < 1) {
          errs.push("lastName");
        }
        if (this.state.username.length < 4 || !this.state.username.match(/[!@#$_0-9]/g)) {
          errs.push("username");
        }
        if (
          !this.state.email.match(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
          )
        ) {
          errs.push("emailWrong");
        }
        if (this.state.email != this.state.verifyEmail) {
          errs.push("emailVerify");
        }
        if (this.state.password.length < 5) {
          errs.push("passwordWrong");
        }
        if (this.state.password != this.state.verifyPassword) {
          errs.push("passwordVerify");
        }
    
        this.setErrors("errs");
    
        return errs;
      };

      postRegister(e: React.BaseSyntheticEvent) {
        e.preventDefault();

        console.log("it works")

        let fetchBody = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
        };

        

        
          fetch(process.env.REACT_APP_SERVER_API_URL+`/user/register`, {
            method: "POST",
            body: JSON.stringify(fetchBody),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (res.status != 201) {
                this.setErrors("Something is very wrong.");
                console.log("error");
              }
              return res.json();
            })
            .then((res) => console.log(res))
            .catch((err) => {
              console.log(err);
            });
        } 
      
    

      handleChange(e: React.BaseSyntheticEvent) {
        this.setState((prevstate) => ({
          ...prevstate,
          [e.target.name]: e.target.value as Pick<IState, keyof IState>,
        }));
      }

    render() {
        return(
            <div>
            <Container>
              <Row className="justify-content-center pt-5">
                <Col xs={7}>
                  <Card>
                    <Card.Body>
                      <h1 className="text-center">Register</h1>
                      <hr />
                      <Form onSubmit={(e) => this.postRegister(e)}>
                        <Form.Row>
                          <Col>
                            <Form.Group controlId="formGroupFirstName">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                             onChange={(e) => this.handleChange(e)}
                             name="firstName"
                              />
                              {this.state.errors.includes("firstName") && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  *Required
                                </Form.Control.Feedback>
                              )}
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group controlId="formGroupLastName">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                onChange={(e) => this.handleChange(e)}
                                name="lastName"
                              />
                              {this.state.errors.includes("lastName") && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  *Required
                                </Form.Control.Feedback>
                              )}
                            </Form.Group>
                          </Col>
                        </Form.Row>
                        <Form.Row>
                          <Col>
                            <Form.Group controlId="formGroupUsername">
                              <Form.Label>Username</Form.Label>
                              <Form.Control
                                onChange={(e) => this.handleChange(e)}
                                name="username"
                              />
                              {this.state.errors.includes("username") && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  *Required (Must be longer than 3 characters and
                                  include one special character or number)
                                </Form.Control.Feedback>
                              )}
                            </Form.Group>
                          </Col>
                        </Form.Row>
                        <Form.Row>
                          <Col>
                            <Form.Group controlId="formGroupEmail">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                onChange={(e) => this.handleChange(e)}
                                name="email"
                              />
                              {this.state.errors.includes("emailWrong") && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  Invalid Email
                                </Form.Control.Feedback>
                              )}
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group controlId="formGroupVerifyEmail">
                              <Form.Label>Verify Email</Form.Label>
                              <Form.Control
                                onChange={(e) => this.setVerifyEmail(e.target.value)}
                                name="verifyEmail"
                              />
                              {this.state.errors.includes("emailVerify") && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  Emails do not match
                                </Form.Control.Feedback>
                              )}
                            </Form.Group>
                          </Col>
                        </Form.Row>
                        <Form.Row>
                          <Col>
                            <Form.Group controlId="formGroupPassword">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                onChange={(e) => this.handleChange(e)}
                                name="password"
                              />
                              {this.state.errors.includes("passwordWrong") && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  Password must be 5 or more chars long
                                </Form.Control.Feedback>
                              )}
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group controlId="formGroupVerifyPassword">
                              <Form.Label>Verify Password</Form.Label>
                              <Form.Control
                                onChange={(e) => this.handleChange(e)}
                                name="password"
                              />
                              {this.state.errors.includes("passwordVerify") && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  Passwords do not match
                                </Form.Control.Feedback>
                              )}
                            </Form.Group>
                          </Col>
                        </Form.Row>
                        <Form.Row>
                          <Col className="outer">
                            <Button
                              className="middle"
                              variant="outline-dark"
                              type="submit"
                            >
                              Register
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                            </Button>
                          </Col>
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