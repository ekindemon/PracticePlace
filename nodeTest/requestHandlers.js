var querystring = require("querystring"),
    fs = require("fs");

function start(response, postData) {
    console.log("Request handler 'start' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}

function upload(response, request) {
    var form = new formidable.IncomingForm();
    form.uploadDir = 'upload';
    form.parse(request, function (error, fields, files) {
        fs.renameSync(files.upload.path, "upload/test.png");
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("received image url:");
    response.write("click to show image");
        response.end();
    });
}

function show(response, request) {
    fs.readFile("upload/test.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "image/png" });
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;