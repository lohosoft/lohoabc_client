import Config from "./config.js";

// const NetErrInfo = "请检查您的网络连接...";
function handle(errcode, errdata) {
	switch (errcode) {
		case Config.ErrCodeRequest:
			window.location.href = Config.QRCodeUrl;
			break;
		case Config.ErrCodeCache:
			window.location.href = Config.WechatLoginUrl;
			break;
	}
}

exports.handle = handle;
