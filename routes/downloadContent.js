const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const ytdl = require("ytdl-core");

/*
  Future updates:
    1)add video quality options
    2)add different file downloads
    3)website auto scrubber
    4)send to Downloads file*
    5)Error Handling
*/
router.post("/download", (req, res) => {
  res.json({ message: "video downloaded" });
  const { url } = req.body;
  const outputName = "video.mp4";
  const outputPath = path.resolve(__dirname, outputName);
  const video = ytdl(url);
  console.log(video);
  video.pipe(fs.createWriteStream(outputPath));
  video.once("response", () => {
    starttime = Date.now();
  });
  video.on("progress", (chunkLength, downloaded, total) => {
    const percent = downloaded / total;
    const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
    const estimatedDownloadTime =
      downloadedMinutes / percent - downloadedMinutes;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
    process.stdout.write(
      `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
        total /
        1024 /
        1024
      ).toFixed(2)}MB)\n`
    );
    process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
    process.stdout.write(
      `, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
    );
    readline.moveCursor(process.stdout, 0, -1);
  });
  video.on("end", () => {
    process.stdout.write("\n\n");
    console.log("download done");
  });
});

module.exports = router;
