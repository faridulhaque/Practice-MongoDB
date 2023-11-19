const { MongoClient } = require("mongodb");
require("dotenv").config();



const client = new MongoClient("mongodb+srv://faridulhaquemurshed:sXY9hXP4Za1sH4jk@cluster0.nffl8uk.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



let dbConnection;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db("web-yapar")
            console.log("Successfully connected to MongoDB.");

            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    },

};