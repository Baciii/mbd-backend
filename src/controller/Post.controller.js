import Joi from 'joi';
import PostService from '../service/post.js';
import apiResult from '../apiResult/index.js';
import { verifyToken } from '../utils/signToken.js';

class PostController {
    /** 获取岗位列表 支持模糊查询 */
    async getPost(ctx, next) {
        const { keyword = '' } = ctx.query || ctx.queryString;

        try {
            const res = await PostService.getPost({
                keyword
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

    /** 发布岗位 */
    async addPost(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            company: Joi.string().required(),
            post: Joi.string().required(),
            type: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
            contact: Joi.string().required(),
            description: Joi.string().optional(),
            publisher: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required()
        });

        try {
            await schema.validateAsync(request);
            const res = await PostService.addPost(request);

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

    /** 修改岗位 */
    async modifyPost(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            id: Joi.number().required(),
            company: Joi.string().required(),
            post: Joi.string().required(),
            type: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
            contact: Joi.string().required(),
            description: Joi.string().optional(),
            publisher: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required()
        });

        try {
            await schema.validateAsync(request);
            const res = await PostService.modifyPost(request);

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

    /** 删除岗位 */
    async deletePost(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            id: Joi.alternatives().try(Joi.string(), Joi.number()).required() // string or number
        });

        try {
            await schema.validateAsync(request);
            const res = await PostService.deletePost(request);

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

    /** 我发布的岗位 */
    async myPost(ctx, next) {
        const request = ctx.query || ctx.queryString;
        const tokenInfo = await verifyToken(ctx.headers.authorization.slice(7));

        const schema = Joi.object({
            id: Joi.alternatives().try(Joi.string(), Joi.number()).required() // string or number
        });

        try {
            await schema.validateAsync(request);
            const res = await PostService.myPost(request);

            ctx.status = 200;
            ctx.body = apiResult.apiSuccess(res);
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '删除失败',
                result: false
            };
        }
    }
}

export default new PostController();
