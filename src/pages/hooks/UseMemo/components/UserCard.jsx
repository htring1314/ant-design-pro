import React, { useState, useEffect, useContext, createContext } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, DatePicker, Select, Row, Col, List } from 'antd';
import moment from 'moment';
import styles from '../index.less';

function UserCard(props) {
  const { userDtl } = props;
  console.info('子组件渲染了吗?', userDtl);
  // 本组件中props
  // const {
  //   form: { getFieldDecorator },
  // } = props;

  return (
    <div style={{ marginTop: '20px' }}>
      <div>子组件：</div>
      <div>{`年龄：${userDtl.age}`}</div>
      <div>{`名称：${userDtl.name}`}</div>
    </div>
  );
}

export default UserCard;
