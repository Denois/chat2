"use strict";

var request = require("request");

var TOKEN = "87592177:AAE0HqJkmdhwRwWiz2SXk9N2sRzmR2MSRo0";

var baseRequest = request.defaults({
    baseUrl: "https://api.telegram.org/bot" + TOKEN + "/"
});

var noop = function () { };
var callMethod = function (methodName, params, cb) {
    cb = cb || noop;
    var req = { uri: methodName, formData: params, method: "POST" };
    // как выяснилось, метод getMe не может обработать POST-запрос с multipart/form-data
    if (methodName === "getMe") {
        req.qs = params;
        delete req.formData;
    }
    baseRequest(req, function (err, response, body) {
        console.log(err, body);
        if (err) {
            return cb(err);
        }
        cb(err, JSON.parse(body));
    });
};

var getUpdatesOffset = 0;
var getUpdates = function (cb) {
    var params = { offset: getUpdatesOffset, timeout: 60 };
    callMethod("getUpdates", params, function (error, data) {
        if (data.result.length) {
            getUpdatesOffset = data.result[data.result.length - 1].update_id + 1;
        }
        cb(error, data);
    });
}

var logic = function (update) {
    var message = update.message;
    if (!message) {
        return;
    }

    if (message.text === "/ping") {
        return callMethod("sendMessage", { chat_id: message.chat.id, text: "pong" })
    }

    if (message.text === "/cat") {
        callMethod("sendChatAction", { chat_id: message.chat.id, action: "upload_photo" });
        return request("http://random.cat/meow", function (err, res, body) {
            console.log(body);
            if (body.substr(-4) === ".gif") {
                callMethod("sendDocument", {
                    chat_id: message.chat.id,
                    document: request(body)
                });
            } else {
                callMethod("sendPhoto", {
                    chat_id: message.chat.id,
                    photo: request(body)
                });
            }
        });
    }

    callMethod("sendMessage", { chat_id: message.chat.id, text: "I understand commands /ping and /cat" });
}

var runBot = function () {
    getUpdates(function (error, data) {
        if (!data.ok) {
            return console.log(data);
        }
        data.result.map(logic);
        runBot();
    });
};

callMethod("getMe", {}, function (error, data) {
    runBot();
});
