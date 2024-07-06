var settings = {
    public: "BGpbzGbOy3xNegjhxmoqC4xL0rfnjSHm111ng5XjeWt4MHhPGU0iIjEn-egIMKKdvbW5WV8KuSQeCRbuFYztkqA",
    pushSubscription: ''
};

const options = {
    icon: 'icons/pequeno.png',
    badge: 'icons/pequeno.png'

};

let id = null;

function fazEnvio() {
    var nome = document.getElementById('nome').value;
    var it = document.getElementById('it').checked;
    var saude = document.getElementById('saude').checked;
    var fintech = document.getElementById('fintech').checked;
    var mobilidade = document.getElementById('mobilidade').checked;
    var agricultura = document.getElementById('agricultura').checked;
    var educacao = document.getElementById('educacao').checked;
    var alimentacao = document.getElementById('alimentacao').checked;
    var dados = [nome, it, saude, fintech, mobilidade, agricultura, educacao, alimentacao, dados]
    //console.log("ERRADO");
    envia(dados, settings.pushSubscription);
}

function fazEnvioEmpreendedor() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var startupNome = document.getElementById('startupNome').value;
    var startupDesc = document.getElementById('startupDesc').value;
    var it = document.getElementById('it').checked;
    var saude = document.getElementById('saude').checked;
    var fintech = document.getElementById('fintech').checked;
    var mobilidade = document.getElementById('mobilidade').checked;
    var agricultura = document.getElementById('agricultura').checked;
    var educacao = document.getElementById('educacao').checked;
    var alimentacao = document.getElementById('alimentacao').checked;
    var dados = [nome, email, senha, startupNome, startupDesc, it, saude, fintech, mobilidade, agricultura, educacao, alimentacao, dados]
    enviaEmpreendedor(dados, settings.pushSubscription);
}

async function envia(dados, key) {

    console.log('pushSubscrition:', key);

    fetch("http://localhost:4500/REST/registraEntusiasta", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: dados[0],
                key: JSON.stringify(key),
                it: dados[1],
                saude: dados[2],
                fintech: dados[3],
                mobilidade: dados[4],
                agricultura: dados[5],
                educacao: dados[6],
                alimentacao: dados[7],
            })
        })
        .then(response => response.json())
        .then(json => console.log(json.id));
    
}

async function enviaEmpreendedor(dados, key) {

    console.log('pushSubscrition:', key);

    fetch("http://localhost:4500/REST/registraEmpreendedor", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: dados[0],
                key: JSON.stringify(key),
                email: dados[1],
                senha: dados[2],
                startupNome: dados[3],
                startupDesc: dados[4],
                it: dados[5],
                saude: dados[6],
                fintech: dados[7],
                mobilidade: dados[8],
                agricultura: dados[9],
                educacao: dados[10],
                alimentacao: dados[11],
            })
        })
        .then(response => response.json())
        .then(json => console.log(json.id));

}


    function notifyMe() {
        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            var notification = new Notification('Notification title', {
                icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
                body: "Hey there! You've been notified!",
            });

            notification.onclick = function() {
                window.open("http://stackoverflow.com/a/13328397/1269037");
            };

        }

    }

    document.addEventListener("DOMContentLoaded", function() {
        console.log('rodando');

        btn.addEventListener("click", () => {
            Notification.requestPermission();
        });


        if ('serviceWorker' in navigator) {

            navigator.serviceWorker
                .register("./service-worker.js")
                .then(function(registration) {
                    console.log("Registrou o service worker");
                    usaPush(registration, settings);

                }).catch(function(err) {
                    console.log("Registro do service worker:", err);
                });

        } else {
            console.log('ServiceWorker não é suportado.');
        }



    });

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    function determineAppServerKey() {
        var vapidPublicKey = settings.public;
        return urlBase64ToUint8Array(vapidPublicKey);
    }