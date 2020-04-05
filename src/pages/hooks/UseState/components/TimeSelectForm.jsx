import React, { useState } from 'react';
import { TimePicker, Modal, Form } from 'antd';

// 时间选择格式：时、分
const timeFormat = 'HH:mm';

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 17 },
  },
};

function TimeSelectForm(props) {
  const {
    timeVisible = false,
    record = {},
    form: { getFieldDecorator },
    modalTitle,
  } = props;

  // const [startTime, setStartTime] = useState(null);
  // const [endTime, setEndTime] = useState(null);

  // const changeStart = time => {
  //   setStartTime(time);
  // };
  // const changeEnd = time => {
  //   setEndTime(time);
  // };
  const onCancel = () => {
    props.onCancel();
  };

  const submitTime = () => {
    const { form, onSubmit } = props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (values.startTime > values.endTime) {
        onSubmit({ startTime: values.endTime, endTime: values.startTime });
      } else {
        onSubmit(values);
      }
    });
  };

  return (
    <div>
      <Modal
        visible={timeVisible}
        title={modalTitle}
        okText="保存"
        onCancel={onCancel}
        onOk={submitTime}
        closable
        maskClosable={false}
        destroyOnClose
        width={600}
      >
        <Form style={{ marginTop: 8 }}>
          <Form.Item {...formItemLayout} label="时间范围">
            {getFieldDecorator('startTime', {
              initialValue: record.startTime,
              rules: [{ required: true, message: '开始结束时间必输' }],
            })(<TimePicker format={timeFormat} minuteStep={15} secondStep={60} />)}
            ~
            {getFieldDecorator('endTime', {
              initialValue: record.endTime,
              rules: [{ required: true, message: '开始结束时间必输' }],
            })(<TimePicker format={timeFormat} minuteStep={15} secondStep={60} />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Form.create({})(TimeSelectForm);
