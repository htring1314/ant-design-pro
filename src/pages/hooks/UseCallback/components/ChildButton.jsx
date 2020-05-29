import React, { useState, useEffect, useContext, createContext } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, DatePicker, Select, Row, Col, List } from 'antd';
import moment from 'moment';
import styles from '../index.less';

const ChildButton = ({ onClickButton, children, type }) => {
  return (
    <div style={{ margin: '20px 20px' }}>
      <Button onClick={onClickButton} style={{ marginRight: '20px' }} type={type}>
        {children}
      </Button>
      <span>{Math.random()}</span>
    </div>
  );
};

export default React.memo(ChildButton);
