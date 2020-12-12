const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000
app.use(express.json())

app.use(cors());

mongoose
.connect(process.env.MONGODB_URI || "mongodb://localhost/wild_traveller_project_2")
.then(() => console.log("Mongodb connected successfully"));

//Import Routes
const locationRoute = require('./routes/locationRoute')
const commentRoute = require('./routes/commentRoute')
const authRoute = require('./routes/authRoute')

app.use('/location', locationRoute)
app.use('/location/:id/comment', commentRoute)
app.use('/auth', authRoute)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static( 'client/build' ))

  app.get('*', () => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => console.log("server running on port " + PORT));
