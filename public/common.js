App.prop({
	language: "zh",
	appTitle: "Cola-Shell",
	defaultAuthRequired: false,
	"service.baseUrl": "service",
	"service.proxy": "http://192.168.43.231:8080",
	//"service.login": "/login",
	//REPLACE_START
	// 开发状态下的默认值，在Build时此段内容将被替换
	liveMessage: false,
	domainRegExp: /^https*:\/\/www\.cola-shell\.com\//,
	//REPLACE_END
});

if (cola) {
	cola.defaultAction("getAppImageUrl", function (image) {
		if (!image) {
			return "/resources/images/white-image.png"
		}

		//return App.prop("service.proxy") + "/service/picture/download?fileId=" + image
		return "/" + image
	});
	cola.defaultAction("getUserName", function (user) {
		if (!user) return "";
		return user.get("nickName") || user.get("username")
	});
	cola.defaultAction("historyBack", function () {
		history.back();
	});
	$.ajax("/service/code/get/codes?kinds=perception,commodity_class", {
		async: false
	}).done(function (result) {
		for (var type in result) {
			if (result.hasOwnProperty(type)) {
				cola.util.dictionary(type, result[type]);
			}
		}
	});


}


