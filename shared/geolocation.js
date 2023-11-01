function whereAmI() {  
    navigator.geolocation.watchPosition(
      // Success callback function
      function(position) {        
        // Get the user's latitude and longitude coordinates
        const lat1 = position.coords.latitude;
        const lng1 = position.coords.longitude;
        const lat2 = -37.00495999101654;
        const lng2 = 174.5623374276521;
  
        // Update the map with the user's new location
        document.getElementById('lat1').innerHTML=lat1;
        document.getElementById('lng1').innerHTML=lng1;
        document.getElementById('lat2').innerHTML=lat2;
        document.getElementById('lng2').innerHTML=lng2;
        document.getElementById('distance').innerHTML=getDistance(lat1, lng1, lat2, lng2);
        document.getElementById('bearing').innerHTML=getBearing(lat1,lng1,lat2,lng2);

      },
      // Error callback function
      function(error) {
        // Handle errors, e.g. user denied location sharing permissions
        console.error("Error getting user location:", error);
      }
    )
}

//http://stackoverflow.com/questions/11415106/issue-with-calcuating-compass-bearing-between-two-gps-coordinates

function getDistance(lat1, lng1, lat2, lng2) {
    var R = 6371; // Radius of the earth in km
    var dLat = toRad(lat2-lat1);  
    var dLon = toRad(lng2-lng1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 
    return Math.round(d*1000)/1000; // distance in km
}

function getBearing (lat1,lng1,lat2,lng2) {
  var dLon = (lng2-lng1);
  var y = Math.sin(dLon) * Math.cos(lat2);
  var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
  var brng = this.toDeg(Math.atan2(y, x));
  return Math.round(360 - ((brng + 360) % 360)); // bearing in degrees
}
function toRad(deg) {
  return deg * Math.PI / 180;
}

function  toDeg (rad) {
  return rad * 180 / Math.PI;
}