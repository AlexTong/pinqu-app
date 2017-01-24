cola(function (model,param) {
	model.describe("titbitVo", {
		provider: {
			url: App.prop("service.baseUrl") + "/titbit/get/" + param.id,
			success: function (self, arg) {
				var vo = arg.result;
				var mediaDom;
				if (vo.titbit.videoUrl) {
					mediaDom = $.xCreate({
						content: {
							class: "video-js vjs-default-skin",
							controls: true,
							tagName: "video",
							preload: "none",
							height: "240", "data-setup": "{}",
							poster: model.action("getAppImageUrl")(vo.titbit.videoPictureId),
							content: [
								{
									tagName: "source", src: vo.titbit.videoUrl, type: "video/mp4"
								}
							]
						}
					});
				}else{
					mediaDom=$.xCreate({
						tagName:"img",
						src: model.action("getAppImageUrl")(vo.titbit.videoPictureId)
					})
				}
				model.$("#media").append(mediaDom);
			}
		}
	});


	function toggleRating(type) {

		if (!App.prop("authenticated")) {
			App.goLogin()
			return;
		}


		var item = model.get("titbitVo");
		var targetId = item.get("titbit.id");
		var data = {targetId: targetId, type: "titbit", operationType: type};
		var thumbs = item.get(type);

		$.ajax(thumbs ? "/service/rating/delete" : "/service/rating/save", {
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(data)
		}).done(function (result) {
			item.set(type, !thumbs);
			var thumbsCount = item.get(type + "Count");

			if (!thumbs) {
				thumbsCount++
			} else if (thumbsCount > 0) {
				thumbsCount--
			}
			var msg = "";
			if (type === "collect") {
				msg = "收藏"
				if (thumbs) {
					msg = "取消收藏"
				}
			}
			if (!msg) {
				msg = "投票"
			}
			item.set(type + "Count", thumbsCount);
			cola.NotifyTipManager.success({
				message: "系统提示",
				description: msg + "成功！", showDuration: 3000
			})
		});
	}

	model.action({

		showBuy: function () {
			cola.widget("titbitBuyLayer").show();
		},
		hideBuy: function () {
			cola.widget("titbitBuyLayer").hide();
		},
		goBuy: function (url) {
			if (window.plus) {
				window.plus.runtime.openURL(url);
			} else {
				window.open(url, "_blank")
			}
			history.back();
		},
		toggleCollect: function () {
			toggleRating("collect")
		},
		toggleThumbsUp: function () {
			toggleRating("thumbsUp")
		},
		toggleThumbsDown: function () {
			toggleRating("thumbsDown")
		}
	})

});