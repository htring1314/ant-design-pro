import React, { Component } from 'react';
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import styles from '../index.less';

/**
 * 子组件
 * @param {这是子级} props
 */
export default class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidUpdate() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
  }

  changeCount = () => {
    const { count } = this.state;
    let tmpCount = count;
    if (tmpCount === 0) {
      tmpCount += 6;
    } else {
      tmpCount *= 6;
    }
    this.setState({ count: tmpCount });
  };

  render() {
    const { count } = this.state;
    return (
      <div className={styles.paddingBottom1rem}>
        <p>子组件中count=&gt;You clicked {count} times</p>
        <Button onClick={() => this.changeCount()} style={{ margin: '1rem 1rem' }}>子组件直接调用</Button>
      </div>
    );
  }
}
