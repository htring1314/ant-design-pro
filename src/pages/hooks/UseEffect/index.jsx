import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Button, message } from 'antd';
import styles from './index.less';

let renderCount = 1;

export default function MyUseEffect(props) {
  renderCount += 1;
  const [everyLoading, setEveryLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [countLoading, setCountLoading] = useState(false);
  const [count, setCount] = useState(1);

  // 依赖数组为空，则仅在首次初始化时调用，后续rerender时不执行
  useEffect(() => {
    message.success(`组件每次渲染，都要执行，执行次数：${renderCount} 次`, 4);
    setTimeout(() => {
      setEveryLoading(false);
    }, 500);
    return () => {
      message.warn('everyLoading——组件销毁时，就销毁');
    };
  });

  // 依赖数组为空，则仅在首次初始化时调用，后续rerender时不执行
  useEffect(() => {
    message.success('只在组件初始化时执行', 4);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      message.warn('组件销毁时，我才会销毁');
    };
  }, []);

  // 此时即使设置count，但是拿到的还是之前的状态，依赖数组中数据类型为基本类型string、int、symbol等
  useEffect(() => {
    message.info(`count发生变化，就要执行，count： ${count}`, 4);
    setTimeout(() => {
      setCountLoading(false);
    }, 500);
    return () => {
      message.warn(`重新render时就会销毁上一个useEffect，销毁时，count=${count}`, 4);
    };
  }, [count]);

  const handleAlertClick = () => {
    message.info(`单击时，此时count=${count}`, 4);
  };

  const changeEveryLoading = () => {
    setEveryLoading(true);
  };

  const changeCount = () => {
    setCountLoading(true);
    setCount(count + 1);
  };

  return (
    <PageHeaderWrapper content="这是一个useEffect！" className={styles.main} title={false}>
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        {loading ? (
          <Spin spinning={loading} size="large"></Spin>
        ) : (
          <div style={{ paddingBottom: '1rem' }}>
            <Button type="primary" onClick={changeCount} loading={countLoading}>
              此时count：{count}
            </Button>
            <Button className={styles.marginLeftHalf} type="danger" onClick={handleAlertClick}>
              展示当前count
            </Button>
            <Button
              className={styles.marginLeftHalf}
              type="danger"
              onClick={changeEveryLoading}
              loading={everyLoading}
            >
              everyLoading
            </Button>
          </div>
        )}
      </div>
    </PageHeaderWrapper>
  );
}
