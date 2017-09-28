import Config from "./config.js";
import MyHandle from "./handle.js";

// const NetErrInfo = "请检查您的网络连接...";
const UnknownErrInfo = "非常抱歉，发生未知错误，请通过微信公众号与我们联系，我们会尽快修复，谢谢。";

function handle(errcode, errdata) {
	switch (errcode) {
		case Config.ErrCodeRequest:
			window.location.href = Config.QRCodeUrl;
			break;
		case Config.ErrCodeCache:
			window.location.href = Config.WechatLoginUrl;
			break;
		case Config.ErrCodeUnknown:
			alert(UnknownErrInfo);
			break;
		case Config.ErrCodeApiConnectionTimeout:
			MyHandle.handleTimeoutError(errdata);
			break;
		case Config.ErrCodeOverOptionImgGuessTime:
			// optin image guess time out
			break;
	}
}

exports.handle = handle;
