import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, DatePicker, Select, Row, Col, List } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { frequencySelect } from './components/data';

const timeFormat = '';

function UseStateNew(props) {
  const generateCount = () => {
    console.log('初始化计数器');
    return Math.ceil(Math.random() * 1000);
  };

  const generateSex = () => {
    console.log('初始化性别');
    return 'Male';
  };

  const [age, setAge] = useState(12);
  // 惰性初始化，即初始值设为一个函数，rerender时不会再执行
  const [count, setCount] = useState(generateCount);
  // const [count, setCount] = useState(() => generateCount());
  // const [sex, setSex] = useState(generateSex());
  const [sex, setSex] = useState(generateSex);
  const [selectTime, setSelectTime] = useState(() => moment().add(7, 'd'));
  const [position, setPosition] = useState({ width: 10, height: 10, left: 0, top: 0 });

  const changeAge = () => {
    console.log('我是来修改年龄的');
    setAge(prev => prev + 1);
  };

  const changeTime = (data, dataString) => {
    setSelectTime(data);
  };

  return (
    <React.Fragment>
      <div key="age">当前年纪：{age}</div>
      <div className={styles.marginTop1rem}>
        <Button onClick={changeAge} type="primary">
          是时候长大了
        </Button>
      </div>
      <div key="count">此时的计数器：{count}</div>
      <div className={styles.marginTop1rem}>
        <Button type="danger" onClick={() => setCount(count * 3)}>
          计数改变
        </Button>
      </div>
      <div key="time">此时的时间：{selectTime.format()}</div>
      <div className={styles.marginTop1rem}>
        <DatePicker onChange={changeTime}></DatePicker>
      </div>
      <div key="sex">此时的性别：{sex}</div>
      <div className={styles.marginTop1rem}>
        <Button
          type="dashed"
          onClick={() =>
            setSex(prev => {
              if (prev === 'Male') {
                return 'Female';
              }
              return 'Male';
            })
          }
        >
          性别有变
        </Button>
      </div>
    </React.Fragment>
  );
}

export default UseStateNew;
