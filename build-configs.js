var defaultConfig = {
	version: "0.0.1",
	packageName: "",
	contextPath: "/apps",
	htmlSuffix: ".html",
	language: "zh-Hans",
	currency: "￥"
};

var buildConfigs = {
	app: {
		serviceUrlPrefix: "/"
	}
};

for (var buildName in buildConfigs) {
	if (!buildConfigs.hasOwnProperty(buildName)) continue;
	var buildConfig = buildConfigs[buildName];
	for (var k in defaultConfig) {
		if (!defaultConfig.hasOwnProperty(k) || buildConfig[k] !== undefined) continue;
		buildConfig[k] = defaultConfig[k];
	}
}
module.exports = buildConfigs;