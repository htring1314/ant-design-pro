import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Button, message } from 'antd';
import styles from './index.less';

export default () => {
  const [loading, setLoading] = useState(true);
  const [counting, setCounting] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    message.success('只在组件初始化时执行', 9);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      message.warn('组件销毁时，我才会销毁');
    };
  }, []);

  // 此时即使设置count，但是拿到的还是之前的状态
  useEffect(() => {
    message.info(`count发生变化，就要执行，count： ${count}`, 9);
    setTimeout(() => {
      setCounting(false);
    }, 500);
    return () => {
      message.warn(`我重新执行时就会销毁上一个useEffect，销毁时，count=${count}`, 9);
    };
  }, [count]);

  const handleAlertClick = () => {
    message.info(`单击时，此时count=${count}`, 9);
  };

  const changeLoading = () => {
    setCounting(true);
    setCount(count + 1);
  };

  return (
    <PageHeaderWrapper content="这是一个useEffect！" className={styles.main} title={false}>
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        {loading ? (
          <Spin spinning={loading} size="large"></Spin>
        ) : (
          <div>
            <Button type="primary" onClick={changeLoading} loading={counting}>
              此时count：{count}
            </Button>
            <Button className={styles.marginLeftHalf} type="danger" onClick={handleAlertClick}>
              点击一下
            </Button>
          </div>
        )}
      </div>
    </PageHeaderWrapper>
  );
};
