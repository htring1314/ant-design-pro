import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, DatePicker, Select, Row, Col, List } from 'antd';
import moment from 'moment';
import styles from './index.less';

function MyUseRef(props) {
  // 本组件中props
  // const {
  //   form: { getFieldDecorator },
  // } = props;
  const h1Ref = useRef();

  useEffect(() => {
    console.info('useRef:', h1Ref.current);
  }, []);

  return (
    <PageHeaderWrapper
      content={formatMessage({ id: 'useRef.new.page' })}
      className={styles.main}
      title={false}
    >
      <h1 ref={h1Ref}>我是大标题</h1>
    </PageHeaderWrapper>
  );
}

export default MyUseRef;
