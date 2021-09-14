import axios from "axios";

const inscance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

export const weatherAPI = {
    getWeather(city: string, units: string) {
        return inscance
            .get(`weather?lang=ru&q=${city}&APPID=9901ab251a5e178af6e042a31604452e&units=${units}`)
            .then(res => {
                return res.data
            })
    }
}