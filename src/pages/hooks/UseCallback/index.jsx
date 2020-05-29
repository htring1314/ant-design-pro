import React, { useState, useEffect, useContext, useCallback } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, DatePicker, Select, Row, Col, List } from 'antd';
import moment from 'moment';
import ChildButton from './components/ChildButton';
import styles from './index.less';

function MyUseCallback(props) {
  // 本组件中props
  // const {
  //   form: { getFieldDecorator },
  // } = props;

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const handleClickButton1 = () => {
    setCount1(count1 + 1);
  };

  const handleClickButton2 = useCallback(() => {
    // console.warn({ param });
    setCount2(c => c + count3);
  }, [count3]);

  const handleClickButton3 = useCallback(() => {
    setCount3(c => c + count1);
  }, [count1]);

  useEffect(() => {
    console.info('%c增加54一次，此后便不再执行', 'color:tomato');
    handleClickButton2(54);
  }, [handleClickButton2]);

  useEffect(() => {
    console.info(`%c增加34一次，此后便不再执行:${moment()}`, 'color:tomato');
    handleClickButton2(34);
  }, [handleClickButton2]);

  useEffect(() => {
    console.info(`%c只要count1变化，则函数handleClickButton3就认为不同：${moment()}`, 'color:blue');
    handleClickButton3();
  }, [handleClickButton3]);

  useEffect(() => {
    console.info(
      `%c每次渲染handleClickButton1都不同，无限循环：${moment()}`,
      'color:red;font-weight:bold',
    );
    handleClickButton1();
  }, []);

  return (
    <PageHeaderWrapper
      content={formatMessage({ id: 'useContext.new.page' })}
      className={styles.main}
      title={false}
    >
      <div>{`count1=${count1}`}</div>
      <div>{`count2=${count2}`}</div>
      <div style={{ marginBottom: '20px' }}>{`count3=${count3}`}</div>
      <ChildButton onClickButton={handleClickButton1}>count1变化</ChildButton>
      <ChildButton onClickButton={handleClickButton2}>count2变化</ChildButton>
    </PageHeaderWrapper>
  );
}

export default MyUseCallback;
