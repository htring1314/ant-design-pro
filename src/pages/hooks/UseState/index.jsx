import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Button, Form, TimePicker, DatePicker } from 'antd';
import moment from 'moment';
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

// 时间选择格式
const timeFormat = 'HH:mm';

function UseState(props) {
  const {
    form: { getFieldDecorator },
  } = props;
  const [submiting, setSubmiting] = useState(false);
  const [startTime, setStartTime] = useState(moment());
  const [endTime, setEndTime] = useState(moment());
  useEffect(() => {}, []);

  const handleSubmit = e => {
    setSubmiting(true);
    const { form } = props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setTimeout(() => {
          const endT = values.endTime;
          const startT = values.startTime;
          if (startT > endT) {
            setEndTime(startT);
            setStartTime(endT);
          } else {
            setStartTime(startT);
            setEndTime(endT);
          }
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
        setTimeout(() => {
          const endT = values.endTime;
          const startT = values.startTime;
          if (startT > endT) {
            setEndTime(startT);
            setStartTime(endT);
          } else {
            setStartTime(startT);
            setEndTime(endT);
          }
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
          <Form.Item {...formItemLayout}>
            {getFieldDecorator('startTime')(
              <TimePicker value={startTime} format={timeFormat} minuteStep={15} secondStep={60} />,
            )}
            ~
            {getFieldDecorator('endTime')(
              <TimePicker value={endTime} format={timeFormat} minuteStep={15} secondStep={60} />,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout}>
            {getFieldDecorator('startDate')(<DatePicker />)}~
            {getFieldDecorator('endDate')(<DatePicker />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              是时候：{startTime.format(timeFormat)}
            </Button>
            <Button
              loading={submiting}
              type="danger"
              onClick={() => manSubmit()}
              className={styles.rightButton}
            >
              手动提交：{endTime.format(timeFormat)}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageHeaderWrapper>
  );
}

export default Form.create({})(UseState);
