const fetch = require("node-fetch")
const { relative } = require("path")
const process = require('process')
const secrets = require("./secrets.js")
const esercizioAttuale = process.argv[2].toString()
// qui si possono vedere dal browser i risultati "192.168.1.231:8080/risultati/viewer"

/*
const secrets = {}
secrets.name = {
    nome:""
}
secrets.url = ""
module.exports = secrets
*/

const credenziali = secrets.name
const url = secrets.url

function removeItemOnce(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

function accreditamento(obj){
    fetch(`${url}/accreditamento`, {
        method: 'post',
        body:    JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' },
    })
    .then( res => res.json())
    .then( resBody => console.log(resBody))
}

function getExercise(n){
    return fetch(`${url}/esercizi/${n}`, {
        method: 'get',
        headers: { 'x-data': 'true' },
    })
    .then( res => res.json())
    .then(data => {
        console.log(data)
        return data.data
    })
    .catch(err => console.log(err))
}

function sendExercise(n, risultato){
    return fetch(`${url}/esercizi/${n}`, {
        method: "post",
        body: JSON.stringify({
            data: risultato
        }),
        headers: {
        "Content-Type": "application/json"
        },
    })
    .then( res => res.json())
    .then( res => console.log(res))
    .catch(err => console.log(err))
}

const voto = (url) => {
    return fetch(`${url}/voto`)
    .then(res => res.json())
    .then(resBody => {
        console.log(`Il tuo punteggio:`, resBody.score)
    })
    .catch(err => console.log(err))
}


function es1(data){
    return data.toLowerCase()
}



if (esercizioAttuale === "0"){
    accreditamento(credenziali)
}
else {
    getExercise(esercizioAttuale)
        .then(data => es1(data))
        .then(risultato => sendExercise(esercizioAttuale, risultato))
        .then(voto(url))
    .catch(err => console.log(err))
}

