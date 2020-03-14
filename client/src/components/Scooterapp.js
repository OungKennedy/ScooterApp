import React, { Component } from 'react';
import Scooter from './Scooter';
import Scootermap from './Scootermap';

class Scooterapp extends Component {
    constructor(props){
        super(props);
        this.state={
            searchDetails:[]
        }
    }

    getSearchData=(dataFromScooter) => {
        this.setState({searchDetails:dataFromScooter});
    }

    render() {
        return(
            <div id = "homepage">
                <div>
                    <Scootermap searchDetails={this.state.searchDetails}/>
                </div>
                <h1>Find a scooter in your area</h1>
                <Scooter searchDataFunctionCall={this.getSearchData.bind(this)}/>
            </div>
        )
    }
}

export default Scooterapp;