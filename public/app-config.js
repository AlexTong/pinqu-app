/* 系统默认值 */

/* 频道 */
App.channel({
	path: "/home",
	icon: "home",
	title: "首页"
});
/* 频道 */
App.channel({
	path: "/hot",
	icon: "lightning",
	title: "热门"
});
/* 频道 */
App.channel({
	path: "/original",
	icon: "diamond",
	title: "原创"
});
/* 频道 */
App.channel({
	path: "/user",
	icon: "user",
	title: "我的",
	authRequired: true
});
/* 路由 */
App.router({
	path: "/login",
	class: "free",
	animation: "slide down",
	authRequired: false,
	htmlUrl: "shell/account/login"
});
App.router({
	path: "/forgot-password1",
	type: "iFrame",
	htmlUrl: "shell/account/forgot-password1"
});
App.router({
	path: "/forgot-password2",
	type: "iFrame",
	htmlUrl: function () {
		return "shell/account/forgot-password2" + location.search
	}
});
App.router({
	path: "/new-password",
	type: "iFrame",
	htmlUrl: function () {
		return "shell/account/new-password" + location.search
	}
});
App.router({
	path: "/register",
	class: "open",
	authRequired: false,
	htmlUrl: "shell/account/register"
});
App.router({
	path: "/set-password",
	type: "iFrame",
	htmlUrl: "shell/account/set-password"
});

/* 路由 */
App.router({
	path: "/content/:id",
	class: "free",

	htmlUrl: "/card/content",
	title: "内容"
});

