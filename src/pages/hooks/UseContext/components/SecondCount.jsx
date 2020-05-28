import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { TopContext } from '../index';
import { GlobalColorContext, UPDATE_COLOR } from '@/components/GlobalContext';
import ThirdCount from './ThirdCount';
import styles from '../index.less';

/**
 * 子组件
 * @param {这是子级} props
 */
function SecondCount(props) {
  const { count } = useContext(TopContext);
  const { color, dispatch } = useContext(GlobalColorContext);
  // console.info('color:', color);

  return (
    <div>
      <h3 style={{ color: `${color}` }}>这是子组件:{count}</h3>
      <Button type="primary" onClick={() => dispatch({ type: UPDATE_COLOR, color: 'red' })}>
        <span style={{ color: 'red' }}>变红</span>
      </Button>
      <Button type="ghost" onClick={() => dispatch({ type: UPDATE_COLOR, color: 'green' })}>
        <span style={{ color: 'green' }}>变绿</span>
      </Button>
      <ThirdCount />
    </div>
  );
}

export default SecondCount;
