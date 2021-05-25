import React from 'react';
import UserContext from "../../Contexts/UserContext";
import {RouteComponentProps} from "react-router-dom";

export interface IProps extends RouteComponentProps{}
export interface IState {
    value: number,
    game: null,
    reviews: any,
    showCreateModal: boolean,
    showEditModal: boolean,
    played: boolean
}

export default class Game extends React.Component<IProps, IState>{
    static contextType = UserContext

    render() {
        return(
            <>
            
            </>
        )
    }
}