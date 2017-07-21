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
  const controlElements = document.querySelectorAll(".gmnoprint")
  const reportText = document.querySelector(".gm-style-cc")
  const searchBox = document.querySelector("#pac-input")
  controlElements.forEach(node => node.style.visibility = "hidden")
  reportText.style.visibility = "hidden"
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
    controlElements.forEach(node => node.style.visibility = "visible")
    searchBox.style.visibility = "visible"
    reportText.style.visibility = "visible"
  })
}

function DownloadButton() {
  return (
    <div id="download-button-wrapper">
      <button id="download-button" onClick={handleImageDownload}>
        Download image
      </button>
    </div>
  )
}

export default DownloadButton
