import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, DatePicker, Select, Row, Col, List, Input } from 'antd';
import moment from 'moment';
import Child from './components/Child';
import styles from './index.less';

function MyUseRef(props) {
  // 本组件中props
  // const {
  //   form: { getFieldDecorator },
  // } = props;
  const h1Ref = useRef();
  const inputRef = useRef();
  const childRef = useRef();

  useEffect(() => {
    console.info('useRef:', h1Ref.current);
  }, []);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const changeChildCount = () => {
    childRef.current.changeCount();
  };

  return (
    <PageHeaderWrapper
      content={formatMessage({ id: 'useRef.new.page' })}
      className={styles.main}
      title={false}
    >
      <h1 ref={h1Ref}>我是大标题</h1>
      <span>{`${h1Ref.current}`}</span>
      <Button type="primary" onClick={handleFocus} style={{ margin: '1rem 1rem' }}>
        点我聚焦input
      </Button>
      <Input ref={inputRef}></Input>
      <Child ref={childRef} />
      <Button type="danger" onClick={changeChildCount} style={{ margin: '1rem 1rem' }}>
        父组件调用子组件方法
      </Button>
      <h1 style={{ paddingTop: 40 }}>我是flex</h1>
      <div className={styles.flexParent1}>
        <div className={styles.flexItem1}>aquamarine</div>
        <div className={styles.flexItem2}>antiquewhite</div>
        <div className={styles.flexItem3}>tomato</div>
      </div>
      <div className={styles.flexParent2}>
        <div className={styles.flexItem1}>aquamarine</div>
        <div className={styles.flexItem2}>antiquewhite</div>
        <div className={styles.flexItem3}>tomato</div>
      </div>
    </PageHeaderWrapper>
  );
}

export default MyUseRef;
