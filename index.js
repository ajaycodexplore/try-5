const express = require("express");
const app = express();
const rtfParser = require("rtf-parser");
app.set("view engine", "ejs");
const fs = require("fs");
app.get("/", (req, res) => {
  fs.readFile("tcp_conn_mgmt.rtf", "utf8", (err, data) => {
    if (err) {
      res.send(err);
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
  fs.readFile("tcp_header_fields.rtf", "utf8", (err, data) => {
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
