import React from 'react';
import { UserContextProvider } from "./Contexts/UserContext"
import Nav from "./Components/Site/Nav";
import Footer from "./Components/Site/Footer";
import './App.css';
import {
  Route,
  Switch,
  Link,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';
import ReviewCreate from './Components/Review/ReviewCreate';
import ReviewEdit from './Components/Review/ReviewEdit';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';



interface IState {
  token: string
}

class App extends React.Component<{}, IState > {
  constructor(props: any){
    super(props)
    this.state = {
     token: '',
     
    }
  }
  
    updateToken = (token: string) => {
      let tokenInStorage = localStorage.getItem('token')
      if(tokenInStorage){
        this.setState({token: token})
        localStorage.setItem("token", token)
      }
    }
  render(){
  return (
    <div className="App grey">
      <Router>
      <UserContextProvider>
        <Nav />
        <Switch>
        {/* <Route path="/login" updateToken={this.updateToken} component={Login}/> */}
        <Route path="/auth"><Auth updateToken={this.updateToken}  /></Route>
        {/* <Route path="/register" component={Register}/> */}
        <Route path="/review" component={ReviewCreate}/>
        <Route path="/reviewedit" component={ReviewEdit}/>
        <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </UserContextProvider>
      </Router>
    </div>
  );
}
}

export default App;

/*In App.tsx create a function named updateToken that accepts a parameter of token solved*/