import Joi from 'joi';

import InterviewService from '../service/interview.js';
import apiResult from '../apiResult/index.js';
import { verifyToken } from '../utils/signToken.js';

class InterviewController {
    async interviewList(ctx, next) {
        const { keyword = '', publisher } = ctx.query || ctx.queryString;

        try {
            const res = await InterviewService.interviewList({
                keyword,
                publisher
            });

            ctx.status = 200;
            ctx.body = apiResult.apiSuccess(res);
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '查询失败',
                result: false
            };
        }
    }

    async addInterview(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            company: Joi.string().required(),
            post: Joi.string().required(),
            content: Joi.string().required(),
            isPublic: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required(),
            publisher: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required()
        });

        try {
            await schema.validateAsync(request);
            const res = await InterviewService.addInterview(request);

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

    async deleteInterview(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            id: Joi.alternatives().try(Joi.string(), Joi.number()).required() // string or number
        });

        try {
            await schema.validateAsync(request);
            const res = await InterviewService.deleteInterview(request);

            ctx.status = 200;
            if (res) {
                ctx.body = apiResult.apiSuccess(res);
            } else {
                ctx.body = apiResult.dataNotFound('岗位不存在');
            }
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '删除失败',
                result: false
            };
        }
    }

    async modifyInterview(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
            company: Joi.string().required(),
            post: Joi.string().required(),
            content: Joi.string().required(),
            isPublic: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required(),
            publisher: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required()
        });

        try {
            await schema.validateAsync(request);
            const res = await InterviewService.modifyInterview(request);

            ctx.status = 200;
            ctx.body = apiResult.apiSuccess(res);
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '修改失败',
                result: false
            };
        }
    }

    async myInterview(ctx, next) {
        try {
            const userInfo = await verifyToken(
                ctx.header['authorization'].slice(7)
            );

            const { id } = userInfo.dataValues;

            const res = await InterviewService.myInterview({
                id
            });

            ctx.status = 200;
            if (res) {
                ctx.body = apiResult.apiSuccess(res);
            } else {
                ctx.body = apiResult.dataNotFound();
            }
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '查询失败',
                result: false
            };
        }
    }
}

export default new InterviewController();
