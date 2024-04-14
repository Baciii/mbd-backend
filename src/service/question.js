import { Op } from 'sequelize';
import { Question, QuestionType, UserFavoriteQuestion } from '../db/model.js';
import seq from '../db/index.js';

import { PERMISSION, controll } from '../utils/permissionControl.js';

export default class QuestionService {
    static async questionList(args) {
        try {
            const res = await Question.findAll();

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async addQuestion(args) {
        try {
            const res = await Question.create(args);

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async deleteQuestion(args) {
        try {
            const res = await Question.destroy({
                where: args
            });

            await UserFavoriteQuestion.destroy({
                where: {
                    question_id: args.id
                }
            });

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async modifyQuestion(args) {
        const { id, question_stem, options, answer, type, tag } = args;
        try {
            const res = await Question.update(
                {
                    question_stem,
                    options,
                    answer,
                    type,
                    tag
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

    static async randomQuestion(args) {
        try {
            const res = await Question.findOne({
                where: args,
                order: seq.random()
            });

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async questionTypeList(args) {
        try {
            const res = await QuestionType.findAll();

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async addQuestionType(args) {
        const { type } = args;

        try {
            const exists = await QuestionType.findOne({
                where: {
                    type
                }
            });

            if (exists) {
                return {
                    msg: '类型已存在',
                    result: false
                };
            } else {
                const res = await QuestionType.create(args);

                return {
                    data: res,
                    result: true
                };
            }
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async collectQuestion(args) {
        const { user_id, question_id } = args;

        try {
            const item = await UserFavoriteQuestion.findOne({
                where: {
                    user_id,
                    question_id
                }
            });

            if (!item) {
                const res = await UserFavoriteQuestion.create({
                    user_id,
                    question_id
                });

                return res;
            }
            return true;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async collectedQuestion(args) {
        const { user_id } = args;

        try {
            const temp = await UserFavoriteQuestion.findAll({
                where: {
                    user_id
                }
            });

            const questionIDList = temp.map((item) => item.question_id);

            if (questionIDList.length) {
                const res = await Question.findAll({
                    where: {
                        id: {
                            [Op.or]: questionIDList
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

    static async cancelCollectQuestion(args) {
        try {
            const { question_id, user_id, user_type } = args;
            const item = await UserFavoriteQuestion.findOne({
                where: {
                    question_id,
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
                const res = await UserFavoriteQuestion.destroy({
                    where: {
                        question_id,
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

    static async isCollectedQuestion(args) {
        try {
            const { question_id, user_id } = args;

            const item = await UserFavoriteQuestion.findOne({
                where: {
                    question_id,
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
