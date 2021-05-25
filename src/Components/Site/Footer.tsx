import React from 'react';
import {Card} from 'react-bootstrap';

interface IProps{}
interface IState{

}

export class Footer extends React.Component<IProps, IState>{
  constructor(props: IProps){
    super(props);

  }
    render(){
    return (
        <Card className="mt-5" bg="dark">
          <Card.Body className="text-center text-light">
            Copyright © 2021 - PowerCoin.
          </Card.Body>
        </Card>
      );
    }
}

export default Footer;