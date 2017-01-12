var express = require("express");
var router = express.Router();

var $ = require("node-httpclient");
var target = "http://localhost:8080/service";

if (target) {
	router.all("*", function (req, res, next) {
		if (req.originalUrl === "/service/sys/info") {
			res.send({
				sysInfoRetrieved: false,
				availableVersion: "0.0.1",
				authInfo: {}
			});
			return
		}


		if (req.originalUrl === "/service/account/login") {
			console.log("====")
			$.ajax({
				async: false,
				type: req.method,
				url: "http://localhost:8080/login",
				data: req.body,
				headers: req.headers,
				complete: function (data, status, headers) {
					for (var k in headers) {
						if (headers.hasOwnProperty(k)) {
							res.setHeader(k, headers[k]);
						}
					}
					if (typeof data == "number") data += "";


					return res.status(status).send(data);
				}
			});

			return
		}


		$.ajax({
			async: false,
			type: req.method,
			url: target + req.url,
			data: req.body,
			headers: req.headers,
			complete: function (data, status, headers) {
				for (var k in headers) {
					if (headers.hasOwnProperty(k)) {
						res.setHeader(k, headers[k]);
					}
				}

				if(req.originalUrl === "/service/frame/login.success"){
					var authState = {};
					console.dir(data);
					if (data.status == "success") {
						authState = {
							authenticated: true,
							authInfo: {}
						};
						return res.status(status).send(authState);
					}

				}

				if (typeof data == "number") data += "";
				return res.status(status).send(data);
			}
		});
	});
}

module.exports = router;
