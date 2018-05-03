import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import styles from './style.less';

export default class CodeBlock extends React.Component {
  render() {
    return (
      <div className={styles.codeBlock}>
        <SyntaxHighlighter language="javascript" customStyle={{ background: 'transparent' }}>{this.props.data}</SyntaxHighlighter>
      </div>
    );
  }
}
