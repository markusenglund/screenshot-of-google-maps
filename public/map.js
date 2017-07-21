let map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 3,
    streetViewControl: false,
    mapTypeControlOptions: {
      // style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    backgroundColor: "none"
  })
  const input = document.getElementById("pac-input")
  const searchBox = new google.maps.places.SearchBox(input)
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)

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

// Add eventlisteners for modal

const descriptionBox = document.querySelector("#description-box")
const overlay = document.querySelector("#overlay")
overlay.addEventListener("click", removeModal)

const modalButton = document.querySelector("#description-box button")
modalButton.addEventListener("click", removeModal)

function removeModal(event) {
  console.log(event)
  overlay.style.display = "none"
  descriptionBox.style.display = "none"
}
