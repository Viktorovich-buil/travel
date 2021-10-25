import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from "@material-ui/core";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

import mapStyles from "./mapStyles";

const Map = ({setCoordinates,
                 setBounds,
                 coords,
                 places,
                 setChildClicked,
                 weatherData}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width: 600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coords}
                center={coords}
                defaultZoom={10}
                margin={[50, 50, 50, 50]}
                options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                onChange={(e) => {
                    setCoordinates({lat: e.center.lat, lng: e.center.lng})
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                    <div className={classes.markerContainer}
                         lat={Number(place.latitude)}
                         lng={Number(place.longitude)}
                         key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon
                                    color='secondary'
                                    fontSize='large'/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                    className={classes.pointer}
                                    src={place.photo ? place.photo.images.large.url : 'https://st3.depositphotos.com/2171343/i/600/depositphotos_136640556-stock-photo-abstract-blur-background-of-restaurants.jpg'}
                                    alt={place.name}/>
                                    <Rating
                                    size='small'
                                    value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>
                ))}
                {weatherData?.list?.map((data, i) => (
                    <div key={i} lat={data.coords.lat} lng={data.coords.lon}>
                        <img height='60px' src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt={'symbol'}/>
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map;



