cola(function (model) {
	var advertisement = JSON.parse(localStorage.getItem("_currentAdvertisement"))
	model.set("list",advertisement.extendList);
	model.set("user",advertisement.user);
});