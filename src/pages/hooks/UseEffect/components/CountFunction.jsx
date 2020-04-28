import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import styles from '../index.less';

export default function CountFunction(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div className={styles.paddingBottom1rem}>
      <p>Function=&gt;You clicked {count} times</p>
      <Button onClick={() => setCount(count + 1)}>Function Click me</Button>
    </div>
  );
}
