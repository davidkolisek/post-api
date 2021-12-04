const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let self = this;
  let url = "https://www.pravda.sk/bleskove-spravy/"; // url we get data from
  let dataArray = []; // we put data in this array
  axios({
    method: "get",
    url: url,
  }).then(function (response) {
    let html = response.data;

    let $ = cheerio.load(html);

    $(".bleskovo-box-day .bleskovo-box-day-row").each(function () {
      const title = $(this).find(".bleskovo-box-day-row-text a b").text();
      // const image = $(this).find("img").attr("data-src");
      // putting data in array.

      dataArray.push({
        title: title,
        // image: image,
      });
    });

    self.lastestArticles = dataArray; // Here we assign value to vuejs variable

    console.log(dataArray);
    res.send(dataArray)
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
