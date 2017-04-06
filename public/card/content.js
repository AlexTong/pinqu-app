cola(function (model, param) {
	model.describe("advertisementVo", {
		provider: {
			url: App.prop("service.baseUrl") + "/advertisement/get/" + param.id,
			success: function (self, arg) {
				var vo = arg.result;
				var videoDom = $.xCreate({
					content: {
						class: "video-js vjs-default-skin",
						controls: true,
						tagName: "video",
						preload: "none",
						height: "240", "data-setup": "{}",
						poster: model.action("getAppImageUrl")(vo.advertisement.pictureId),
						content: [
							{
								tagName: "source", src: vo.advertisement.videoUrl, type: "video/mp4"
							}
						]
					}
				});
				var hPlus=window.App.getPlus();
				if (hPlus && hPlus.os.name !== "iOS") {
					videoDom = cola.xRender({
						tagName: "div",
						class: "native-play-container",
						content: [
							{
								tagName: "img",
								src: model.action("getAppImageUrl")(vo.advertisement.pictureId)
							},
							{
								tagName: "div",
								class: "play-dimmer",
								"c-onclick": "playVideo()",
								content: {
									tagName: "i",
									class: "icon video play outline"
								}
							}
						]
					}, model);
				}
				model.$("#video").append(videoDom);
			}
		}
	});


	function toggleRating(type) {
		if (!App.prop("authenticated")) {
			App.goLogin()
			return;
		}


		var item = model.get("advertisementVo");
		var targetId = item.get("advertisement.id");
		var data = {targetId: targetId, type: "advertisement", operationType: type};
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
		openExtendList: function () {
			localStorage.setItem("_currentAdvertisement", JSON.stringify(model.get("advertisementVo").toJSON()));
			App.open("/extends-list")
		},
		playVideo: function () {
			var Intent = plus.android.importClass("android.content.Intent");
			var Uri = plus.android.importClass("android.net.Uri");
			var main = plus.android.runtimeMainActivity();
			var intent = new Intent(Intent.ACTION_VIEW);
			var videoUrl = model.get("advertisementVo.advertisement.videoUrl");
			var uri = Uri.parse(videoUrl);
			intent.setDataAndType(uri, "video/*");
			main.startActivity(intent);
		},
		showBuy: function () {
			cola.widget("buyLayer").show();
		},
		hideBuy: function () {
			cola.widget("buyLayer").hide();
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