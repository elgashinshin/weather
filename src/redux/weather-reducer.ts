import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {weatherAPI} from "../api/api";

const initialState: {
    variantWeather: string // Вариант отображения температуры
    description?: string // Погода
    temp?: number // Температура
    humidity?: number // Влажность
    pressure?: number // Давление
    speed?: number // Скорость ветра
    deg?: string // Направление ветра
    city?: string
} = {
    variantWeather: 'metric',
    city: 'Курган'
}

type InitialStateType = typeof initialState

export const weatherReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'GET_WEATHER':
            return {
                ...state,
                temp: action.temp,
                humidity: action.humidity,
                pressure: action.pressure,
                speed: action.speed,
                deg: action.deg,
                description: action.weather,
                city: action.city
            }
        case 'CHANGE_VARIANT':
            return {
                ...state,
                variantWeather: action.variant
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof weatherActions>

export const weatherActions = {
    getWeatherSuccess: (temp: number, humidity: number, pressure: number, speed: number, deg: string, weather: string, city: string) => ({
        type: 'GET_WEATHER',
        temp,
        humidity,
        pressure,
        speed,
        deg,
        weather,
        city
    } as const),
    changeVariant: (variant: string) => ({type: 'CHANGE_VARIANT', variant} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getWeather = (city: string, variant: string): ThunkType => {
    return async (dispatch) => {
        let data = await weatherAPI.getWeather(city, variant)
        let weather = data.weather.map((p: {
            id: number
            main: string
            description: string
            icon: string
        }) => {
            return p.description
        })
        let directions = ['северный', 'северо-восточный', 'восточный', 'юго-восточный', 'южный', 'юго-западный', 'западный', 'северо-западный'];
        let degrees = Math.round(data.wind.deg) * 8 / 360;
        degrees = Math.round(degrees)
        degrees = (degrees + 8) % 8
        dispatch(weatherActions.getWeatherSuccess(Math.round(data.main.temp), Math.round(data.main.humidity), Math.round(data.main.pressure), Math.round(data.wind.speed), directions[degrees], weather[0], data.name))
        dispatch(weatherActions.changeVariant(variant))
    }
}
