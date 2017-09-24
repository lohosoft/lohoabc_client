exports.initialState = {
	// div show control
	optioning: false,
	testing: false,
	fetching: true,
	// for optioning div ===============
	//[{word:apple,url:"http://..."}]
	optionsImgs: [],
	// ["banana","apple"]
	optionsImgsWords: [],
	// for testing div=============
	testWord: "",
	testWordImgUrl: "",
	testScore: 0,
	//[{index:33,word:apple,score:90}]
	testHis: [{}]
};
// logger mark
const dev = true;
if (!dev) {
	console.log = function() {};
}

exports.hasWorker = true;
exports.ShowOptionsDiv = "ShowOptionsDiv";
exports.ShowTestDiv = "ShowTestDiv";
exports.ShowHelloDiv = "ShowHelloDiv";

// url
// http://211.159.217.250:8090/pics/pep-banana-0.jpeg
if (dev) {
	exports.RootUrl = "http://211.159.217.250:8090/";
	exports.WordImgPath = "pics/";
} else {
	exports.RootUrl = "http://www.lohosoft.cn/";
	exports.WordImgPath = "static/pics/";
}

// guess img for word
exports.dev = dev;
exports.WordImgGuessLimit = 8;
exports.OptionsImgsLimit = 4;
exports.queryNearWordsLimitation = 6;
exports.GotWordImg = "GotWordImg";
exports.GuessWordImgTimout = 1000;
exports.AddNewImgData = "AddNewImgData";
// click event
exports.ClickOnOptionImg = "ClickOnOptionImg";
exports.optionLetterLimitTemporary = 4;
