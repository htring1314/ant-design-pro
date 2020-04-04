import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Button } from 'antd';
import styles from './index.less';

export default () => {
  const [loading, setLoading] = useState(true);
  const [couting, setCouting] = useState(false);
  const [count, setCount] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [count]);

  const changeCout = () => {
    setCouting(true);
    setTimeout(() => {
      setCount(prev => prev + 1);
      setCouting(false);
      setLoading(true);
    }, 1000);
  };

  return (
    <PageHeaderWrapper content="这是一个useEffect！" className={styles.main} title={false}>
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        {loading ? (
          <Spin spinning={loading} size="large"></Spin>
        ) : (
          <Button type="primary" onClick={() => changeCout()} loading={couting}>
            此时count：{count}
          </Button>
        )}
      </div>
    </PageHeaderWrapper>
  );
};
