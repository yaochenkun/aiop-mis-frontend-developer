import React from 'react';
import CodeBlock from './../../components/CodeBlock';


const ajaxInvokeCodeData = `$.ajax({
    url : 'http://aiop.bupt.com/restapi/nlp/v1/word_seg',
    type : 'POST',
    contentType: 'application/json',
    dataType : 'json',
    data: JSON.stringify({ text: '今天李华到学校旁的咖啡厅喝了两杯咖啡' })
    beforeSend: (request) => request.setRequestHeader('access_token',
                                                      'Your Access Token'),
    success : (response) => { ... },
    error: () => { ... },
});`;

const fetchInvokeCodeData = `fetch('http://aiop.bupt.com/restapi/nlp/v1/word_seg', {
  method: 'POST',
  headers: {'Content-Type': 'application/json',
            'access_token': 'Your Access Token'},
  body: JSON.stringify({ text: '今天李华到学校旁的咖啡厅喝了两杯咖啡' }),
}).then(response => { ... })`;

const retrofitInvokeCodeData1 = `// 能力调用服务
public interface RESTAPIService {
    @POST("/restapi/nlp/v1/word_seg")
    Call<String> wordSeg(@Body String text);
}`;
const retrofitInvokeCodeData2 = `Retrofit retrofit = new Retrofit.Builder()
                                .baseUrl("http://aiop.bupt.com/")
                                .addConverterFactory(GsonConverterFactory.create())
                                .build();

service = retrofit.create(RESTAPIService.class);
Call<String> call = service.wordSeg("今天李华到学校旁的咖啡厅喝了两杯咖啡");
call.enqueue(new Callback<String>() {
    public void onResponse(Response<String> response) { // reponse.body()... }
    public void onFailure(Throwable t) { ... }
});`;


export default class UseCase extends React.Component {
  render() {
    return (
      <div>
        <h1>令牌使用</h1>
        <p>获取到Access Token后即可将其保存至您的客户端应用的配置文件中。当需要用到本平台能力时，携带该Access Token并放至HTTP请求头部即可正确调用。</p>
        <p>根据您的客户端不同，这里给出几款常用HTTP请求工具的调用格式。</p>
        <h2>Ajax-浏览器端</h2>
        <CodeBlock data={ajaxInvokeCodeData} />

        <h2>Fetch-浏览器端</h2>
        <CodeBlock data={fetchInvokeCodeData} />

        <h2>Retrofit2 - Java客户端</h2>
        <CodeBlock data={retrofitInvokeCodeData1} />
        <CodeBlock data={retrofitInvokeCodeData2} />
      </div>
    );
  }
}
