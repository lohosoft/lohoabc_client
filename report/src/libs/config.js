exports.initialState = {
	reConnectCountDown: 0,
	// div show control
	fetching: true,
	reporting: false,
	wordsRecords: []
};
// logger mark
// const DEV = true;
console.log("DEV is ", DEV);
if (!DEV) {
	console.log = function() {};
}

exports.hasWorker = true;
exports.ShowHelloDiv = "ShowHelloDiv";
exports.ShowReportDiv = "ShowReportDiv";
exports.PrepareReportData = "PrepareReportData";
exports.QRCodeUrl = "https://www.lohoabc.cn";
exports.WechatLoginUrl = "https://www.lohosoft.cn/api/abc/wechat/login/report";
exports.apiRootUrl = "https://www.lohosoft.cn/api/abc/";
exports.apiAllWordsUrl = "all_words";
exports.ErrCodeCache = 4030;
exports.ErrCodeRequest = 4040;
exports.ErrCodeDB = 4050;
exports.ErrCodePostRequest = 4080;
exports.ErrCodeUid = 4090;
exports.ErrCodeWechat = 5000;
exports.ErrCodeApiConnectionTimeout = 5010;
exports.ErrCodeOverOptionImgGuessTime = 5020;
exports.ErrCodeUnknown = 8000;
exports.ErrCodeOverApiTryTime = 9000;
exports.apiGetTimeout = 5000;
exports.dev = DEV;
exports.ReConnectCountDown = "ReConnectCountDown";
