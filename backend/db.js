const Mongoose = require("mongoose");

module.exports = async () => {
    try {
        const params = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await Mongoose.connect(
            process.env.MONGO_URL,
            params,
        );
        console.log("Connected to database.");
    }
    catch (error) {
        console.log(`Could not connect to database.`);
        console.log(error);
    }
}