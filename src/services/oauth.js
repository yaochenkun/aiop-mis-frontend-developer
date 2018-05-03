import request from '../utils/request';

/*
* 认证请求
* 账户登录、手机登录、发送验证码、注册、找回密码、修改密码等
*/

// 账户登录
export async function verifyAccountLogin(params) {
  return request('/api/oauth/login/account', {
    method: 'POST',
    body: params,
  });
}

// 手机登录
export async function verifyMobileLogin(params) {
  return request('/api/oauth/login/mobile', {
    method: 'POST',
    body: params,
  });
}

// 发送手机登录验证码
export async function sendLoginCaptcha(params) {
  return request('/api/oauth/captcha/login', {
    method: 'POST',
    body: params,
  });
}

// 注册
export async function submitRegister(params) {
  return request('/api/oauth/register', {
    method: 'POST',
    body: params,
  });
}

// 发送注册验证码
export async function sendRegisterCaptcha(params) {
  return request('/api/oauth/captcha/register', {
    method: 'POST',
    body: params,
  });
}

// 发送修改手机验证码
export async function sendModifyMobileCaptcha(params) {
  return request('/api/oauth/captcha/modify_mobile', {
    method: 'POST',
    body: params,
  });
}

// 发送修改邮箱验证码
export async function sendModifyEmailCaptcha(params) {
  return request('/api/oauth/captcha/modify_email', {
    method: 'POST',
    body: params,
  });
}

// 找回密码提交
export async function verifyRetrieveCaptcha(params) {
  return request('/api/oauth/retrieve/verify', {
    method: 'POST',
    body: params,
  });
}

// 发送找回密码验证码
export async function sendRetrieveCaptcha(params) {
  return request('/api/oauth/captcha/retrieve', {
    method: 'POST',
    body: params,
  });
}

// 修改密码
export async function changePassword(params) {
  return request(`/api/oauth/password/${params.userId}`, {
    method: 'PUT',
    body: params,
  });
}
