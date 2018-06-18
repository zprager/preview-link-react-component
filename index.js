var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log("in index");
  res.render("index", { title: "Express" });
});


//testing grabity
const grabity = require("grabity");
//sends linkt to preview in POST request
//retuns title, description, image
router.post("/preview", function(req, res, next) {

  console.log('link', req.body.link);
  (async () => {
    let it = await grabity.grabIt(req.body.link);
    console.log(it);
    res.json({preview:it});
  })();

});


router.get("/preview/:link", function(req, res, next) {
  console.log('link', req.params.link);
  (async () => {
    let it = await grabity.grabIt("http://"+req.params.link);

    console.log(it);
    res.json({preview:it});
  })();
  //res.render("index", { title: "Express" });
});



module.exports = router;
