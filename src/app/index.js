import Koa from 'koa';
// import KoaBody from 'koa-body';
import bodyParser from 'koa-bodyparser';
import router from '../router/index.js';
import cors from 'koa2-cors';
import jwt from 'koa-jwt';

import apiResult from '../apiResult/index.js';
import { secret } from '../utils/signToken.js';

const app = new Koa();
app.use(
    cors({
        origin: '*',
        maxAge: 2592000,
        credentials: true
    })
);

/** 需要 token 鉴权的路由若不传递/传错/失效 token 则返回 401 */
app.use(function (ctx, next) {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = apiResult.tokenError(err.message);
        } else {
            throw err;
        }
    });
});

/** 除 /api/user 开头的路由不需要 token 鉴权 */
app.use(
    jwt({ secret }).unless({
        path: [/^\/api\/user\/login/, /^\/api\/user\/register/, /^\/api\/test/]
    })
);
app.use(bodyParser());
app.use(router.routes());

export default app;
