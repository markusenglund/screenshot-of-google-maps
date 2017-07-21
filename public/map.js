let map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 3,
    streetViewControl: false
  })
  const input = document.getElementById("pac-input")
  const searchBox = new google.maps.places.SearchBox(input)
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input)

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds())
  })

  // let markers = []
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces()

    if (places.length === 0) {
      return
    }

    // // Clear out the old markers.
    // markers.forEach((marker) => {
    //   marker.setMap(null)
    // })

    // markers = []

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds()
    places.forEach((place) => {
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
