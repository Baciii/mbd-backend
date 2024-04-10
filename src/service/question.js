import { Question, QuestionType } from '../db/model.js';
import seq from '../db/index.js';

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
}
