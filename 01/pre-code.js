var mysql = require('mysql');

exports.handler = (event, context, callback) => {

    var connection = mysql.createConnection({
        host: "cfst-3376-4a653d299a0c69a84b6afb96539db29-database-ozkg2lrhwkkj.cjqqbndqfeyb.us-east-1.rds.amazonaws.com",
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