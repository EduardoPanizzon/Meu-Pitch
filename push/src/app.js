



var nome = "Ana";

    var settings = {
        public: "BGpbzGbOy3xNegjhxmoqC4xL0rfnjSHm111ng5XjeWt4MHhPGU0iIjEn-egIMKKdvbW5WV8KuSQeCRbuFYztkqA",
        pushSubscription: ''
    };

    const options = {
        icon: 'icons/pequeno.png',
        badge: 'icons/pequeno.png'

    };

    let installButton;
    let omite;


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







    function fazEnvio() {
        nome = document.getElementById('nome').value;
        envia(nome, settings.pushSubscription);
    }

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

    async function envia(nome, key) {

        console.log('pushSubscrition:', key);

        fetch("http://localhost:4500/REST/registraUsuario", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    key: JSON.stringify(key)
                })
            })
            .then(response => response.json())
            .then(json => console.log(json));

    }




    function determineAppServerKey() {
        var vapidPublicKey = settings.public;
        return urlBase64ToUint8Array(vapidPublicKey);
    }
    function disableInAppInstallPrompt() {
        installPrompt = null;
        document.getElementById('instalacao').style.display='none';
      }

    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        installPrompt = event;
        document.getElementById('instalacao').style.display='block';
      });



    document.addEventListener("DOMContentLoaded", function() {
        console.log('rodando');
        omite         = document.querySelector("#omite");
        installButton = document.querySelector("#install");


        omite.addEventListener("click", async () => {
     
            disableInAppInstallPrompt();
          });

        installButton.addEventListener("click", async () => {
            if (!installPrompt) {
              return;
            }
            const result = await installPrompt.prompt();
            console.log(`Install prompt was: ${result.outcome}`);
            disableInAppInstallPrompt();
          });

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
