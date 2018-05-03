import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Menu, Card } from 'antd';
import Summary from './Summary';
import AbilityList from './AbilityList';
import AccessToken from './AccessToken';
import UseCase from './UseCase';
import ErrorCode from './ErrorCode';
import WordSeg from './WordSeg';
import WordPos from './WordPos';
import WordNer from './WordNer';
import DependencyParse from './DependencyParse';
import TextKeywords from './TextKeywords';
import TextSummaries from './TextSummaries';
import TextPhrases from './TextPhrases';
import Word2Vec from './Word2Vec';
import Word2Pinyin from './Word2Pinyin';
import Simplified2Traditional from './Simplified2Traditional';
import Traditional2Simplified from './Traditional2Simplified';
import WordSim from './WordSim';
import DocumentSim from './DocumentSim';
import NearestWords from './NearestWords';
import MotionClassify from './MotionClassify';
import CategoryClassify from './CategoryClassify';
import TextSuggester from './TextSuggester';
import FaceSim from './FaceSim';

const { Content, Sider } = Layout;

@connect(state => ({
  instruction: state.instruction,
}))
export default class Index extends React.PureComponent {
  getCurrentMenuItem() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    const ability = pathList[pathList.length - 1];
    return ability === 'instruction' ? 'summary' : ability;
  }
  getCurrentComponent() {
    const componentMap = {
      'summary': Summary,
      'ability-list': AbilityList,
      'access-token': AccessToken,
      'use-case': UseCase,
      'error-code': ErrorCode,
      'word-seg': WordSeg,
      'word-pos': WordPos,
      'word-ner': WordNer,
      'dependency-parse': DependencyParse,
      'text-keywords': TextKeywords,
      'text-summaries': TextSummaries,
      'text-phrases': TextPhrases,
      'word-2-vec': Word2Vec,
      'word-2-pinyin': Word2Pinyin,
      'simplified-2-traditional': Simplified2Traditional,
      'traditional-2-simplified': Traditional2Simplified,
      'word-sim': WordSim,
      'document-sim': DocumentSim,
      'nearest-words': NearestWords,
      'motion-classify': MotionClassify,
      'category-classify': CategoryClassify,
      'text-suggester': TextSuggester,
      'face-sim': FaceSim,
    };
    return componentMap[this.getCurrentMenuItem()];
  }

  handleMenuItemClick = (e) => {
    this.props.dispatch(routerRedux.push(`/instruction/${e.key}`));
  }

  render() {
    const curMenuKey = this.getCurrentMenuItem();
    const CurrentComponent = this.getCurrentComponent();
    return (
      <Layout style={{ marginLeft: -24, marginTop: -24, marginRight: -24 }}>
        <Card style={{ borderRight: 0 }} >
          <Sider>
            <Menu
              mode="inline"
              defaultSelectedKeys={[curMenuKey]}
              style={{ height: '100%', borderTop: 0 }}
              onClick={this.handleMenuItemClick}
            >
              <Menu.ItemGroup title="平台说明">
                <Menu.Item key="summary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;简介</Menu.Item>
                <Menu.Item key="ability-list">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接口能力</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="调用说明">
                <Menu.Item key="access-token">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;令牌获取</Menu.Item>
                <Menu.Item key="use-case">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;令牌使用</Menu.Item>
                <Menu.Item key="error-code">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;错误码</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="自然语言处理能力">
                <Menu.Item key="word-seg">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中文分词</Menu.Item>
                <Menu.Item key="word-pos">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;词性标注</Menu.Item>
                <Menu.Item key="word-ner">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;命名实体识别</Menu.Item>
                <Menu.Item key="dependency-parse">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;依存句法分析</Menu.Item>
                <Menu.Item key="text-keywords">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关键词提取</Menu.Item>
                <Menu.Item key="text-summaries">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;摘要提取</Menu.Item>
                <Menu.Item key="text-phrases">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;句子短语提取</Menu.Item>
                <Menu.Item key="word-2-vec">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;词向量生成</Menu.Item>
                <Menu.Item key="word-2-pinyin">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;汉字转拼音</Menu.Item>
                <Menu.Item key="simplified-2-traditional">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;简体转繁体</Menu.Item>
                <Menu.Item key="traditional-2-simplified">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;繁体转简体</Menu.Item>
                <Menu.Item key="word-sim">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;短文本相似度计算</Menu.Item>
                <Menu.Item key="document-sim">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文档相似度计算</Menu.Item>
                <Menu.Item key="nearest-words">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最相似短文本</Menu.Item>
                <Menu.Item key="text-suggester">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文本推荐</Menu.Item>
                <Menu.Item key="motion-classify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;情感倾向分析</Menu.Item>
                <Menu.Item key="category-classify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文本分类</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="图像处理能力">
                <Menu.Item key="face-sim">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人脸相似度计算</Menu.Item>
              </Menu.ItemGroup>
            </Menu>
          </Sider>
        </Card>
        <Card style={{ borderLeft: 0, width: '100%', borderRight: 0 }} >
          <Content style={{ height: '100%' }}>
            <CurrentComponent />
          </Content>
        </Card>
      </Layout>
    );
  }
}
