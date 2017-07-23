var map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    center: { lat: 25, lng: 0 },
    streetViewControl: false,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    backgroundColor: "none"
  })
  var input = document.getElementById("pac-input")
  var searchBox = new google.maps.places.SearchBox(input)
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", function() {
    searchBox.setBounds(map.getBounds())
  })

  // let markers = []
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
  searchBox.addListener("places_changed", function() {
    var places = searchBox.getPlaces()

    if (places.length === 0) {
      return
    }

    // // Clear out the old markers.
    // markers.forEach((marker) => {
    //   marker.setMap(null)
    // })

    // markers = []

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds()
    places.forEach(function(place) {
      if (!place.geometry) {
        // console.log("Returned place contains no geometry")
        return
      }

      // Create a marker for place.
      // markers.push(new google.maps.Marker({
      //   map, position: place.geometry.location
      // }))

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    })
    map.fitBounds(bounds)
  })
}

// Add eventlisteners for modal

var descriptionBox = document.querySelector("#description-box")
var overlay = document.querySelector("#overlay")
overlay.addEventListener("click", removeModal)

var modalButton = document.querySelector("#description-box button")
modalButton.addEventListener("click", removeModal)

function removeModal() {
  overlay.style.display = "none"
  descriptionBox.style.display = "none"
}
