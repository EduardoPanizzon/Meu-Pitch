var settings = {
    public: "BGpbzGbOy3xNegjhxmoqC4xL0rfnjSHm111ng5XjeWt4MHhPGU0iIjEn-egIMKKdvbW5WV8KuSQeCRbuFYztkqA",
    pushSubscription: ''
};

const options = {
    icon: 'icons/pequeno.png',
    badge: 'icons/pequeno.png'

};

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
    envia(dados, settings.pushSubscription);
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
        .then(json => console.log(json));

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

    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        installPrompt = event;
        document.getElementById('instalacao').style.display='block';
      });

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
