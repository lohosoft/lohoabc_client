exports.initialState = {
	reConnectCountDown: 0,
	// div show control
	fetching: false,
	reporting: true,
	wordsRecords: [
		{
			id: 13,
			records: "[0,0,0,0,0,0,1,0]",
			ts: "2017-09-29T23:22:45.000Z",
			uid: "o5l94wEyxCNR7CqRXVgAeOq5z2dg",
			word: "turn left"
		},
		{
			id: 14,
			records: "[0,0,0,0]",
			ts: "2017-09-29T23:24:22.000Z",
			uid: "o5l94wEyxCNR7CqRXVgAeOq5z2dg",
			word: "roll"
		}
	]
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
exports.QRCodeUrl = "http://www.lohoabc.com";
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
