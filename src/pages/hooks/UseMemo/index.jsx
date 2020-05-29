import React, { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, DatePicker, Select, Row, Col, List } from 'antd';
import moment from 'moment';
import UserCard from './components/UserCard';
import styles from './index.less';

function MyUseMemo(props) {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  // const userDtl = { age: count, name: 'fourfaith' };
  const userDtl = useMemo(() => {
    console.info('%c只有count变化时才需要重新计算，否则直接返回缓存值', 'color:tomato');
    return { age: count, name: 'fourfaith' };
  }, [count]);

  // 本组件中props
  // const {
  //   form: { getFieldDecorator },
  // } = props;

  return (
    <PageHeaderWrapper
      content={formatMessage({ id: 'useContext.new.page' })}
      className={styles.main}
      title={false}
    >
      <div>{`count=${count}`}</div>
      <div>{`count2=${count2}`}</div>
      <div>
        <Button type="danger" onClick={() => setCount(c => c + 1)}>
          count要变
        </Button>
        <Button type="primary" onClick={() => setCount2(c => c + 1)}>
          count2要变
        </Button>
      </div>
      <UserCard userDtl={userDtl} />
    </PageHeaderWrapper>
  );
}

export default MyUseMemo;
