exports.initialState = {
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

// url
// http://211.159.217.250:8090/pics/pep-banana-0.jpeg
if (DEV) {
	exports.RootUrl = "http://211.159.217.250:8090/";
	exports.WordImgPath = "pics/";
} else {
	exports.RootUrl = "http://www.lohosoft.cn/abc/";
	exports.WordImgPath = "static/pics/";
}
const apiRootUrl = "https://www.lohosoft.cn/api/abc/";
const apiLastWordUrl = "last_word";
const apiPostTestHisUrl = "insert_new_word";

const ErrCodeCache = 4030;
const ErrCodeRequest = 4040;
const ErrCodeDB = 4050;
const ErrCodeUserMemNotExist = 4060;
const ErrCodeNewUserMemExisted = 4070;
const ErrCodePostRequest = 4080;
const ErrCodeUid = 4090;
const ErrCodeWechat = 5000;
const DBErrInfo = "";
const FatalErrInfo = "";
const NetErrInfo = "请检查您的网络连接...";
exports.NetErrInfo = NetErrInfo;
exports.DBErrInfo = DBErrInfo;
exports.FatalErrInfo = FatalErrInfo;
exports.ErrCodeCache = ErrCodeCache;
exports.ErrCodeRequest = ErrCodeRequest;
exports.ErrCodeDB = ErrCodeDB;
exports.ErrCodeUserMemNotExist = ErrCodeUserMemNotExist;
exports.ErrCodeNewUserMemExisted = ErrCodeNewUserMemExisted;
exports.ErrCodePostRequest = ErrCodePostRequest;
exports.ErrCodeUid = ErrCodeUid;
exports.ErrCodeWechat = ErrCodeWechat;

exports.ApiPostTestHisUrl = apiRootUrl + apiPostTestHisUrl;

// guess img for word
exports.dev = DEV;
exports.WordImgGuessLimit = 8;
exports.OptionsImgsLimit = 4;
exports.queryNearWordsLimitation = 6;
exports.GotWordImg = "GotWordImg";
exports.GuessWordImgTimout = 1000;
exports.PrepareTransForWord = "PrepareTransForWord";
exports.AddNewOptionData = "AddNewOptionData";
// click event
exports.ClickOnOptionImg = "ClickOnOptionImg";
exports.SaveTestHis = "SaveTestHis";
exports.optionLetterLimitTemporary = 4;
