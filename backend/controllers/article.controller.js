const catchAsync = require('../utils/catchAsync');
const imageUploader = require('../utils/imageUploader');

const { Article } = require('../models');

exports.storeImage = imageUploader('image', 'images/articles', {
    fileFor: 'article'
});

exports.getArticles = catchAsync(async (req, res) => {
    const articles = await Article.find().sort("-createdAt");
    return res.status(200).json({
        status: 'success',
        articles
    })
})

exports.getArticle = catchAsync(async (req, res) => {
    const article = await Article.findById(req.params.articleId);
    res.status(200).json({
        status: 'success',
        article
    })
})

exports.createArticle = catchAsync(async (req, res) => {
    const article = await Article.create({ ...req.body, image: req.file?.path });
    res.status(201).json({
        status: 'success',
        article
    });
})

exports.updateArticle = catchAsync(async (req, res) => {
    if (req.file?.path) req.body.image = req.file.path;
    const article = await Article.findByIdAndUpdate(req.params.articleId, req.body, {
        new: true,
        runValidation: true
    });
    res.status(200).json({
        status: 'success',
        article
    });
})

exports.deleteArticle = catchAsync(async (req, res) => {
    const article = await Article.findByIdAndDelete(req.params.articleId, req.body);
    res.status(204).json();
})