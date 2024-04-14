export const PERMISSION = {
    SUPER_ADMIN: 0,
    ADMIN: 1,
    TEMP: 2,
    USER: 3
};

/**
 *
 * @param {*} level 权限等级
 * @param {*} type 用户类型 一般从 TOKEN 中获取
 * @param {*} user_id 用户ID 一般从 TOKEN 中获取
 * @param {*} publisher_id 发布者ID
 * @returns 是否拥有相关权限
 */
export const controll = (level, type, user_id, publisher_id) => {
    if (
        Number(type) <= Number(level) ||
        Number(user_id) === Number(publisher_id)
    ) {
        return true;
    }

    return false;
};
