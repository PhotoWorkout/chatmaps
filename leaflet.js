function createMap(country, color) {
    // Replace this with your Mapbox API access token
    var mapboxAccessToken = 'YOUR_ACCESS_TOKEN_HERE';
  
    // Create a new map with Leaflet
    var map = L.map('map').setView([0, 0], 1);
  
    // Add a tile layer with Mapbox streets as the base layer
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: mapboxAccessToken
    }).addTo(map);
  
    // Use the Mapbox geocoding API to get the latitude and longitude for the given country
    $.getJSON('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(country) + '.json?access_token=' + mapboxAccessToken, function(response) {
      // Get the first result from the geocoding response
      var result = response.features[0];
  
      // Get the latitude and longitude from the result
      var latitude = result.center[1];
      var longitude = result.center[0];
  
      // Create a marker with the given color at the latitude and longitude
      var marker = L.circleMarker([latitude, longitude], {
        color: color,
        fillColor: color,
        fillOpacity: 0.5,
        radius: 10
      }).addTo(map);
  
      // Set the map view to the marker location
      map.setView([latitude, longitude], 5);
    });
  }
  