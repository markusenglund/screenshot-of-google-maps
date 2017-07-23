import React from "react"
import { saveAs } from "file-saver"
import html2canvas from "html2canvas"

function handleImageDownload() {
// Insane workaround: Set new css-values on map-element so html2canvas can properly process the map
// Get transform values
  const element = document.querySelector(".gm-style div div")
  const transform = element.style.transform
  const splitMatrix = transform.split(",")
  const left = parseFloat(splitMatrix[4]) // get left value
  const top = parseFloat(splitMatrix[5])  // get top value

  // Set top- and left-values
  element.style.transform = "none"
  element.style.left = `${left}px`
  element.style.top = `${top}px`

  // Turn google maps into canvas and download canvas as png
  // Hide controls
  const zoomButtons = document.querySelector(".gm-bundled-control-on-bottom")
  const mapTypeControls = document.querySelectorAll(".gm-style-mtc")
  const bottomRightText = document.querySelectorAll(".gm-style > .gm-style-cc")
  const searchBox = document.querySelector("#pac-input")

  for (let i = 0; i < mapTypeControls.length; i += 1) {
    mapTypeControls[i].style.visibility = "hidden"
  }
  for (let i = 0; i < bottomRightText.length; i += 1) {
    bottomRightText[i].style.visibility = "hidden"
  }
  // mapTypeControls.forEach(node => node.style.visibility = "hidden")
  // bottomRightText.forEach(node => node.style.visibility = "hidden")
  // reportText.style.visibility = "hidden"
  zoomButtons.style.visibility = "hidden"
  searchBox.style.visibility = "hidden"

  html2canvas(
    document.querySelector("#map"),
    { useCORS: true }
  ).then((canvas) => {
    canvas.toBlob((blob) => {
      saveAs(blob, "map.png")
    })
    // document.body.appendChild(canvas)

    // Put element back together
    element.style.transform = transform
    element.style.left = "0px"
    element.style.top = "0px"

    // Show ui elements again
    for (let i = 0; i < mapTypeControls.length; i += 1) {
      mapTypeControls[i].style.visibility = "visible"
    }
    for (let i = 0; i < bottomRightText.length; i += 1) {
      bottomRightText[i].style.visibility = "visible"
    }
    // mapTypeControls.forEach(node => node.style.visibility = "visible")
    // bottomRightText.forEach(node => node.style.visibility = "visible")
    zoomButtons.style.visibility = "visible"
    searchBox.style.visibility = "visible"
  })
}

function DownloadButton() {
  return (
    <div id="download-button-wrapper">
      <button id="download-button" onClick={handleImageDownload}>
        Save image
      </button>
    </div>
  )
}

export default DownloadButton
