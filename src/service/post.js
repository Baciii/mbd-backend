import { Op } from 'sequelize';
import { Post } from '../db/model.js';

export default class PostService {
    static async getPost(args) {
        const { keyword = '' } = args;

        try {
            const res = await Post.findAll({
                where: {
                    [Op.or]: [
                        { company: { [Op.like]: `%${keyword}%` } },
                        { post: { [Op.like]: `%${keyword}%` } }
                    ]
                }
            });

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async addPost(args) {
        const { company, post, type, contact, description, publisher } = args;
        try {
            const res = await Post.create({
                company,
                post,
                type,
                contact,
                description,
                publisher
            });

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async deletePost(args) {
        try {
            const res = await Post.destroy({
                where: {
                    id: args.id
                }
            });

            return res;
        } catch (err) {
            throw Error(err.errors[0].message);
        }
    }

    static async modifyPost(args) {
        try {
            const res = await Post.update(args, {
                where: {
                    id: args.id
                }
            });

            return res[0] || 0;
        } catch (err) {
            console.log(err);
            throw Error(err.errors[0].message);
        }
    }

    static async myPost(args) {
        const { id } = args;

        try {
            const res = await Post.findAll({
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
