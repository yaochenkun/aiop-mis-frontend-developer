import React from 'react';
import { Alert } from 'antd';
import CodeBlock from './../../components/CodeBlock';

const requestAccessTokenData = `{
    "grant_type": "client_credentials" // 授权类型
    "client_id": "Va5yQRHlA4Fq4eR3LT0vuXV4" // API Key
    "client_secret": "0rDSjzQ20XUj5itV7WRtznPQSzr5pVw2" // Secret Key
}`;

const responseSuccessAccessTokenData = `{
    "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0Ijo", // 访问令牌
    "refresh_token": "OiIxLzQwZmUwZGYyODNhYTU1ZjgyMGIyOWJkNyIsImlz", // 更新令牌
    "expires_in": 2592000000, // 有效时长ms
    "scope": "public wise_adapt", // 权限范围
    "session_key": "9mzdDZXu3dENdFZQurfg0Vz8slgSgvvOAUebNFzyzcpQ5EnbxbF",
    "session_secret": "dfac94a3489fe9fca7c3221cbf7525ff"
}`;

const responseFailureAccessTokenData = `{
    "error_code": "102", // 错误码
    "error_msg": "invalid client id" // 错误描述
}`;

export default class AccessToken extends React.Component {
  render() {
    return (
      <div>
        <h1>令牌获取</h1>

        <h2>鉴权认证机制</h2>
        <p>本平台的能力主要针对HTTP API调用者，采用OAuth2.0授权调用开放API，调用API时必须在HTTP请求头部带上accesss_token参数。要生成Access Token需要先获取API Key和Secret Key，流程参见下述。</p>

        <h2>获取API Key和Secret Key</h2>
        <h3>注册平台账户</h3>
        <p>进入本平台门户网站进行账户注册，成为合法的第三方应用开发者。注册成功后，通过账户名/密码或手机/验证码登录系统，进入<a href="/app/creation">应用管理-创建应用</a>。</p>

        <h3>创建应用</h3>
        <p>在该页面中填写应用的名称、类型、应用平台、描述，并为其选择需要的接口能力，点击确认后完成创建。</p>

        <h3>保存密钥</h3>
        <p>创建完成后，可返回<a href="/app/list">应用列表</a>查看刚才创建好的应用信息，表格中的API Key和Secret Key列标识了应用的鉴权信息。</p>
        <Alert message="请勿泄露应用的API Key和Secret Key" type="warning" showIcon />

        <h2 style={{ marginTop: 10 }}>生成Access Token</h2>
        <h3>请求下发</h3>
        <p>通过向授权服务器地址：http://aiop.bupt.com/api/oauth/access_token发送请求（推荐使用POST），并在请求头部带上以下认证参数：</p>
        <CodeBlock data={requestAccessTokenData} />

        <h3>鉴权成功</h3>
        <p>若认证参数正确则生成access_token并下发，例如：</p>
        <CodeBlock data={responseSuccessAccessTokenData} />

        <h3>鉴权失败</h3>
        <p>若认证参数错误则返回错误信息，例如API Key不正确：</p>
        <CodeBlock data={responseFailureAccessTokenData} />
        <p>详细认证错误码及描述请见<a href="/instruction/error-code">错误码</a>。</p>
      </div>
    );
  }
}
