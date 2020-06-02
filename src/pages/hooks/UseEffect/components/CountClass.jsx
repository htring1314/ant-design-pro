import React, { Component } from 'react';
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import styles from '../index.less';

export default class CountClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidUpdate() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 0);
  }

  changeCount = count => {
    this.setState({ count });
    console.info(`class组件count=${this.state.count}`);
    setTimeout(() => {
      console.info(`class组件setTimeout后count=${this.state.count}`);
    }, 0);
  };

  render() {
    const { count } = this.state;
    return (
      <div className={styles.paddingBottom1rem}>
        <p>Class=&gt;You clicked {count} times</p>
        <Button onClick={() => this.changeCount(count + 1)}>Class Click me</Button>
        <Button onClick={() => this.changeCount(count + 1)}>Class Click me</Button>
      </div>
    );
  }
}
