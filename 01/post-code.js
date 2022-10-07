var mysql = require('mysql');

var AWS = require('aws-sdk'),
    region = "us-east-1",
    secretName = "RDScredentials",
    secret,
    decodedBinarySecret;

var client = new AWS.SecretsManager({
    region: "us-east-1"
});

exports.handler = (event, context, callback) => {

    client.getSecretValue({SecretId: secretName}, function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            // Decrypts secret using the associated KMS CMK.
            // Depending on whether the secret is a string or binary, one of these fields will be populated.
            console.log("IN THE SECRET CODE");
            if ('SecretString' in data) {
                secret = data.SecretString;
            } else {
                let buff = new Buffer(data.SecretBinary, 'base64');
                decodedBinarySecret = buff.toString('ascii');
            }
        }

        var parse = JSON.parse(secret);
        var password = parse.password;

        var connection = mysql.createConnection({
            host: "<hostname>",
            user: "username",
            password: password,
            database: "example",
        });

        connection.query('show tables', function (error, results, fields) {
            if (error) {
                connection.destroy();
                throw error;
            } else {
                // connected!
                console.log("Query result:");
                console.log(results);
                callback(error, results);
                connection.end(function (err) { callback(err, results);});
            }
        });

    });
};