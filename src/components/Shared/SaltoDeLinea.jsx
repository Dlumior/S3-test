import React, { Component } from 'react';

class SaltoDeLinea extends Component {
    constructor(){
        super();
        this.state={
            saltos:[]
        }
    }
    componentDidMount(){
        const arraySaltos = [];
        
        if(!this.props || this.props.N<=0){
            arraySaltos.push(<br/>);
            this.setState({saltos:arraySaltos});
            return;
        }
        for(let i=0; i<this.props.N;i++){
            arraySaltos.push(<br/>);
        }
        this.setState({saltos:arraySaltos});
    }
    render() {
        return (
            <div>
                {this.state.saltos}
            </div>
        );
    }
}

export default SaltoDeLinea;