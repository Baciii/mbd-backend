import Router from 'koa-router';

import User from '../controller/User.controller.js';
import Post from '../controller/Post.controller.js';
import Question from '../controller/Question.controller.js';
import Interview from '../controller/Interview.controller.js';

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

/** User */
router.get('/user/userList', User.userList);
router.post('/user/register', User.register);
router.post('/user/login', User.login);
router.post('/user/modify', User.modify);
router.delete('/user/deleteUser', User.deleteUser);

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

/** Interview */
router.get('/interviewList', Interview.interviewList);
router.post('/addInterview', Interview.addInterview);
router.delete('/deleteInterview', Interview.deleteInterview);
router.post('/modifyInterview', Interview.modifyInterview);
router.get('/myInterview', Interview.myInterview);

export default router;
