import { Op } from 'sequelize';
import { Article, UserFavoriteArticle } from '../db/model.js';

import { PERMISSION, controll } from '../utils/permissionControl.js';

export default class ArticleService {
    static async articleList(args) {
        const { keyword = '' } = args;

        try {
            const whereClause = {
                [Op.or]: [
                    { title: { [Op.like]: `%${keyword}%` } },
                    { tag: { [Op.like]: `%${keyword}%` } }
                ]
            };

            const res = await Article.findAll({
                where: whereClause
            });

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async addArticle(args) {
        const { title, content, tag, publisher } = args;

        try {
            const res = await Article.create({
                title,
                content,
                tag,
                publisher
            });

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async modifyArticle(args) {
        const { title, content, tag, publisher, id } = args;

        try {
            const res = await Article.update(
                {
                    title,
                    content,
                    tag,
                    publisher
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

    static async deleteArticle(args) {
        try {
            const { user_type, user_id, article_id } = args;
            const article = await Article.findOne({
                where: {
                    id: article_id
                }
            });

            if (!article) {
                return {
                    type: 0,
                    message: '文章不存在',
                    result: false
                };
            }

            const result = controll(
                PERMISSION.ADMIN,
                user_type,
                user_id,
                article.publisher
            );

            if (result) {
                const res = await Article.destroy({
                    where: {
                        id: article_id
                    }
                });

                return {
                    data: res,
                    result: true
                };
            } else {
                return {
                    type: 1,
                    message: '权限不足',
                    result: false
                };
            }
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async collecArticle(args) {
        const { user_id, article_id } = args;

        try {
            const item = await UserFavoriteArticle.findOne({
                user_id,
                article_id
            });

            if (!item) {
                const res = await UserFavoriteArticle.create({
                    user_id,
                    article_id
                });

                return res;
            }
            return true;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async collectedArticle(args) {
        const { user_id } = args;

        try {
            const temp = await UserFavoriteArticle.findAll({
                where: {
                    user_id
                }
            });

            const articleIDList = temp.map((item) => item.article_id);

            if (articleIDList.length) {
                const res = await Article.findAll({
                    where: {
                        id: {
                            [Op.or]: articleIDList
                        }
                    }
                });

                return res || [];
            } else {
                return [];
            }
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async cancelCollectArticle(args) {
        try {
            const { article_id, user_id, user_type } = args;
            const item = await UserFavoriteArticle.findOne({
                where: {
                    article_id,
                    user_id
                }
            });

            if (!item) {
                return {
                    type: 0,
                    message: '资源不存在',
                    result: false
                };
            }

            const result = controll(
                PERMISSION.ADMIN,
                user_type,
                user_id,
                item.user_id
            );

            if (result) {
                const res = await UserFavoriteArticle.destroy({
                    where: {
                        article_id,
                        user_id
                    }
                });

                return {
                    data: res,
                    result: true
                };
            } else {
                return {
                    type: 1,
                    message: '权限不足',
                    result: false
                };
            }
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async isCollectedArticle(args) {
        try {
            const { article_id, user_id } = args;

            const item = await UserFavoriteArticle.findOne({
                where: {
                    article_id,
                    user_id
                }
            });

            if (item) {
                return true;
            }

            return false;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }
}
