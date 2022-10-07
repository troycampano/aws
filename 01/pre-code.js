var mysql = require('mysql');

exports.handler = (event, context, callback) => {

    var connection = mysql.createConnection({
        host: "<hostname>",
        user: "username",
        password: "**************",
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
};