const webpush = require ('web-push');
const Redis = require('ioredis');
const redis = new Redis();
var process = require('process');



const CHAVE_PUBLICA = "BGpbzGbOy3xNegjhxmoqC4xL0rfnjSHm111ng5XjeWt4MHhPGU0iIjEn-egIMKKdvbW5WV8KuSQeCRbuFYztkqA";

const CHAVE_PRIVADA = "1nVHquMj2njZmwxwm0-lv_XlcI1LwMvJdOMQ0Kkwwlo";
const SUBJECT = 'mailto:mateus3048@gmail.com';



async function init ()
{
    while (1) {


        try {

            const value = await redis.blpop('push', 0);
            console.log(`Process pid ${process.pid}`)

            console.log('recebeu pedido para push notification')
            let message = JSON.parse(value[1]);
            var p = message.pushSubscription;

            try {
                envia (p);
        
            }
            catch(e)
            {
        
            }

        } catch (error) {
            console.error(error);
        }
    }
}
 



 function envia(destinatario) {


    // Para enviar notificacoes, deve-se identificar-se usando sua chave publica e privada
    webpush.setVapidDetails(SUBJECT, CHAVE_PUBLICA, CHAVE_PRIVADA);


    // envia mensagem para um cliente
    // para isso, precisa saver o pushSubscription que o cliente obteve ao se registrar
    webpush.sendNotification(
        destinatario,
        JSON.stringify({
            title: 'Mensagem',
            message: 'valor'
        })
    );
}



init();