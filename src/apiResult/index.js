export default {
    apiSuccess(data = null, msg = 'success') {
        return {
            code: 0,
            message: msg,
            data,
            result: true
        };
    },

    // 10001 缺少参数
    missingParameters(msg) {
        return {
            code: 10001,
            message: msg,
            result: false
        };
    },

    // 10002 数据不存在
    dataNotFound(msg) {
        return {
            code: 10002,
            message: msg,
            result: false
        };
    },

    // 10003 参数错误
    badParameters(msg) {
        return {
            code: 10003,
            message: msg,
            result: false
        };
    },

    // 20001 任务未完成
    taskNotFinish(msg) {
        return {
            code: 20001,
            message: msg,
            result: false
        };
    },

    // 30001 任务失败
    taskFailed(msg) {
        return {
            code: 30001,
            message: msg,
            result: false
        };
    },

    // 50000 程序错误
    programError(msg = '系统错误，请联系管理员处理') {
        return {
            code: 50000,
            message: msg,
            result: false
        };
    },

    // 53306
    databaseError(msg = '数据库错误') {
        return {
            code: 53306,
            message: msg,
            result: false
        };
    },

    userExists() {
        return {
            code: 80000,
            message: '用户名已存在',
            result: false
        };
    },

    userNotExists() {
        return {
            code: 80001,
            message: '用户不存在',
            result: false
        };
    },

    loginError(msg = 'error') {
        return {
            code: 80001,
            message: msg,
            result: false
        };
    },

    tokenError(msg = 'Authentication Error') {
        return {
            code: 90000,
            message: msg,
            result: false
        };
    },

    insufficientPermissions() {
        return {
            code: 90001,
            message: '权限不足',
            result: false
        };
    }
};
