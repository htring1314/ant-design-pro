import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useCallback } from 'react';
import { Spin, Button, message } from 'antd';
// import axios from 'axios';
import moment from 'moment';
import CountClass from './components/CountClass';
import CountFunction from './components/CountFunction';
import styles from './index.less';

let componentCount = 0;

// 仅展示组件当前param
const handleOutClick = param => {
  console.info(`%c单击时，此时count=${param}`, 'color: #3190e8; font-size: 18px;');
};

export default function MyUseEffect(props) {
  componentCount += 1;
  // console.info(`当前组件执行次数：${componentCount}`);
  const [everyLoading, setEveryLoading] = useState(true);
  const [initLoading, setInitLoading] = useState(true);
  const [countLoading, setCountLoading] = useState(false);
  const [count, setCount] = useState(1);
  // 对象状态
  const [depObj, setDepObj] = useState({ count: 1, time: moment() });
  const [objLoading, setObjLoading] = useState(true);

  // 无依赖数组，则组件每次渲染，都会执行
  useEffect(() => {
    console.info(`组件每次渲染，都要执行，执行次数：${componentCount} 次`);
    setTimeout(() => {
      setEveryLoading(false);
    }, 500);
    return () => {
      console.info('组件每次渲染（除了首次渲染），都要销毁上一次的我');
    };
  });

  // 依赖数组为空，则仅在首次初始化时调用，后续rerender时不执行
  useEffect(() => {
    console.info('%c只在组件首次初始化时执行', 'color: #3190e8; font-size: 18px;');
    setTimeout(() => {
      setInitLoading(false);
    }, 500);
    return () => {
      console.info('直到组件销毁，才执行销毁');
    };
  }, []);

  // 依赖数组为空，则仅在首次初始化时调用，后续rerender时不执行；async返回的是一个promise，但是useeffect只允许什么都不返回或者返回一个清除函数
  // useEffect(async () => {
  //   message.info(`count发生变化组件rerender，count： ${count}`, 4);
  //   try {
  //     const result = await axios(
  //       'https://api.jisuapi.com/cidian/word?appkey=1c865fd974fa0dbb&word=好像',
  //     );
  //     message.info(`拼音为：${result.result.pinyin}`);
  //   } catch (error) {
  //     message.error('请求失败~');
  //   }
  //   return () => {
  //     message.warn(`重新render时就会销毁上一个useEffect，销毁时，count=${count}`, 4);
  //   };
  // }, []);

  // 此时即使设置count，但是拿到的还是之前的状态，依赖数组中数据类型为基本类型string、int、symbol等
  useEffect(() => {
    console.info(
      `%ccount发生变化组件rerender，count： ${count}`,
      'color: #3190e8; font-size: 18px;',
    );
    const fetchData = async () => {
      try {
        // const result = await axios(
        //   'https://api.jisuapi.com/cidian/word?appkey=1c865fd974fa0dbb&word=好像',
        // );
        console.info(`拼音为：${result.result.pinyin}`);
      } catch (error) {
        console.error('请求失败~');
      }
      setCountLoading(false);
    };
    fetchData();
    return () => {
      console.info(`重新render时就会销毁上一个useEffect，销毁时，count=${count}`);
    };
  }, [count]);

  // 依赖数组中存在对象类型数据
  useEffect(() => {
    console.info(
      `%cdepObj依赖effect执行时，depObj： ${JSON.stringify(depObj)}`,
      'color: #3190e8; font-size: 18px;',
    );
    setTimeout(() => {
      setObjLoading(false);
    }, 500);
    return () => {
      console.info(`重新render时就会销毁上一个useEffect，销毁时，depObj=${JSON.stringify(depObj)}`);
    };
  }, [depObj]);

  // 仅展示组件当前cout值
  const handleAlertClick = () => {
    console.info(`%c单击时，此时count=${count}`, 'color: #3190e8; font-size: 18px;');
  };

  // 仅展示组件当前cout值
  const handleClickUseCallback = useCallback(() => {
    console.info(`%c单击时，此时count=${count}`, 'color: #3190e8; font-size: 18px;');
  }, [count]);

  // 依赖数组中存在函数类型数据，组件的每次渲染所有的都是新的，函数每次属于当前渲染中的新函数
  // useEffect(() => {
  //   console.info(
  //     '%cfunction依赖effect执行时，handleAlertClick',
  //     'color: #3190e8; font-size: 18px;',
  //   );
  //   console.info(handleAlertClick);
  //   return () => {
  //     console.info('重新render时就会销毁上一个useEffect，销毁时，function=', handleAlertClick);
  //   };
  // }, [handleAlertClick]);

  // 依赖数组中存在函数类型数据，组件的每次渲染所有的都是新的，函数每次属于当前渲染中的新函数
  useEffect(() => {
    console.info('%cfunction依赖effect执行时，handleOutClick', 'color: #3190e8; font-size: 18px;');
    return () => {
      console.info('重新render时就会销毁上一个useEffect，销毁时，function=', handleOutClick);
    };
  }, [handleOutClick]);

  // 依赖数组中存在函数类型数据，组件的每次渲染所有的都是新的，函数每次属于当前渲染中的新函数
  useEffect(() => {
    console.info(
      '%cfunction依赖effect执行时，handleClickUseCallback',
      'color: #3190e8; font-size: 18px;',
    );
    return () => {
      console.info(
        '重新render时就会销毁上一个useEffect，销毁时，function=',
        handleClickUseCallback,
      );
    };
  }, [handleClickUseCallback]);

  // everyLoading变更，组件rerender
  const changeEveryLoading = () => {
    setEveryLoading(true);
  };

  // count变更，组件rerender
  const changeCount = () => {
    setCountLoading(true);
    setCount(count + 1);
  };

  // depObj变更，组件rerender
  const changeObj = () => {
    // 对象改变，重新渲染
    // setDepObj({ time: moment() });
    // 对象改变，但属性值不变
    setDepObj(prev => ({ ...prev }));
    // 对象改变，且属性值发生变化，重新渲染
    // setDepObj(prev => ({ ...prev, time: moment() }));
    // 对象并未改变，只是其中某个属性值变化，不会重新渲染组件
    // setDepObj(prev => {
    //   prev.count = 22;
    //   setObjLoading(true);
    //   return prev;
    // });
    // setTimeout(() => {
    //   setObjLoading(false);
    // }, 100);
    setObjLoading(true);
  };

  return (
    <PageHeaderWrapper content="这是一个useEffect！" className={styles.main} title={false}>
      <div className={styles.contentDiv}>
        {initLoading ? (
          <Spin spinning={initLoading} size="large"></Spin>
        ) : (
          <div className={styles.paddingBottom1rem}>
            <Button type="primary" onClick={changeCount} loading={countLoading}>
              更改状态count，此时count={count}
            </Button>
            <Button className={styles.marginLeftHalf} type="danger" onClick={handleAlertClick}>
              展示当前count
            </Button>
            <Button className={styles.marginLeftHalf} type="dashed" onClick={handleOutClick}>
              展示当前count(out)
            </Button>
            <Button
              className={styles.marginLeftHalf}
              type="primary"
              onClick={changeEveryLoading}
              loading={everyLoading}
            >
              更改bool值everyLoading，此时：{`${everyLoading}`}
            </Button>
            <Button
              className={styles.marginLeftHalf}
              type="danger"
              onClick={changeObj}
              loading={objLoading}
            >
              更改depObj
            </Button>
          </div>
        )}
      </div>
      <div className={styles.contentDiv}>
        <CountClass></CountClass>
        <CountFunction></CountFunction>
      </div>
    </PageHeaderWrapper>
  );
}
