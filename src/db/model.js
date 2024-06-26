import { DataTypes } from 'sequelize';
import seq from './index.js';

export const Question = seq.define(
    'question',
    {
        question_stem: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: '题干'
        },
        options: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '选项'
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '答案'
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '题目类型'
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '题目标签'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export const QuestionType = seq.define(
    'questionType',
    {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '题目类型'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export const Post = seq.define(
    'post',
    {
        company: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '公司'
        },
        post: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '岗位'
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '岗位类型'
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '投递方式'
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '描述'
        },
        publisher: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '发布人'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export const User = seq.define(
    'user',
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '用户名'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '密码'
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '用户类型'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export const Inverview = seq.define(
    'interview',
    {
        company: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '公司'
        },
        post: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '岗位'
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: '面经内容'
        },
        isPublic: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '是否公开'
        },
        publisher: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '发布人'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export const UserFavoriteArticle = seq.define(
    'user_favorite_article',
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '用户ID'
        },
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '文章ID'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export const UserFavoriteQuestion = seq.define(
    'user_favorite_question',
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '用户ID'
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '文章ID'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export const Article = seq.define(
    'article',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '文章标签'
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: '文章内容'
        },
        publisher: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '发布人'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

seq.sync(); // 同步数据库表

/** 强制同步(清库) */
// seq.sync({
//     force: true
// });
