const fetch = require("node-fetch")
const { relative } = require("path")
const process = require('process')
const secrets = require("./secrets.js")
/*
dentro al file secrets:
const secrets = {}
secrets.nome = ""
}
secrets.ipAddress = ""
module.exports = secrets

*/
// qui si possono vedere dal browser i risultati "192.168.1.231:8080/risultati/viewer"
const credenziali = secrets.nome
const ipAddress = secrets.ipAddress
function accreditamento(obj){
    fetch(ipAddress+":8080/accreditamento", {
        method: 'post',
        body:    JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' },
    })
    .then( res => res.json())
    .then( resBody => console.log(resBody))
    .catch(err => console.log(err))
}

accreditamento(credenziali)

function removeItemOnce(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

function exercises(es, data){
    let risultato = []
    switch(es){
        case 1:
            return data.toLowerCase()
            break;
        case 2:
            return data*data
            break
        case 3:
            return data["cognome"]
            break
        case 4:
            return data.length
            break
        case 5:
            return risultato = data.map( (e) => {
                return e.toUpperCase()
            })
            break
        case 6:
            return data.reduce( (somma, e) => {
                return somma+e
            })
            break
        case 7:
            risultato = data.reduce( (somma, e) => {
                    if (e>5){
                        somma+=e
                    } 
                    return somma

                })
            console.log(risultato)
            return risultato
            break
        case 8:
            return data.reduce( (somma, e, i) => {
                if ((i%2)===0){
                    somma+=e
                }
                return somma
            })
        case 9:
            return data
                .filter( e => (e%2)!==0)
                .reduce( (somma, e) => somma+=e)
        case 10:
            return data.sort()
        case 11:
            console.log(data.sort())
            return (data.sort()).map(e => e.toLowerCase())
        default:
            console.log("esercizio non trovato")
    }
}


fetch(ipAddress+":8080/esercizi/"+process.argv[2].toString(), {
    method: 'get',
    headers: { 'x-data': 'true' },
})
.then( res => res.json())
.then( dati => {
    console.log(dati)
    console.log(dati.data)
    return fetch(ipAddress+":8080/esercizi/"+process.argv[2].toString(), {
        method: "post",
        body: JSON.stringify({
            data: exercises(+process.argv[2], dati.data)
        }),
        headers: {
        "Content-Type": "application/json"
        },
    })
    .then( res => res.json())
    .then ( e => console.log(e))
    .catch(err => console.log(err))
})
.catch(err => console.log(err))




