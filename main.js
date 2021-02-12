const fetch = require("node-fetch")
const process = require('process')
// qui si possono vedere dal browser i risultati "192.168.1.231:8080/risultati/viewer"

const credenziali = {
        	nome: //"inserisci il tuo nome"
        }


function accreditamento(obj){
    fetch("192.168.1.231:8080/accreditamento", {
        method: 'post',
        body:    JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' },
    })
    .then( res => res.json())
    .then( resBody => console.log(resBody))
    .catch(err => console.log(err))
}
//accreditamento(credenziali)
function exercises(es, data){
    case 1:

}


fetch("192.168.1.231:8080/esercizi/"+process.argv[2].toString(), {
        method: 'get',
        headers: { 'x-data': 'true' },
    })
    .then( res => res.json())
    .then( resBody => console.log(resBody))
    .then( dati => {
        fetch("192.168.1.231:8080/esercizi/"+process.argv[2].toString(), {
            method: "post",
            body: JSON.stringify({
                data: exercises(+process.argv[2], dati)
            }),
            headers: {
            "Content-Type": "application/json"
            },
        })
        .then( res => res.json())
        .then( resBody => console.log(resBody))
        .catch(err => console.log(err))
    }
    .catch(err => console.log(err))


