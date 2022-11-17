const { guardarDB, leerDB } = require("../guardarArchivos/gestionarArchivos");
const {
  inquirerMenu,
  pausa,
  leerInput,
  ciudadesMenu,
  mostrarHistorial,
} = require("../helpers/inquirer");
const Busquedas = require("./models/busquedas");

const menu = async () => {
  let opc;
  const busquedas = new Busquedas();
  const historialDB = leerDB();

  busquedas.cargarDB(historialDB);
  do {
    opc = await inquirerMenu();

    switch (opc) {
      case 1:
        const ciudad = await leerInput("Ciudad : ");
        const ciudades = await busquedas.ciudad(ciudad);
        if (ciudades.length > 0) {
          //console.log(ciudades)
          const ciudadEscogida = await ciudadesMenu(ciudades);
          if (ciudadEscogida != 0) {
            const lugar = ciudades.find((l) => l.id == ciudadEscogida);
            const { nombreCiudad, lng, lat } = lugar;
            const clima = await busquedas.climaLugar(lng, lat);
            console.log("Ciudad : ", ciudadEscogida);
            console.log("\nInformacion De La Ciudad\n".green);
            console.log("Ciudad: ", nombreCiudad);
            console.log("Latitud: ", lat);
            console.log("Longitud: ", lng);
            console.log("Temperatura : ", clima.temp);
            console.log("Temperatura Min: ", clima.min);
            console.log("Temperatura Max: ", clima.max);
            console.log("Como esta El Clima : ", clima.desc);


            //Guardar nombreCiudad en la base de Datos
            busquedas.addHistorial(nombreCiudad);
          }

          if (ciudadEscogida == 0) {
            await pausa();
          }
        }

        break;
      case 2:
        const DB =leerDB()
        console.log()
        await mostrarHistorial(DB);
        break;
    }
    guardarDB(busquedas.getHistorialBusquedas);
    if (opc !== 0) await pausa();
  } while (opc != 0);

  console.log();
  console.log();
  console.log();
  console.log();
  console.log();
};

menu();
