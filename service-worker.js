self.addEventListener('install', function(event) {
  console.log("install");
  try {
    console.log('typeof System in install', typeof System);
  } catch (e) {
      console.log('error', e);
  }

  console.log('caching');
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      console.log('caching - getting');
      return cache.addAll([]);
    }).catch(function(error) {
      console.log('error', error)
    })
  );

  self.addEventListener('fetch', function(event) {
    console.log('fetching ->', event.request);
    event.respondWith(
      caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request, {mode: 'cors', credentials: 'include'});
      })
    );
  });
});