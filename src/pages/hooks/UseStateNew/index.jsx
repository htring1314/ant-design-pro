import React, { useState } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
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
import { DingtalkOutlined } from '@ant-design/icons';
import styles from './index.less';

let renderCount = 1;
const { Option } = Select;
const homes = [
  { name: '江西省', value: 'jiangxi' },
  { name: '江苏省', value: 'jiangsu' },
  { name: '浙江省', value: 'zhejiang' },
  { name: '福建省', value: 'fujian' },
];

// 生成一个count值
const generateCount = () => {
  const initCount = Math.ceil(Math.random() * 1000);
  // message.success(`初始化计数器count：${initCount}`);
  return initCount;
};

// 生成一个性别sex值
const generateSex = () => {
  const initSex = 'Male';
  // message.success(`初始化性别sex：${initSex}`);
  return initSex;
};

// 生成一个姓名name值
const generateName = () => {
  const initName = 'Four-Faith';
  // message.success(`初始化姓名name：${initName}`);
  return initName;
};

// 生成一个籍贯值
const generateHometown = () => {
  const initHometown = 'jiangxi';
  // 这个message要是放开，则会报警告：
  // message.success(`初始化籍贯hometown：${initHometown}`);
  return initHometown;
};

// 当前组件开始的地方
function UseStateNew(props) {
  // console.info(`组件渲染起来: ${moment()}，次数：${renderCount}`);
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
    message.success(`年龄变化之前我的年龄是：${age}`);
    setAge(prev => prev + 1);
    // 此时则是合并状态
    setNewPerson(prev => ({ ...prev, age: age + 1 }));
  };

  // 响应时间修改
  const changeTime = (data, dataString) => {
    message.info(`最新时间：${data}`);
    message.info(`最新时间字符串形式：${dataString}`);
    setSelectTime(data);
  };

  // 响应家乡调整
  const changeHome = value => {
    message.success(`当前所选家乡为：${homes.find(el => el.value === value).name}`);
    // 此时是覆盖状态
    setNewPerson({ hometown: value });
    setHometown(value);
  };

  // 响应名称调整
  const changeName = e => {
    const inputName = e.target.value || generateName();
    message.success(`当前名字为：${inputName}`);
    setName(inputName);
    // 此时是覆盖状态
    setNewPerson({ name: inputName });
  };

  const changeCount = () => {
    setCount(prev => 3 * prev);
    console.info('此时输出的count=', count);
    setTimeout(() => {
      console.info('通过setTimeout此时输出的count=', count);
    }, 100);
  };

  const homeOption = homes.map(home => <Option key={home.value}>{home.name}</Option>);

  // 展开用户信息
  const unfoldPerson = (person = {}) =>
    Object.entries(person).reduce(
      (str, [k, v]) => `${str}
  ${k} : ${v} `,
      '新人信息：',
    );
  // console.info(unfoldPerson(newPerson));

  return (
    <React.Fragment>
      <div>
        <DingtalkOutlined /> 此时的计数器：{count}
      </div>
      <div className={styles.marginTop1rem}>
        <Button type="danger" onClick={changeCount}>
          是时候翻3倍
        </Button>
      </div>
      <div>
        <DingtalkOutlined /> 此时你的名字：{name}
      </div>
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
      <div>
        <DingtalkOutlined /> 当前年纪：{age}
      </div>
      <div className={styles.marginTop1rem}>
        <Button onClick={changeAge} type="primary">
          是时候长大1岁
        </Button>
      </div>
      <div>
        <DingtalkOutlined /> 此时的性别：{sex}
      </div>
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
      <div>
        <DingtalkOutlined /> 此时的时间：{selectTime.format()}
      </div>
      <div className={styles.marginTop1rem}>
        <DatePicker onChange={changeTime} defaultValue={selectTime}></DatePicker>
      </div>
      <div>
        <DingtalkOutlined /> 最新家乡信息：{(homes.find(el => el.value === hometown) || {}).name}
      </div>
      <div className={styles.marginTop1rem}>
        <Select defaultValue={hometown} onChange={changeHome}>
          {homeOption}
        </Select>
      </div>
      <div>{unfoldPerson(newPerson)}</div>
    </React.Fragment>
  );
}

export default UseStateNew;
