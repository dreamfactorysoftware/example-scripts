// We need a way to convert js date to mysql date format.
// That's what the following two functions do.

function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

var toMysqlFormat = function (x) {
    return x.getUTCFullYear() + "-" + twoDigits(1 + x.getUTCMonth()) + "-" + twoDigits(x.getUTCDate()) + " " + twoDigits(x.getUTCHours()) + ":" + twoDigits(x.getUTCMinutes()) + ":" + twoDigits(x.getUTCSeconds());
};

var timelapse = 5; // how many minutes to count

var threshold = 1000; // how many api calls are allowed

var query = "timestamp%3c" + toMysqlFormat(new Date(Date.now() - timelapse * 60000));

result = platform.api.get("db/_table/TransactionHistory?filter=(" + query + ")");

if (result.content.resource.length >= threshold) {

    var email = {

        "to": [
            {
                "name": "John Doe",
                "email": "johndoe@mailinator.com"
            }
        ],
        "subject": "Usage alert",
        "body_text": "API usage has exceeded the alert threshold.",
        "from_name": "John Doe",
        "from_email": "johndoe@mailinator.com",
        "reply_to_name": "John Doe",
        "reply_to_email": "johndoe@mailinator.com"
    };

    platform.api.post("email", email);
}
