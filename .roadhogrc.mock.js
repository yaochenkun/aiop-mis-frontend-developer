import { format, delay } from 'roadhog-api-doc';
import { PROXY_SERVER, PLATFORM_SERVER } from './src/common/config'

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

//代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 远程服务器配置
  // 1.MIS管理系统服务端
  'GET /api': PROXY_SERVER,
  'POST /api': PROXY_SERVER,
  'PUT /api': PROXY_SERVER,
  'DELETE /api': PROXY_SERVER,

  // 2.平台服务端（部署）
  'GET /restapi/*': PROXY_SERVER,
  'POST /restapi/*': PROXY_SERVER,
  'PUT /restapi/*': PROXY_SERVER,
  'DELETE /restapi/*': PROXY_SERVER,

  // // 2.平台服务端（调试）
  // 'GET /restapi/*': PLATFORM_SERVER,
  // 'POST /restapi/*': PLATFORM_SERVER,
  // 'PUT /restapi/*': PLATFORM_SERVER,
  // 'DELETE /restapi/*': PLATFORM_SERVER,
};

export default noProxy ? {} : delay(proxy, 1000);
