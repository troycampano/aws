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


    client.getSecretValue({ SecretId: secretName }, function (err, data) {

        if (err) {
            console.log("There was an error");
            console.log(err);
        }
        else {
            console.log("There was NO error");
        }


        var connection = mysql.createConnection({
            host: "cfst-3376-7a665921482eec9e938751c73e200b1-database-6x2etym2vsxp.cc79u6pi7wsh.us-east-1.rds.amazonaws.com",
            user: "username",
            password: "***********************",
            database: "example",
        });

        connection.query('show tables', function (error, results, fields) {
            if (error) {
                connection.destroy();
                throw error;
            } else {
                // connected!
                console.log("QUERY RESULT 01:");
                console.log(results);
                callback(error, results);
                connection.end(function (err) { callback(err, results); });
            }
        });


    });
};