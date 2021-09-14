import React, {useEffect} from 'react';
import './App.css';
import {Container, makeStyles} from "@material-ui/core";
import {City} from "./components/City";
import {Weather} from "./components/Weather";
import {WeatherDetails} from "./components/WeatherDetails";
import {getWeather} from "./redux/weather-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCity,
    getDeg,
    getDescription,
    getHumidity,
    getPressure,
    getSpeed,
    getTemp,
    getVariant
} from "./selectors/weatherSelector";

const useStyles = makeStyles((theme) => ({
    main: {
        padding: '75px 75px 122px 101px',
        [theme.breakpoints.down('sm')]: {
            padding: '20px 20px 20px 20px'
        },
        [theme.breakpoints.down(410)]: {
            padding: '2px 2px 2px 2px'
        }
    },
    container: {
        [theme.breakpoints.down('sm')]: {
            padding: '10px 10px 10px 10px'
        },
        [theme.breakpoints.down(410)]: {
            padding: '2px 2px 2px 2px'
        }
    }
}))

function App() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const variantWeather = useSelector(getVariant)
    const description = useSelector(getDescription)
    const temp = useSelector(getTemp)
    const humidity = useSelector(getHumidity)
    const pressure = useSelector(getPressure)
    const speed = useSelector(getSpeed)
    const deg = useSelector(getDeg)
    const city = useSelector(getCity)
    useEffect(() => {
        dispatch(getWeather('Курган', 'metric'))
    }, [])
    return (
        <Container>
            <div className={classes.main}>
                <City city={city} />
                <Weather temp={temp} description={description} />
                <WeatherDetails speed={speed} deg={deg} pressure={pressure} humidity={humidity} />
            </div>

        </Container>
    );
}

export default App;
