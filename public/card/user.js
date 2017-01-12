cola(function (model) {
	$.get("/service/frame/current/user").done(function (result) {
		if (!result) {
			result = {}
		}
		model.set("user", result);
	});
	model.describe("myItems", {
		provider: {
			url: "/service/advertisement/my/list"
		}
	});

	model.$("#myTab >.item").tab()
	model.describe("collectList", {
		provider: {
			url: "/service/advertisement/my/collectList",
			success: function (self, arg) {
				var data = arg.result;

				if (data.length == 0) {
					model.set("collectListEmpty", true);
				}
			}
		}
	});
});