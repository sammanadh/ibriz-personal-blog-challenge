const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Article must have a title."]
    },
    content: {
        type: String,
        required: [true, "Article must have content."]
    },
    image: String
}, {
    timestamps: true
})

module.exports = mongoose.model("Article", ArticleSchema)