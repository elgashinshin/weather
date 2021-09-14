import {AppStateType} from "../redux/redux-store";

export const getVariant = (state: AppStateType) => {
    return state.weatherReducer.variantWeather
}

export const getDescription = (state: AppStateType) => {
    return state.weatherReducer.description
}

export const getTemp = (state: AppStateType) => {
    return state.weatherReducer.temp
}

export const getHumidity = (state: AppStateType) => {
    return state.weatherReducer.humidity
}

export const getPressure = (state: AppStateType) => {
    return state.weatherReducer.pressure
}

export const getSpeed = (state: AppStateType) => {
    return state.weatherReducer.speed
}

export const getDeg = (state: AppStateType) => {
    return state.weatherReducer.deg
}

export const getCity = (state: AppStateType) => {
    return state.weatherReducer.city
}