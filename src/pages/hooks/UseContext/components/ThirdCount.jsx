import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { TopContext } from '../index';
import { GlobalColorContext } from '@/components/GlobalContext';
import styles from '../index.less';

/**
 * 子组件
 * @param {这是子级} props
 */
function ThirdCount(props) {
  const { count } = useContext(TopContext);
  const { color } = useContext(GlobalColorContext);

  return (
    <div>
      <h3 style={{ color }}>这是孙组件:{count}</h3>
    </div>
  );
}

export default ThirdCount;
