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
  // console.info(h1Ref.current, '----------------------');

  const handleScroll = () => {
    const { top } = h1Ref.current.getBoundingClientRect();
    if (top < 10) {
      console.info('快要不见了>>>>>>>>>>>>>>>', top);
    }
    // console.info('滚动舰艇>>>>>>>>>>>>>>');
  };

  useEffect(() => {
    console.info('useRef:', h1Ref.current.getBoundingClientRect());
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
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
    </PageHeaderWrapper>
  );
}

export default MyUseRef;
