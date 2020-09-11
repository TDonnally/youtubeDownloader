const express = require("express");
const app = express();
const PORT = 5000;

/*
    1)Homepage will be accessed by react
    2)User enters url
    3)Onclick send request to "/download"
    4)Download video
*/

app.use(express.json());
app.use(require("./routes/downloadContent"));

//start server
app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
