import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Button,
  Form,
  DatePicker,
  Select,
  Row,
  Col,
  List,
  message,
  Input,
  Tooltip,
  Icon,
} from 'antd';
import moment from 'moment';
import styles from './index.less';
import { frequencySelect } from './components/data';

let renderCount = 1;
const { Option } = Select;
const timeFormat = '';
const homes = [
  { name: '江西省', value: 'jiangxi' },
  { name: '江苏省', value: 'jiangsu' },
  { name: '浙江省', value: 'zhejiang' },
  { name: '福建省', value: 'fujian' },
];

const homeOption = homes.map(home => <Option key={home.value}>{home.name}</Option>);

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
  const initHometown = 'jiangxi';
  message.success(`初始化籍贯hometown：${initHometown}`, 6);
  return initHometown;
};

// 当前组件开始的地方
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
  // 展示useState的覆盖更新机制
  const [newPerson, setNewPerson] = useState({
    name: 'unknown',
    sex: 'unknown',
    age: 99,
    hometown: 'unknown',
  });

  // 响应年龄+1
  const changeAge = () => {
    setAge(prev => prev + 1);
    // message.success(`我是来修改年龄的，此时age=${age}`, 6);
  };

  // 响应时间修改
  const changeTime = (data, dataString) => {
    message.info(`最新时间：${data}`);
    message.info(`最新时间字符串形式：${dataString}`);
    setSelectTime(data);
  };

  // 响应家乡调整
  const changeHome = value => {
    message.success(`当前所选家乡为：${homes.find(el => el.value === value).name}`, 6);
    setNewPerson({ hometown: value });
    setHometown(value);
  };

  // 响应名称调整
  const changeName = e => {
    setName(e.target.value);
  };

  return (
    <React.Fragment>
      <div key="count">此时的计数器：{count}</div>
      <div className={styles.marginTop1rem}>
        <Button type="danger" onClick={() => setCount(count * 3)}>
          是时候翻3倍
        </Button>
      </div>
      <div key="name">此时你的名字：{name}</div>
      <div className={styles.marginTop1rem}>
        <Input
          placeholder="请输入你的名字"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={
            <Tooltip title="新名字输起来">
              <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
          style={{ width: '30%' }}
          onChange={changeName}
        />
      </div>
      <div key="age">当前年纪：{age}</div>
      <div className={styles.marginTop1rem}>
        <Button onClick={changeAge} type="primary">
          是时候长大1岁
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
          是时候变性了
        </Button>
      </div>
      <div key="time">此时的时间：{selectTime.format()}</div>
      <div className={styles.marginTop1rem}>
        <DatePicker onChange={changeTime} defaultValue={selectTime}></DatePicker>
      </div>
      <div key="home">最新家乡信息：{homes.find(el => el.value === hometown).name}</div>
      <div className={styles.marginTop1rem}>
        <Select defaultValue={hometown} onChange={changeHome}>
          {homeOption}
        </Select>
      </div>
      <div key="newPerson">
        {Object.entries(newPerson).reduce(
          (str, [k, v]) => `${str}<div></div>${k}=>${v}`,
          '新人信息：',
        )}
      </div>
    </React.Fragment>
  );
}

export default UseStateNew;
