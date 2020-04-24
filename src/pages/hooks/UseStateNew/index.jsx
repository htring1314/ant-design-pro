import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, DatePicker, Select, Row, Col, List, message } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { frequencySelect } from './components/data';

const timeFormat = '';
let renderCount = 1;

// 生成一个count值
const generateCount = () => {
  const initCount = Math.ceil(Math.random() * 1000);
  message.success(`初始化计数器count：${initCount}`, 6);
  return initCount;
};

// 生成一个性别sex值
const generateSex = () => {
  const initSex = 'Male';
  message.success(`初始化性别sex：${initSex}`, 6);
  return initSex;
};

// 生成一个姓名name值
const generateName = () => {
  const initName = 'Four-Faith';
  message.success(`初始化姓名name：${initName}`, 6);
  return initName;
};

// 生成一个籍贯值
const generateHometown = () => {
  const initHometown = 'BeiJing China';
  message.success(`初始化籍贯hometown：${initHometown}`, 6);
  return initHometown;
};

function UseStateNew(props) {
  message.warn(`组件渲染起来: ${moment()}，次数：${renderCount}`);
  renderCount += 1;

  const [age, setAge] = useState(12);
  // 惰性初始化，即初始值设为一个函数，rerender时不会再执行
  // rerender时  不  再调用初始值生成函数
  const [count, setCount] = useState(generateCount);
  // rerender时  不  再调用初始值生成函数
  const [sex, setSex] = useState(() => generateSex());
  // rerender时  会  再调用初始值生成函数
  const [name, setName] = useState(generateName());
  // rerender时  不  再调用初始值生成函数
  const [hometown, setHometown] = useState(generateHometown);
  const [selectTime, setSelectTime] = useState(() => moment().add(7, 'd'));

  const changeAge = () => {
    setAge(prev => prev + 1);
    message.success(`我是来修改年龄的，此时age=${age}`, 6);
  };

  const changeTime = (data, dataString) => {
    setSelectTime(data);
  };

  return (
    <React.Fragment>
      <div key="count">此时的计数器：{count}</div>
      <div className={styles.marginTop1rem}>
        <Button type="danger" onClick={() => setCount(count * 3)}>
          计数改变
        </Button>
      </div>
      <div key="age">当前年纪：{age}</div>
      <div className={styles.marginTop1rem}>
        <Button onClick={changeAge} type="primary">
          是时候长大了
        </Button>
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
      <div key="time">此时的时间：{selectTime.format()}</div>
      <div className={styles.marginTop1rem}>
        <DatePicker onChange={changeTime}></DatePicker>
      </div>
    </React.Fragment>
  );
}

export default UseStateNew;
