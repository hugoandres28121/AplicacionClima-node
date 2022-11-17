const fs = require('fs')
const path = require('path')
const dirnameDB = require('../db/gestionArchivos')
const pathArchivoDB = path.join(dirnameDB,'data.json')


const guardarDB=(data)=>{
    fs.writeFileSync(pathArchivoDB,JSON.stringify(data) )
}

const leerDB=()=>{
    const infoDB = fs.readFileSync(pathArchivoDB,{encoding:'utf-8'})
    const data = JSON.parse(infoDB)
    return data
}

module.exports= {
    guardarDB,
    leerDB
}