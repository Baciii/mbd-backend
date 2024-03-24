import QuestionService from '../service/question.js';
import apiResult from '../apiResult/index.js';
import Joi from 'joi';

class QuestionController {
    async questionList(ctx, next) {
        try {
            const res = await QuestionService.questionList();

            ctx.status = 200;
            ctx.body = apiResult.apiSuccess(res);
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '添加失败',
                result: false
            };
        }
    }

    /** 新增题目 */
    async addQuestion(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            question_stem: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required(),
            options: Joi.array().required(),
            answer: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required(),
            type: Joi.string().required(),
            tag: Joi.array()
        });

        try {
            await schema.validateAsync(request);
            const res = await QuestionService.addQuestion(
                Object.assign({}, request, {
                    options: JSON.stringify(request.options),
                    tag: JSON.stringify(request.tag)
                })
            );

            ctx.status = 200;
            ctx.body = apiResult.apiSuccess(res);
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '添加失败',
                result: false
            };
        }
    }

    /** 删除题目 */
    async deleteQuestion(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            id: Joi.alternatives().try(Joi.string(), Joi.number()).required()
        });

        try {
            await schema.validateAsync(request);

            const res = await QuestionService.deleteQuestion(request);

            ctx.status = 200;
            if (res) {
                ctx.body = apiResult.apiSuccess(res, '删除成功');
            } else {
                ctx.body = apiResult.dataNotFound('题目不存在');
            }
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '题目删除失败',
                result: false
            };
        }
    }

    async modifyQuestion(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
            question_stem: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required(),
            options: Joi.array().required(),
            answer: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required(),
            type: Joi.string().required(),
            tag: Joi.array()
        });

        try {
            await schema.validateAsync(request);
            const res = await QuestionService.modifyQuestion(
                Object.assign({}, request, {
                    options: JSON.stringify(request.options),
                    tag: JSON.stringify(request.tag)
                })
            );

            ctx.body = apiResult.apiSuccess(res, '修改成功');
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '题目删除失败',
                result: false
            };
        }
    }

    /** 随机出题 */
    async randomQuestion(ctx, next) {
        const request = ctx.query || ctx.queryString;

        const schema = Joi.object({
            type: Joi.string().required()
        });

        try {
            await schema.validateAsync(request);

            const res = await QuestionService.randomQuestion(request);

            ctx.status = 200;
            if (res) {
                ctx.body = apiResult.apiSuccess(res);
            } else {
                ctx.body = apiResult.dataNotFound('题目不存在');
            }
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '题目获取失败',
                result: false
            };
        }
    }
}

export default new QuestionController();