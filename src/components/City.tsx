import React, {useState} from 'react';
import {Button, Link, makeStyles, TextField, Typography} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {getWeather} from "../redux/weather-reducer";
import {getVariant} from "../selectors/weatherSelector";
import location from '../assects/location.svg'


const useStyles = makeStyles((theme) => ({
    main: {
        marginBottom: '186px',
        [theme.breakpoints.down(798)]: {
            marginBottom: '150px',
        },
        [theme.breakpoints.down(404)]: {
            marginBottom: '120px',
        }
    },
    city: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: 'white',
        fontSize: '50px',
        [theme.breakpoints.down(798)]: {
            fontSize: '30px',
        },
    },
    cityWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '7px'
    },
    myCity: {
        display: 'flex',
        alignItems: 'center',
    },
    changeCity: {
        color: '#FFFFFF',
        opacity: 0.6,
        fontSize: '18px',
        marginRight: '59px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        },
        [theme.breakpoints.down(462)]: {
            fontSize: '13px',
        },
    },
    myPositionWrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    myPosition: {
        color: '#FFFFFF',
        opacity: 0.6,
        fontSize: '18px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        },
        [theme.breakpoints.down(462)]: {
            fontSize: '13px',
        },
    },
    link: {
        cursor: 'pointer'
    },
    wrapperInput: {
        position: 'relative',
        display: 'inline-flex'
    },
    input: {
        width: '450px',
        borderRadius: '5px',
        backgroundColor: 'white',
        [theme.breakpoints.down(532)]: {
            width: '400px',
        },
        [theme.breakpoints.down(488)]: {
            width: '350px',
        },
        [theme.breakpoints.down(386)]: {
            width: '300px',
        },
        [theme.breakpoints.down(338)]: {
            width: '270px',
        }
    },
    button: {
        position: 'absolute',
        top: 2,
        right: -145,
        color: '#1086FF',
        fontSize: '25px',
        [theme.breakpoints.down(532)]: {
            right: -100,
        },
        [theme.breakpoints.down(532)]: {
            right: -55,
        },
        [theme.breakpoints.down(386)]: {
            right: 0,
        },
        [theme.breakpoints.down(338)]: {
            right: 30,
        }
    },
    text: {
        color: '#1086FF',
        fontSize: '25px'
    },
    test: {
        display: "none"
    },
    degree: {
        color: 'white',
        opacity: 0.4,
        marginRight: '9px'
    },
    variantButton: {
        width: '38px',
        height: '30px',
        backgroundColor: 'transparent',
        opacity: 0.4,
        color: "white",

    },
    c: {
        borderRadius: '8px 0 0 8px',
        border: '1px solid #FFFFFF',

    },
    f: {
        borderRadius: '0px 8px 8px 0px',
        border: '1px solid #FFFFFF'
    },
    selectedVariant: {
        backgroundColor: '#8AB5F3',
        '&:hover': {
            backgroundColor: '#71a8f3'
        }
    },
    variantButtons: {

    }


}))
const cities = ['Курган', 'Омск', 'Москва', 'Екатеринбург']

type PropsType = {
    city: string | undefined
}

export const City: React.FC<PropsType> = ({city}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const variant = useSelector(getVariant)
    const [edit, setEdit] = useState(false)
    const [value, setValue] = React.useState<string | null>(cities[0])
    const [inputValue, setInputValue] = React.useState('')
    const [ceringate, setCeringate] = React.useState(true)
    const [fahrenheit, setFahrenheit] = React.useState(false)
    const onSubmit = () => {
        if (value) {
            dispatch(getWeather(value, variant))
            setEdit(!edit)
        }
    }
    const onClickCentigrade = () => {
        city && dispatch(getWeather(city, 'metric'))
        setCeringate(true)
        setFahrenheit(false)
    }
    const onClickFahrenheit = () => {
        city && dispatch(getWeather(city, 'imperial'))
        setCeringate(false)
        setFahrenheit(true)
    }
    return (
        <div className={classes.main}>

            <div>
                <div className={classes.cityWrapper}>
                    {
                        !edit &&
                        <Typography className={classes.city} variant={'h1'}>{city}</Typography>
                    }
                    {
                        edit &&
                        <div className={classes.wrapperInput}>
                            <Autocomplete
                                value={value}
                                noOptionsText={'Такого города нет'}
                                onChange={(event: any, newValue: string | null) => {
                                    setValue(newValue);
                                }}
                                classes={{clearIndicatorDirty: classes.test}}
                                popupIcon={false}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                id="controllable-states-demo"
                                options={cities}
                                style={{width: 300}}
                                renderInput={(params) => <TextField {...params} className={classes.input}
                                                                    variant="outlined"/>}
                            />
                            <Button onClick={onSubmit} disabled={!value} className={classes.button}>
                                ОК
                            </Button>
                        </div>
                    }
                    {
                        !edit &&
                        <div className={classes.variantButtons}>
                            <span className={classes.degree}>&deg;</span>
                            <button onClick={onClickCentigrade}
                                    className={`${classes.c} ${classes.variantButton} ${ceringate && classes.selectedVariant}`}>C
                            </button>
                            <button onClick={onClickFahrenheit}
                                    className={`${classes.f} ${classes.variantButton} ${fahrenheit && classes.selectedVariant}`}>F
                            </button>
                        </div>

                    }

                </div>
                {
                    !edit &&
                    <div className={classes.myCity}>
                        <Link onClick={() => setEdit(!edit)} className={` ${classes.changeCity} ${classes.link}`}>Сменить
                            город</Link>
                        <div className={classes.myPositionWrapper}>
                            <img src={location} alt=""/>
                            <Typography className={classes.myPosition}>Мое местоположение</Typography>
                        </div>
                    </div>
                }
            </div>



        </div>
    );
};
