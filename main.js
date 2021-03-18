const fetch = require("node-fetch")
const { relative } = require("path")
const process = require('process')
const secrets = require("./secrets.js")
// qui si possono vedere dal browser i risultati "192.168.1.231:8080/risultati/viewer"

/*
const secrets = {}
secrets.name = {
    nome:""
}
secrets.ipAddress = ""
module.exports = secrets
*/

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

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }


function exercises(es, data){
    let risultato = []
    switch(es){
        case 0:
            accreditamento(credenziali)
        case 1:
            return data.toLowerCase()
            break;
        case 2:
            for (let i = 1; i<data.length; i++){
                if ((i%2)!==0){
                    risultato.push(data[i])
                }
            }
            return risultato
            break
        case 3:
            risultato = []
            for (let e of data){
                if (e.length > 4){
                    risultato.push(e.toUpperCase())
                }
            }
            return risultato
            break
        case 4:
            risultato = []
            for (let e of data){
                if (e[e.length-1] === "E"){
                    risultato.push(e.toLowerCase())
                }
            }
            return risultato
            break
        case 5:
            risultato = []
            for (let i in data){
                risultato.push(data[i]-i)
            }
            return risultato
            break
        case 6:
            let n
            let max = Math.max(...data)
            removeItemOnce(data, max)
            n = Math.max(...data)
            return n
            break
        case 7:
            console.log(data)
            let temp = data.split(" ")
            for (let e of temp){
                if (e[0] !== "a"){
                    risultato.push(e)
                }
            }
            return risultato
            break
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