import { Op } from 'sequelize';
import { User } from '../db/model.js';
import xss from 'xss';
import { genPassword } from '../utils/crypto.js';
import { signToken } from '../utils/signToken.js';

export default class UserService {
    static async isRegister(args) {
        const { username } = args;
        if (username.trim()) {
            try {
                const res = await User.findAll({
                    where: {
                        username: args.username
                    }
                });

                if (res.length) {
                    return true;
                }
                return false;
            } catch (err) {
                throw Error(err.errors[0].message);
            }
        }
    }

    static async userList(args) {
        try {
            const res = await User.findAll();

            return res.map((item) => {
                return {
                    id: item.id,
                    username: item.username,
                    type: item.type
                };
            });
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async register(args) {
        try {
            const res = await User.create({
                username: xss(args.username),
                password: genPassword(args.password),
                type: args.type
            });

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async login(args) {
        const { username, password } = args;
        try {
            const user = await User.findOne({
                where: {
                    username
                }
            });
            if (user) {
                const tempPassword = genPassword(password);

                if (user.password === tempPassword) {
                    return {
                        id: user.id,
                        username: user.username,
                        type: user.type,
                        token: signToken(
                            {
                                ...user
                            },
                            '6h'
                        ),
                        result: true
                    };
                }
                return {
                    msg: '密码错误',
                    result: false
                };
            } else {
                return {
                    msg: '用户不存在',
                    result: false
                };
            }
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async modify(args) {
        const { id, type } = args;
        try {
            const res = await User.update(
                {
                    type
                },
                {
                    where: {
                        id
                    }
                }
            );

            return res[0] || 0;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async deleteUser(args) {
        const { id } = args;

        try {
            const res = await User.destroy({
                where: {
                    id
                }
            });

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async getPermission(args) {
        const { id } = args;
        try {
            const res = await User.findOne({
                where: {
                    id
                }
            });

            if (res) {
                return {
                    data: res.type,
                    result: true
                };
            }
            return {
                msg: '未查询到该用户',
                result: false
            };
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }
}
