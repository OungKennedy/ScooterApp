import React, { Component } from 'react';
import {Map, Marker, Popup, TileLayer, Circle} from 'react-leaflet';

const DEFAULT_LAT = 103.8159;
const DEFAULT_LNG = 1.3138;

class Scootermap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeScooterPosition: null,
            activeScooterDistance: null,
            defaultMapCenterLng: DEFAULT_LNG,
            defaultMapCenterLat: DEFAULT_LAT
        }
    }

    render(){
        // get coordinates from parent
        var centerlng = parseFloat(this.props.searchDetails.lat) || this.state.defaultMapCenterLng;
        var centerlat =  parseFloat(this.props.searchDetails.lng) || this.state.defaultMapCenterLat;
        var centerCoords = [centerlng, centerlat];
        
        // circle to highlight search radius
        let radius;
        if (this.props.searchDetails.maxDistance) {
            radius = <Circle center={centerCoords} radius={parseInt(this.props.searchDetails.maxDistance)}/>;
        }

        return(
            <div>
                <Map center={[centerlng, centerlat]} zoom={17}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* set radius */}
                    {radius}

                    {/* set markers */}
                    {this.props.searchDetails.scooters && this.props.searchDetails.scooters.map(scooter => (
                        <Marker 
                            key={scooter._id} 
                            position={[
                                scooter.geometry.coordinates[1],
                                scooter.geometry.coordinates[0]
                            ]}
                            onClick={(e) => {
                                this.setState({
                                    activeScooterPosition: e.latlng,
                                    activeScooterDistance: parseFloat(scooter.dis).toFixed(2)
                                });
                            }}
                        /> 
                    ))}
                        
                    {/* onclick popup for markers */}
                    {this.state.activeScooterPosition && (
                        <Popup
                            position={this.state.activeScooterPosition}
                            onClose={()=>
                            this.setState({
                                activeScooterPosition: null,
                                activeScooterDistance: null
                            })}
                        >
                            <li>
                                <span>Longitude:{this.state.activeScooterPosition.lng}</span>
                                <span>Latitude:{this.state.activeScooterPosition.lat}</span>
                                <span>Distance:{this.state.activeScooterDistance} m</span>
                            </li>
                        </Popup>
                    )}
                </Map>  
            </div>
        )
    }
}

export default Scootermap;