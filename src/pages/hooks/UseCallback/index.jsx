import React, { useState, useEffect, useContext, createContext } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, DatePicker, Select, Row, Col, List } from 'antd';
import moment from 'moment';
import GlobalColor from '@/components/GlobalContext';
import SecondCount from './components/SecondCount';
import styles from './index.less';

export const TopContext = createContext();

function MyUseCallback(props) {
  const [count, setCount] = useState(0);
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
      <div>
        <h3>这是父组件{count}</h3>
        <Button type="danger" onClick={() => setCount(c => c + 1)}>点我+1</Button>
      </div>
      <GlobalColor>
        <TopContext.Provider value={{ count }}>
          <SecondCount />
        </TopContext.Provider>
      </GlobalColor>
    </PageHeaderWrapper>
  );
}

export default MyUseCallback;
