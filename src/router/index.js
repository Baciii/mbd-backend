import Router from 'koa-router';

import User from '../controller/User.controller.js';
import Post from '../controller/Post.controller.js';
import Question from '../controller/Question.controller.js';
import Interview from '../controller/Interview.controller.js';
import Article from '../controller/Article.controller.js';

const router = new Router({
    prefix: '/api'
});

router.get('/', (ctx, next) => {
    ctx.body = {
        code: 0,
        msg: 'success',
        data: []
    };
});

router.get('/test', (ctx, next) => {
    ctx.body = {
        code: 0,
        msg: 'success',
        data: []
    };
});

/** User */
router.get('/user/userList', User.userList);
router.post('/user/register', User.register);
router.post('/user/login', User.login);
router.post('/user/modify', User.modify);
router.delete('/user/deleteUser', User.deleteUser);
// router.post('/user/feedback', User.feedback);

/** Post */
router.get('/getPost', Post.getPost);
router.post('/addPost', Post.addPost);
router.delete('/deletePost', Post.deletePost);
router.post('/modifyPost', Post.modifyPost);
router.get('/myPost', Post.myPost);

/** Question */
router.get('/questionList', Question.questionList);
router.post('/addQuestion', Question.addQuestion);
router.delete('/deleteQuestion', Question.deleteQuestion);
router.get('/randomQuestion', Question.randomQuestion);
router.post('/modifyQuestion', Question.modifyQuestion);
router.get('/questionTypeList', Question.questionTypeList);
router.post('/addQuestionType', Question.addQuestionType);
router.post('/collectQuestion', Question.collectQuestion);
router.get('/collectedQuestion', Question.collectedQuestion);
router.post('/cancelCollectQuestion', Question.cancelCollectQuestion);
router.get('/isCollectedQuestion', Question.isCollectedQuestion);

/** Interview */
router.get('/interviewList', Interview.interviewList);
router.post('/addInterview', Interview.addInterview);
router.delete('/deleteInterview', Interview.deleteInterview);
router.post('/modifyInterview', Interview.modifyInterview);
router.get('/myInterview', Interview.myInterview);

/** Article */
router.get('/articleList', Article.articleList);
router.post('/addArticle', Article.addArticle);
router.post('/modifyArticle', Article.modifyArticle);
router.delete('/deleteArticle', Article.deleteArticle);
router.post('/collectArticle', Article.collectArticle);
router.get('/collectedArticle', Article.collectedArticle);
router.post('/cancelCollectArticle', Article.cancelCollectArticle);
router.get('/isCollectedArticle', Article.isCollectedArticle);

export default router;
