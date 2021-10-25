import React, {useState, useEffect, createRef} from 'react';
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from "@material-ui/core";

import useStyles from './styles';
import PlaceDetails from "../PlaceDetails/PlaceDetail";

const List = ({places, childClicked, isLoading, type, setType, rating, setRating}) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([])

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef())
        setElRefs(refs)
    }, [places])

    // const places =[
    //     {name: 'Хорошее место'},
    //     {name: 'Лучший бургер'},
    //     {name: 'Отличная IPA'},
    //     {name: 'Вкусная паста'},
    //     {name: 'Средняя пицца'},
    //     {name: 'Много пива'},
    //     {name: 'Недорогое кафе'},
    //     {name: 'Отличный PUB'},
    //     {name: 'Хорошие морепродукты'},
    //         ]

    return (
        <div className={classes.container}>
            <Typography variant='h4'>Рестораны, Отели и Достопримечательности</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size='5rem'/>
                </div>
            ) : (
                <>
            <FormControl className={classes.formControl}>
                <InputLabel>Выбор</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value='restaurants'>Рестораны и кафе</MenuItem>
                    <MenuItem value='hotels'>Отели</MenuItem>
                    <MenuItem value='attractions'>Достопримечательности</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Оценки</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}>Все</MenuItem>
                    <MenuItem value={3}>Выше 3</MenuItem>
                    <MenuItem value={4}>Выше 4</MenuItem>
                    <MenuItem value={4.5}>Выше 4.5</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i) => (
                    <Grid ref={elRefs[i]} item key={i} xs={12}>
                        <PlaceDetails
                            place={place}
                            selected={Number(childClicked) === i}
                            refProp={elRefs[i]}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )}
</div>
);
}

export default List;
