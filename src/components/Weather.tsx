import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import sun from '../assects/sun.png'
import cloud from '../assects/cloud.png'
import partlyCloudy from '../assects/partly cloudy.png'
import rain from '../assects/rain.png'
import storm from '../assects/strom.png'

const useStyles = makeStyles((theme) => ({
    main: {
        marginBottom: '218px',
        [theme.breakpoints.down(798)]: {
            marginBottom: '180px',
        },
        [theme.breakpoints.down(404)]: {
            marginBottom: '120px',
        }
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    weather: {
        fontSize: '180px',
        color: 'white',
        [theme.breakpoints.down(798)]: {
            fontSize: '120px',
        }
    },
    image: {
        height: '200px',
        [theme.breakpoints.down(798)]: {
            height: '150px',
        }
    },
    weatherDecsr: {
        fontSize: '28px',
        color: 'white',
        [theme.breakpoints.down(798)]: {
            fontSize: '20px',
        }
    }
}))

type PropsType = {
    description: string | undefined
    temp: number | undefined
}

export const Weather: React.FC<PropsType> = ({description, temp}) => {
    const classes = useStyles()
    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                {
                    description === 'облачно с прояснениями' ?
                        <img className={classes.image} src={partlyCloudy}/> :
                        description === 'дождь' ?
                            <img className={classes.image} src={rain}/> :
                            description === 'ясно' ?
                                <img className={classes.image} src={sun}/> :
                                description === 'шторм' ?
                                    <img className={classes.image} src={storm}/> :
                                    <img className={classes.image} src={cloud}/>
                }

                <Typography className={classes.weather}>{temp}&deg;</Typography>
            </div>
            <Typography className={classes.weatherDecsr} align={'center'}>{description}</Typography>
        </div>
    )
}