const Mongoose = require("mongoose");

const ReactionSchema = new Mongoose.Schema(
    {
        user: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Message",
            required: true,
        },
        kind: {
            type: String,
            required: true,
        },
    },
    {
        collection: "reactions",
    },
);

exports.Reaction = Mongoose.model("Reaction", ReactionSchema);