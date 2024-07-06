let num = 2;
let deferredPrompt;




self.addEventListener('install', event => {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
});





self.addEventListener('notificationclick', function (event) {
  event.notification.close(); 
  const promiseChain = clients.openWindow("./");
  event.waitUntil(promiseChain);

});



  self.addEventListener('push', function(event) {
    num = num +1;
    event.waitUntil(
      
     
      //with the same tag of another one will replace it).
      self.registration.showNotification('Nova Start-Up', {
        body: 'Há um novo cadastro de Start-Up que pode ser do seu interesse',
        tag: 'swc'
            })
    );
  });





