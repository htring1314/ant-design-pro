import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, DatePicker, Select, Row, Col, List } from 'antd';
import styles from './index.less';

function CssExp(props) {
  return (
    <PageHeaderWrapper
      content={formatMessage({ id: 'useState.new.page' })}
      className={styles.main}
      title={false}
    >
      <div className={styles.glassWrap}>
        <div className={`${styles.pubPosition} ${styles.wordWrap}`}></div>
        <p className={`${styles.pubPosition} ${styles.content}`}>模糊玻璃</p>
      </div>
    </PageHeaderWrapper>
  );
}

export default Form.create({})(CssExp);
