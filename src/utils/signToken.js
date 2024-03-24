/** jwt 鉴权 */

import jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;

export const secret = 'ih872hg3f9u_dbewiqu.whdoiqw^|';

/**
 *
 * @param {*} data 加密的数据
 * @param {*} time token 有效时间
 * @returns
 */
export const signToken = (data, time) => {
    const token = sign(data, secret, {
        expiresIn: time
    });

    return token;
};

export const verifyToken = (token = '') => {
    return new Promise((resolve, reject) => {
        verify(token, secret, (error, decodedToken) => {
            if (error) {
                reject(error);
            } else {
                resolve(decodedToken);
            }
        });
    });
};
