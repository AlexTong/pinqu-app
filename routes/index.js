var express = require("express");
var router = express.Router();

var paths = [
	"/",
	"/home"
];

router.get(paths, function (req, res, next) {
	res.render("shell/index");
});

router.get("/shell/*", function (req, res, next) {
	var url = req.url, i = req.url.indexOf("?");
	if (i > 0) {
		url = url.substring(1, i);
	}
	res.render(url.substring(1));
});


router.get("/demo/products", function (req, res) {
	res.send([
		{
			id: "01", name: "鼠标"
		},
		{
			id: "01", name: "键盘"
		},
		{
			id: "01", name: "U盘"
		}
	])
});

module.exports = router;
