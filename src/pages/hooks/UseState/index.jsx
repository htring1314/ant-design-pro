import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Button, Form, TimePicker } from 'antd';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

function UseState(props) {
  const {
    form: { getFieldDecorator },
  } = props;
  const [submiting, setSubmiting] = useState(false);
  const [count, setCount] = useState(1);
  useEffect(() => {}, []);

  const handleSubmit = e => {
    console.log('sssss');
    setSubmiting(true);
    const { form } = props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        setTimeout(() => {
          setSubmiting(false);
        }, 1000);
      }
    });
  };

  const manSubmit = () => {
    setSubmiting(true);
    const { form } = props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        setTimeout(() => {
          setSubmiting(false);
        }, 1000);
      }
    });
  };

  return (
    <PageHeaderWrapper
      content="这是一个新页面，从这里进行开发！"
      className={styles.main}
      title={false}
    >
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Form onSubmit={handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Form.Item {...formItemLayout}>{getFieldDecorator('time')(<TimePicker />)}</Form.Item>
        </Form>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submiting}>
            是时候：{count}
          </Button>
          <Button type="danger" onClick={() => manSubmit()}>
            手动提交
          </Button>
        </Form.Item>
      </div>
    </PageHeaderWrapper>
  );
}

export default Form.create({})(UseState);
