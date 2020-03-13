import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormFeedback,
    FormText
} from 'reactstrap';
const latBoundaries = [1.18, 1.46];
const lngBoundaries = [103, 104];
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        // if there is error string, set valid to false
        (val) => val.length > 0 && (valid = false)
    );  
    return valid;
}

class Scooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scooters: [],
            lat: 103.8159,
            lng: 1.3138,
            limit:10,
            maxDistance: 200,
            errors: {
                lat: '',
                lng: '',
                limit: '',
                maxDistance: ''
            }
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
        if (validateForm(this.state.errors)) {
            // query api
            fetch(
            '/api/scooters?lng=' + lng 
            + '&lat=' + lat
            + '&limit=' + limit
            + '&maxDistance=' + maxDistance
            ).then(function(data){ // get information as json
                return data.json();
            }).then(json => { // set state of component to json data
                this.setState({
                    scooters:json
                });
                this.props.searchDataFunctionCall(this.state);
            }); 
        }
    }

    handleChange(event) {
        // might affect some functionalities
        event.preventDefault();
        // form validation
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name){
            case 'lng':
                if (isNaN(value) || value > lngBoundaries[1] || value < lngBoundaries[0]) {
                    errors.lng = 'Longitude must be a number between ' 
                    + lngBoundaries[0].toString() 
                    + ' and '
                    + lngBoundaries[1].toString();
                } else {
                    errors.lng = '';
                }
                break;
            case 'lat':
                if (isNaN(value) || value > latBoundaries[1] || value < latBoundaries[0]) {
                    errors.lat = 'Latitude must be a number between ' 
                    + latBoundaries[0].toString() 
                    + ' and '
                    + latBoundaries[1].toString();
                } else {
                    errors.lat = '';
                }
                break;
            case 'limit':
                if (isNaN(value) || value <= 0) {
                    errors.limit = 'Limit must be a positive integer.';
                } else {
                    errors.limit = '';
                }
                break;
            case 'maxDistance':
                if (isNaN(value) || value <= 0) {
                    errors.maxDistance = 'Range must be a positive number.'
                } else {
                    errors.maxDistance = '';
                }
                break;
            default:
                break;
        }
        
        // let nam = event.target.name;
        // let val = event.target.value;

        this.setState({
            errors,
            [name]: value
        });
    }

    render() {
        const errors = this.state.errors;
        return(
            <div id="scooter-container">
                <Form onSubmit={this.handleSubmit} noValidate>
                    <FormGroup>
                        <Label for="longitude">Longitude</Label>
                        <Input invalid={errors.lng} type="text" name="lng" id="lng" onChange={this.handleChange} required/>
                        {errors.lng && <FormFeedback>{errors.lng}</FormFeedback> }
                    </FormGroup>
                    <FormGroup>
                        <Label for="latitude">Latitude</Label>
                        <Input invalid={errors.lat} type="text" name="lat" id="lat" onChange={this.handleChange} required/>
                        {errors.lat && <FormFeedback>{errors.lat}</FormFeedback> }
                    </FormGroup>
                    <FormGroup>
                        <Label for="range">Range (m)</Label>
                        <Input invalid={errors.maxDistance} type="text" name="maxDistance" id="maxDistance" onChange={this.handleChange} required/>
                        {errors.maxDistance && <FormFeedback>{errors.maxDistance}</FormFeedback> }
                    </FormGroup>
                    <FormGroup>
                        <Label for="limit">Search Limit</Label>
                        <Input invalid={errors.limit} type="number" name="limit" id="limit" onChange={this.handleChange} required/>
                        {errors.limit && <FormFeedback>{errors.limit}</FormFeedback> }
                    </FormGroup>
                    <Button color="dark" block>Start Looking</Button> 
                </Form>
                
            </div>

        );
    }
}

export default Scooter;