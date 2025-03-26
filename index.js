const express = require("express");
const app = express();
const rtfParser = require("rtf-parser");
app.set("view engine", "ejs");
const path = require('path');
const fs = require("fs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "tcp_conn_mgmt.rtf");
  fs.readFile(filePath, "utf8", (err, data) => { //const filePath = path.join(__dirname, "public", "tcp_conn_mgmt.rtf");
    if (err) {
      res.send(err)
      return;
    }
    rtfParser.string(data, (err, plainText) => {
      if (err) res.send(err);
      res.render("index.ejs", { plainText });
      // res.send(plainText.content[2].content[0].value) // its correct
    });
  });
});

app.get("/second", (req, res) => {
  const filePath2 = path.join(__dirname, "public", "tcp_conn_mgmt.rtf")
  fs.readFile(filePath2, "utf8", (err, data) => { //const filePath2 = path.join(__dirname, "public", "tcp_conn_mgmt.rtf");
    if (err) {
      res.send(err);
      return;
    }
    rtfParser.string(data, async (err, plainText2) => {
      if (err) res.send(err);
      await res.render("second.ejs", { plainText2 });
      // res.send(plainText2)
      // plainText2.content.forEach(element => {
      //   if(element.content==false) console.log('empty');
      //    else if (element.content)console.log(element.content[0].value)
      //     else if(element.value) console.log(element.value)
      // });
      // console.log(plainText2.content[23].value) // last line
      // console.log(plainText2.content[0].content?'arry':'not array')
      // console.log(plainText2.content[23].content?'present':'absetn')
      //   console.log(plainText2.content[10].content[0].value)
      // // res.send(plainText2.content[10].content[0].value)
    });
  });
});
app.listen(8000);
