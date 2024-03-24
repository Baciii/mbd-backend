import { Question } from '../db/model.js';
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
}
