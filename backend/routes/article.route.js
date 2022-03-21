const { ArticleController } = require('../controllers');

const router = require('express').Router();

router
    .route('/')
    .get(ArticleController.getArticles)
    .post(ArticleController.storeImage, ArticleController.createArticle);

router
    .route('/:articleId')
    .get(ArticleController.getArticle)
    .patch(ArticleController.storeImage, ArticleController.updateArticle)
    .delete(ArticleController.deleteArticle)

module.exports = router;