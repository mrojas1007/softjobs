const express = require('express')
const bodyParser = require("body-parser");
const softJobs = require("./routes/softJobs.js");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(softJobs);

app.listen(3000, () => {
    console.log("Servidor levantado en puerto 3000");
});
