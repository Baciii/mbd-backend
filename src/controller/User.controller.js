import Joi from 'joi';

import UserService from '../service/user.js';
import apiResult from '../apiResult/index.js';
import { verifyToken } from '../utils/signToken.js';

class UserController {
    async userList(ctx, next) {
        // const request = ctx.query || ctx.queryString;
        // const schema = Joi.object({
        //     id: Joi.alternatives().try(Joi.string(), Joi.number()).required()
        // });

        try {
            // await schema.validateAsync(request);
            const tokenInfo = await verifyToken(
                ctx.headers?.authorization?.slice(7) || ''
            );

            const permission = await UserService.getPermission({
                id: tokenInfo.dataValues.id
            });
            if (permission.result) {
                if (Number(permission.data) < 2) {
                    const res = await UserService.userList();

                    ctx.status = 200;
                    ctx.body = apiResult.apiSuccess(res);
                } else {
                    ctx.status = 200;
                    ctx.body = apiResult.insufficientPermissions();
                }
            } else {
                ctx.status = 200;
                ctx.body = apiResult.userNotExists();
            }
        } catch (err) {
            console.log(123123123);
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '用户列表查询失败',
                result: false
            };
        }
    }

    async register(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            username: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required(),
            password: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required(),
            type: Joi.alternatives().try(Joi.string(), Joi.number())
        });

        try {
            await schema.validateAsync(request);

            const isRegister = await UserService.isRegister(request);
            if (isRegister) {
                ctx.body = apiResult.userExists();
            } else {
                const res = await UserService.register(
                    Object.assign({ type: 3 }, request)
                );

                ctx.status = 200;
                ctx.body = apiResult.apiSuccess(res);
            }
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '添加失败',
                result: false
            };
        }
    }

    async login(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            username: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required(),
            password: Joi.alternatives()
                .try(Joi.string(), Joi.number())
                .required()
        });

        try {
            await schema.validateAsync(request);

            const res = await UserService.login(request);

            if (res.result) {
                ctx.status = 200;
                ctx.body = apiResult.apiSuccess(
                    {
                        id: res.id,
                        token: res.token
                    },
                    '登录成功'
                );
            } else {
                ctx.status = 200;
                ctx.body = apiResult.loginError(res.msg);
            }
        } catch (err) {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: err.message || '添加失败',
                result: false
            };
        }
    }

    async modify(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            id: Joi.number().required(),
            type: Joi.alternatives().try(Joi.string(), Joi.number())
        });

        try {
            await schema.validateAsync(request);

            const res = await UserService.modify(request);

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
    async deleteUser(ctx, next) {
        const request = ctx.request.body;

        const schema = Joi.object({
            id: Joi.number().required()
        });

        try {
            await schema.validateAsync(request);

            const res = await UserService.deleteUser(request);

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
}

export default new UserController();
