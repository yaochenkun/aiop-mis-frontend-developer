import React from 'react';
import { Table } from 'antd';
import styles from './style.less';

const columns = [{
  title: '能力名称',
  dataIndex: 'name',
  width: '20%',
  render: (_, record) => <a href={`/instruction/${record.url}`} className={styles.blue}>{record.name}</a>,
}, {
  title: '简要描述',
  dataIndex: 'description',
}];

const data = [{
  name: '中文分词',
  description: '切分出连续文本中的基本词汇序列（同时合并至词法分析接口）',
  url: 'word-seg',
}, {
  name: '词性标注',
  description: '为分词结果中的每个单词标注词性，包括名词、动词、形容词或其他词性',
  url: 'word-pos',
}, {
  name: '命名实体识别',
  description: '识别文本中具有特定意义的实体，主要包括人名、地名、机构名、专有名词等',
  url: 'word-ner',
}, {
  name: '依存句法分析',
  description: '依存句法分析接口可自动分析文本中的依存句法结构信息，利用句子中词与词之间的依存关系来表示词语的句法结构信息（如“主谓”、“动宾”、“定中”等结构关系），并用树状结构来表示整句的结构（如“主谓宾”、“定状补”等）',
  url: 'dependency-parse',
}, {
  name: '关键词提取',
  description: '提取出若干个代表输入文本语义内容的词汇或短语',
  url: 'text-keywords',
}, {
  name: '摘要提取',
  description: '从原始文档集中抽取一些具有代表性的文本片段构成摘要',
  url: 'text-summaries',
}, {
  name: '句子短语提取',
  description: '提取句子中的若干关键短语',
  url: 'text-phrases',
}, {
  name: '词向量生成',
  description: '查询词汇的词向量，实现文本的可计算',
  url: 'word-2-vec',
}, {
  name: '汉字转拼音',
  description: '将原始汉字文本逐字转换成拼音表示',
  url: 'word-2-pinyin',
}, {
  name: '简体转繁体',
  description: '将原始简体文本逐字转换成繁体表示',
  url: 'simplified-2-traditional',
}, {
  name: '繁体转简体',
  description: '将原始繁体文本逐字转换成简体表示',
  url: 'traditional-2-simplified',
}, {
  name: '短文本相似度计算',
  description: '判断两个短文本的相似度得分',
  url: 'word-sim',
}, {
  name: '文档相似度计算',
  description: '判断两个文档的相似度得分',
  url: 'document-sim',
}, {
  name: '最相似短文本',
  description: '选出词库中与输入词汇最相似的若干个词汇',
  url: 'nearest-words',
}, {
  name: '情感倾向分析',
  description: '对包含主观观点信息的文本进行情感极性类别（积极、消极、中性）的判断，并给出相应的置信度',
  url: 'motion-classify',
}, {
  name: '文本分类',
  description: '将输入文本按照不同领域进行归类（包括：科技、人文、娱乐、历史等类别）',
  url: 'category-classify',
}];

export default class AbilityList extends React.Component {
  render() {
    return (
      <div>
        <h1>接口能力</h1>
        <p>本平台提供的NLP算法能力分为基础算法能力、模型预测能力两类：</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;基础算法能力：包括词性标注、命名实体标注、关键字提取、词向量生成等。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;模型算法能力：通过对数据集进行训练得到模型后，根据输入值进行预测得到的。</p>
        <p>平台所有的能力如下表所示：</p>
        <Table columns={columns} dataSource={data} bordered pagination={false} size="middle" className={styles.infoTable} rowKey={record => record.param} />
      </div>
    );
  }
}
