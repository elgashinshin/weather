import React, {useEffect, useState} from 'react';
import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            flexWrap: 'wrap',
        },
    },
    title: {
        fontSize: '18px',
        marginBottom: '10px',
        color: 'white',
        opacity: 0.6,
        [theme.breakpoints.down(798)]: {
            fontSize: '15px',
        }
    },
    description: {
        fontSize: '25px',
        color: 'white',
        [theme.breakpoints.down(798)]: {
            fontSize: '18px',
        }
    },
    item: {
        [theme.breakpoints.down(798)]: {
            width: '143px'
        }
    }


}))

type PropsType = {
    speed: number | undefined
    deg: string | undefined
    pressure: number | undefined
    humidity: number | undefined
}

export const WeatherDetails: React.FC<PropsType> = ({speed, deg, pressure, humidity}) => {
    const classes = useStyles()
    const [direction, setDirecrtion] = useState<string>()


    return (
        <div className={classes.main}>
            <div >
                <Typography className={classes.title}>Ветер</Typography>
                <Typography className={classes.description}>{speed} м/с, {deg}</Typography>
            </div>
            <div className={classes.item}>
                <Typography className={classes.title}>Давление</Typography>
                <Typography className={classes.description}>{pressure} мм рт. ст.</Typography>
            </div>
            <div >
                <Typography className={classes.title}>Влажность</Typography>
                <Typography className={classes.description}>{humidity}%</Typography>
            </div>
            <div className={classes.item}>
                <Typography className={classes.title}>Вероятность дождя</Typography>
                <Typography className={classes.description}>10%</Typography>
            </div>
        </div>
    )
}