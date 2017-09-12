exports.initialState = {
	// div show control
	optioning: false,
	testing: false,
	fetching: true,
	// for optioning div ===============
	//[{index:22,word:apple,url:"http://..."}]
	optionsImgs: [],
	optionsImgsIndex: [],
	// for testing div=============
	testWord: "",
	testWordIndex: 0,
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
exports.ShowOptionsDiv = "ShowOptionsDiv";
exports.ShowTestDiv = "ShowTestDiv";
exports.ShowHelloDiv = "ShowHelloDiv";

// url
exports.RootUrl = "http://211.159.217.250:8080/";
exports.WordImgPath = "wordimgs/thumb/";
exports.ApiGetOptionsUrl = "api/options/";

// guess img for word
exports.WordImgGuessLimit = 4;
exports.OptionsImgsLimit = 4;
exports.GotWordImg = "GotWordImg";
exports.GuessWordImgTimout = 1000;
exports.AddNewImgData = "AddNewImgData";
// click event
exports.ClickOnOptionImg = "ClickOnOptionImg";
exports.optionLetterLimitTemporary = 4;