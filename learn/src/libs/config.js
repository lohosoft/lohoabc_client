exports.initialState = {
	reConnectCountDown: 0,
	// div show control
	optioning: false,
	testing: false,
	fetching: true,
	// for optioning div ===============
	//[{word:apple,url:"http://...",tran:"pingguo"}]
	optionsData: [],
	// ["banana","apple"]
	optionsWords: [],
	// for testing div=============
	testWord: "",
	testWordTrans: "",
	testWordImgUrl: "",
	testScore: 0,
	//[{index:33,word:apple,score:90}]
	testHis: []
};
// logger mark
// const DEV = true;
console.log("DEV is ", DEV);
if (!DEV) {
	console.log = function() {};
}

exports.hasWorker = true;
exports.ShowOptionsDiv = "ShowOptionsDiv";
exports.ShowTestDiv = "ShowTestDiv";
exports.ShowHelloDiv = "ShowHelloDiv";
exports.ReloadOptions = "ReloadOptions";

// url
// http://211.159.217.250:8090/pics/pep-banana-0.jpeg
exports.RootUrl = "https://www.lohosoft.cn/abc/";
exports.WordImgPath = "static/pics/";

exports.QRCodeUrl = "https://www.lohoabc.cn";
exports.WechatLoginUrl = "https://www.lohosoft.cn/api/abc/wechat/login/learn";
exports.apiRootUrl = "https://www.lohosoft.cn/api/abc/";
exports.apiLastWordUrl = "last_word";
exports.apiPostTestHisUrl = "insert_new_word_score";

exports.ErrCodeCache = 4030;
exports.ErrCodeRequest = 4040;
exports.ErrCodeDB = 4050;
exports.ErrCodeUserMemNotExist = 4060;
exports.ErrCodeNewUserMemExisted = 4070;
exports.ErrCodePostRequest = 4080;
exports.ErrCodeUid = 4090;
exports.ErrCodeWechat = 5000;
exports.ErrCodeApiConnectionTimeout = 5010;
exports.ErrCodeOverOptionImgGuessTime = 5020;
exports.ErrCodeUnknown = 8000;
exports.ErrCodeOverApiTryTime = 9000;
exports.apiGetTimeout = 3000;
exports.apiPostTimeout = 5000;
exports.MostPostTryTime = 5;
// guess img for word
exports.dev = DEV;
exports.WordImgGuessLimit = 8;
exports.OptionsImgsLimit = 4;
exports.queryNearWordsLimitation = 6;
exports.GotWordImg = "GotWordImg";
exports.GuessWordImgTimout = 1000;
exports.PrepareTransForWord = "PrepareTransForWord";
exports.AddNewOptionData = "AddNewOptionData";
exports.ReConnectCountDown = "ReConnectCountDown";

// click event
exports.ClickOnOptionImg = "ClickOnOptionImg";
exports.PostNewWordScore = "PostNewWordScore";
exports.optionLetterLimitTemporary = 4;
