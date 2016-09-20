var cacheName = 'schoolines-1';  
var filesToCache = [  
  '/app/components/index/index.html', 
  '/app/components/deadlineDetail/deadlineDetail.html',
  '/app/components/deadlineCreate/deadlineCreate.html',
  '/app/components/splashScreen/splashScreen.html',
  '/app/directives/deadline.html',
  '/app/directives/navbar.html',
  '/images/logo.png',
  '/images/drawer.png',
  '/images/add.svg',
  "/javascripts/vendor/jquery.min.js",
  "/javascripts/vendor/angular.min.js",
  "/javascripts/vendor/angular-resource.js",
  "/javascripts/vendor/angular-route.js",
  "/javascripts/vendor/angular-cookies.js",
  "/javascripts/vendor/angular-ui-router.min.js",
  "/javascripts/vendor/angular-aria.min.js",
  "/javascripts/vendor/angular-animate.min.js",
  "/javascripts/vendor/angular-material.min.js",
  "/javascripts/vendor/ngStorage.min.js",
  "/app/app.js",
  "app/directives/deadlineDirective.js",
  "app/directives/navbarDirective.js",
  "/app/services/authService.js",
  "/app/services/deadlineService.js",
  "/app/services/ivleService.js",
  "/app/services/voteService.js",
  "/app/services/expService.js",
  "/app/services/session.js",
  "/app/components/index/indexController.js",
  "/app/components/deadlineCreate/deadlineCreateController.js",
  "/app/components/deadlineDetail/deadlineDetailController.js",
  "/app/components/splashScreen/splashScreenController.js",
  "/stylesheets/style.css",
  "/stylesheets/angular-material.min.css",
  "/stylesheets/fonts.css",
  "/stylesheets/deadline.css",
  "/stylesheets/navbar.css",
  "/stylesheets/deadlineCreate.css",
  "/images/favicon.ico",
  "/stylesheets/fonts/Roboto-300/Roboto-300.eot",
  "/stylesheets/fonts/Roboto-regular/Roboto-regular.eot",
  "/stylesheets/fonts/Roboto-500/Roboto-500.eot",
  "/stylesheets/fonts/Roboto-700/Roboto-700.eot",
  "/stylesheets/fonts/Roboto-italic/Roboto-italic.eot",
  "/stylesheets/fonts/Roboto-300/Roboto-300.ttf",
  "/stylesheets/fonts/Roboto-regular/Roboto-regular.ttf",
  "/stylesheets/fonts/Roboto-500/Roboto-500.ttf",
  "/stylesheets/fonts/Roboto-700/Roboto-700.ttf",
  "/stylesheets/fonts/Roboto-italic/Roboto-italic.ttf",
  "/stylesheets/fonts/Roboto-300/Roboto-300.woff2",
  "/stylesheets/fonts/Roboto-regular/Roboto-regular.woff2",
  "/stylesheets/fonts/Roboto-500/Roboto-500.woff2",
  "/stylesheets/fonts/Roboto-700/Roboto-700.woff2",
  "/stylesheets/fonts/Roboto-italic/Roboto-italic.woff2",
  "/"
];

self.addEventListener('install', function(e) {  
  console.log('[ServiceWorker] Install');  
  e.waitUntil(  
    caches.open(cacheName).then(function(cache) {  
      console.log('[ServiceWorker] Caching app shell');  
      return cache.addAll(filesToCache);  
    })  
  );  
});

self.addEventListener('activate', function(e) {  
  console.log('[ServiceWorker] Activate');  
  e.waitUntil(  
    caches.keys().then(function(keyList) {  
      return Promise.all(keyList.map(function(key) {  
        console.log('[ServiceWorker] Removing old cache', key);  
        if (key !== cacheName) {  
          return caches.delete(key);  
        }  
      }));  
    })  
  );  
});

self.addEventListener('fetch', function(e) {  
  console.log('[ServiceWorker] Fetch', e.request.url);  
  e.respondWith(  
    caches.match(e.request).then(function(response) {  
      return response || fetch(e.request);  
    })  
  );  
});

// Application Data

// var dataCacheName = 'deadlineData-v1';

// self.addEventListener('fetch', function(e) {  
//   console.log('[ServiceWorker] Fetch', e.request.url);  
//   var apiFlag = 'Management';  
//   if (e.request.url.indexOf(apiFlag) === 0) {  
//     e.respondWith(  
//       fetch(e.request)  
//         .then(function(response) {  
//           return caches.open(dataCacheName).then(function(cache) {  
//             cache.put(e.request.url, response.clone());  
//             console.log('[ServiceWorker] Fetched&Cached Data');  
//             return response;  
//           });  
//         })  
//     );
//   } else {  
//     e.respondWith(  
//       caches.match(e.request).then(function(response) {  
//         return response || fetch(e.request);  
//       })  
//     );  
//   }  
// });
