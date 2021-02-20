const fetch = require("node-fetch")
const process = require('process')
const secrets = require("./secrets.js")
// qui si possono vedere dal browser i risultati "192.168.1.231:8080/risultati/viewer"
const credenziali = secrets.name
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

function exercises(es, data){
    switch(es){
        case 1:
            console.log(data.toLowerCase())
            return data.toLowerCase()
            break;
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
    .then( resBody => console.log(resBody))
    .catch(err => console.log(err))
})
.catch(err => console.log(err))




