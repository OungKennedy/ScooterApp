import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
class Scooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scooters: [],
            lat: 0,
            lng:0,
            limit:1,
            maxDistance: 100
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit = (e) => {
        e.preventDefault();
        var lng = this.state.lng;
        var lat = this.state.lat;
        var maxDistance = this.state.maxDistance;
        var limit = this.state.limit;
        // query api
        fetch(
        '/api/scooters?lng=' + lng 
        + '&lat=' + lat
        + '&limit=' + limit
        + '&maxDistance=' + maxDistance
        ).then(function(data){ // get information as json
            console.log(data.json());
            return data.json();
        }).then(json => { // set state of component to json data
            this.setState({
                scooters:json
            });
        }); 
    }

    handleChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render() {
        var scooters = this.state.scooters;
        scooters = scooters.map(function(scooters, index){
            return(
                <li key={index}>
                    <span className="longitude">{scooters.obj.geometry.lat}</span>
                    <span className="latitude">{scooters.obj.geometry.lng}</span>
                    <span className="distance">{Math.floor(scooters.dis/1000)} km</span>    
                </li>
            )
        });
        return(
            <div id="scooter-container">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="latitude">Latitude</Label>
                        <Input type="text" name="lat" id="lat" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="longitude">Longitude</Label>
                        <Input type="text" name="lng" id="lng" value={this.state.lng} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="range">Range</Label>
                        <Input type="text" name="maxDistance" id="maxDistance" value={this.state.maxDistance} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="limit">Search Limit</Label>
                        <Input type="number" name="limit" id="limit" value={this.state.limit} onChange={this.handleChange}/>
                    </FormGroup>
                    <Button color="dark" style={{marginTop:"2rem"}}block>Start Looking</Button> 
                </Form>
            </div>
        );
    }
}

export default Scooter;