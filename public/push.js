function usaPush(registration, settings) {



    return registration.pushManager.getSubscription()
        .then(function(subscription) {

            if (subscription) {
                console.log('possui ja pushSubscription', JSON.stringify(subscription))
                settings.pushSubscription = subscription;

                // faz um POST do seu valor de subscription


                return;
            }

            return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: determineAppServerKey()
                })
                .then(function(subscription) {
                    console.log('pushSubscription', JSON.stringify(subscription))
                    settings.pushSubscription = subscription;


                    // faz um POST do seu valor de key

                    if (Notification.permission === 'denied') {
                        console.log('Notificações bloqueadas');
                        return;
                    } else console.log('Notificações habilitadas')

                });
        });

}