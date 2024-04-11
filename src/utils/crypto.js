/** password 加密 */

import crypto from 'crypto';

// 密钥
const SECRET_KEY = 'ax_d_milo_280383404.wtf!ob987536j*%1jg-_+ab2';

const md5 = (content) => {
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
};

export const genPassword = (password) => {
    const str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
};
