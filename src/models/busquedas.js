const axios = require("axios");
require("dotenv").config();

class Busquedas {
  get getHistorialBusquedas() {
    return this.historialBusquedas;
  }

  constructor() {
    this.historialBusquedas = {
      historial: [],
    };
  }

  cargarDB(historialCargado) {
    if (historialCargado["historial"].length > 0) {
      const infoCargada = historialCargado["historial"];
      infoCargada.map((i) => {
        this.historialBusquedas["historial"].push(i);
      });
    }
  }

  addHistorial(busqueda) {
    this.historialBusquedas["historial"].push(busqueda);
    return this.historialBusquedas;
  }

  async ciudad(lugar = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
        params: {
          language: "es",
          access_token: process.env.TOKEN,
          limit: 5,
        },
      });

      const { data } = await instance.get();
      const { features } = data;
      if (features.length > 0) {
        const ciudades = features.map((lugar) => {
          const { id, place_name_es, center } = lugar;
          const [lng, lat] = center;
          return {
            id,
            value: place_name_es,
            nombreCiudad: place_name_es,
            lng,
            lat,
          };
        });
        return ciudades;
      }

      console.log(`No se Encontraron Coincidencias con ${lugar}
      Presione ENTER para Regresar al Menu Principal`);
      return [];
    } catch (error) {
      console.log(error.message);
    }
  }

  async climaLugar(longitud = "", latitud = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
        params: {
          lat: latitud,
          lon: longitud,
          lang: "sp",
          appid: process.env.KEY_OPENWEATHER,
          units: "metric",
        },
      });

      const { data } = await instance.get();
      const { weather, main } = data;
      return {
        desc: weather[0].description,
        min:main.temp_min,
        max:main.temp_max,
        temp:main.temp
      };
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Busquedas;
