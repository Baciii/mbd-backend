import { Op } from 'sequelize';
import { Inverview } from '../db/model.js';

export default class InterviewService {
    static async interviewList(args) {
        const { keyword = '', publisher } = args;

        try {
            const whereClause = {
                [Op.or]: [
                    { company: { [Op.like]: `%${keyword}%` } },
                    { post: { [Op.like]: `%${keyword}%` } }
                ]
            };

            if (publisher) {
                whereClause.publisher = publisher;
            }

            const res = await Inverview.findAll({
                where: whereClause
            });

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async addInterview(args) {
        const { company, post, content, isPublic, publisher } = args;

        try {
            const res = await Inverview.create({
                company,
                post,
                content,
                isPublic,
                publisher
            });

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async deleteInterview(args) {
        try {
            const res = await Inverview.destroy({
                where: args
            });

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async modifyInterview(args) {
        const { id, company, post, content, isPublic, publisher } = args;

        try {
            const res = await Inverview.update(
                {
                    company,
                    post,
                    content,
                    isPublic,
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

    static async myInterview(args) {
        const { id } = args;

        try {
            const res = await Inverview.findAll({
                where: {
                    publisher: id
                }
            });

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }
}
