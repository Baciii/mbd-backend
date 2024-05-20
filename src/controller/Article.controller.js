import Joi from 'joi';

import ArticleService from '../service/article.js';
import apiResult from '../apiResult/index.js';

import { verifyToken } from '../utils/signToken.js';

class ArticleController {
    async articleList(ctx, next) {
        const { keyword = '' } = ctx.query || ctx.queryString;

        try {
            const res = await ArticleService.articleList({
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

    async addArticle(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            title: Joi.string().required(),
            tag: Joi.array(),
            content: Joi.string().required(),
            publisher: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required()
        });

        try {
            await schema.validateAsync(request);
            const res = await ArticleService.addArticle(
                Object.assign({}, request, {
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

    async modifyArticle(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
            title: Joi.string().required(),
            tag: Joi.array(),
            content: Joi.string().required(),
            publisher: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required()
        });

        try {
            await schema.validateAsync(request);
            const res = await ArticleService.modifyArticle(
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
                message: err.message || '修改失败',
                result: false
            };
        }
    }

    async deleteArticle(ctx, next) {
        try {
            const request = ctx.request.body;

            const schema = Joi.object({
                id: Joi.alternatives()
                    .try(Joi.string(), Joi.number())
                    .required()
            });

            const userInfo = await verifyToken(
                ctx.header['authorization'].slice(7)
            );

            const { id, type } = userInfo.dataValues;

            await schema.validateAsync(request);
            const res = await ArticleService.deleteArticle({
                user_id: id,
                user_type: type,
                article_id: request.id
            });

            ctx.status = 200;
            if (res.result) {
                ctx.body = apiResult.apiSuccess(res.data);
            } else {
                if (res.type === 0) {
                    ctx.body = apiResult.dataNotFound(res.message);
                } else if (res.type === 1) {
                    ctx.body = apiResult.insufficientPermissions(res.message);
                }
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

    async collectArticle(ctx, next) {
        try {
            const request = ctx.request.body;

            const schema = Joi.object({
                article_id: Joi.alternatives()
                    .try(Joi.string(), Joi.number())
                    .required()
            });

            const userInfo = await verifyToken(
                ctx.header['authorization'].slice(7)
            );

            const { id } = userInfo.dataValues;

            await schema.validateAsync(request);
            const res = await ArticleService.collecArticle({
                article_id: request.article_id,
                user_id: id
            });

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

    async collectedArticle(ctx, next) {
        try {
            const userInfo = await verifyToken(
                ctx.header['authorization'].slice(7)
            );

            const { id } = userInfo.dataValues;

            const res = await ArticleService.collectedArticle({
                user_id: id
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

    async cancelCollectArticle(ctx, next) {
        try {
            const request = ctx.request.body;

            const schema = Joi.object({
                article_id: Joi.alternatives()
                    .try(Joi.string(), Joi.number())
                    .required()
            });

            const userInfo = await verifyToken(
                ctx.header['authorization'].slice(7)
            );

            const { id, type } = userInfo.dataValues;

            await schema.validateAsync(request);
            const res = await ArticleService.cancelCollectArticle({
                article_id: request.article_id,
                user_id: id,
                user_type: type
            });

            ctx.status = 200;
            if (res.result) {
                ctx.body = apiResult.apiSuccess(res.data);
            } else {
                if (res.type === 0) {
                    ctx.body = apiResult.dataNotFound(res.message);
                } else if (res.type === 1) {
                    ctx.body = apiResult.insufficientPermissions(res.message);
                }
            }
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '取消收藏失败',
                result: false
            };
        }
    }

    async isCollectedArticle(ctx, next) {
        try {
            const request = ctx.query || ctx.queryString;

            const schema = Joi.object({
                article_id: Joi.alternatives()
                    .try(Joi.string(), Joi.number())
                    .required()
            });

            const userInfo = await verifyToken(
                ctx.header['authorization'].slice(7)
            );

            const { id } = userInfo.dataValues;

            await schema.validateAsync(request);
            const res = await ArticleService.isCollectedArticle({
                article_id: request.article_id,
                user_id: id
            });

            ctx.status = 200;
            ctx.body = apiResult.apiSuccess(res);
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '系统错误',
                result: false
            };
        }
    }
}

export default new ArticleController();
