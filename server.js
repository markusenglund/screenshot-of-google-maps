const express = require("express")
const path = require("path")
const favicon = require("serve-favicon")

const port = process.env.PORT || "3000"
const app = express()

// app.use(favicon(path.join(__dirname, "public", "favicon.ico")))
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
