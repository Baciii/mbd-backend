/** 解析启动参数 */

import arg from 'arg';

const args = arg({
    '--mode': String
});

export default args;
