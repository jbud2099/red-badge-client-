import React, {Component} from 'react';
import Register from "./Register"
import Login from "./Login"

interface IProps{
    //sessionToken: string
    //setToken: (newToken: string) => void,
    //updateToken: (token: string) => void,
    updateToken: Function
}
interface IState{
    isLoggingIn: boolean
}

export default class Auth extends Component<IProps, IState>{
    constructor(props: IProps){
        super(props)
        this.state = {
            isLoggingIn: false
        }
    }

    handleClick = () => {
        this.setState({isLoggingIn: !this.state.isLoggingIn})
    }

    render(){
        return(
            <div>
                {
                    this.state.isLoggingIn ? <Login updateToken={this.props.updateToken}/> : <Register />
                }
                <button onClick={() => this.handleClick()} />
            </div>
        )
    }
} 