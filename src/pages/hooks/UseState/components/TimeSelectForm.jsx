import React, { useState } from 'react';
import { TimePicker, Modal, Form, Select, Row, Col } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { everyWeek, everyMonth, weeksSelect, daySelect } from './data';

const { Option } = Select;

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
    selectCycle,
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
    const { form, onSaveTimeRange } = props;
    form.validateFields((err, values) => {
      if (err) {
        // console.log('keys', Object.keys(err).includes('endTime'));
        // console.log('出错了', err.endTime.errors[0].message);
        return;
      }
      // console.log(values);
      if (values.startTime > values.endTime) {
        onSaveTimeRange({
          selectDay: '',
          ...values,
          startTime: values.endTime,
          endTime: values.startTime,
        });
      } else {
        onSaveTimeRange({ selectDay: '', ...values });
      }
    });
  };

  const generateSelect = (arr = []) => {
    if (!!arr && arr.length > 0) {
      return arr.map(item => <Option key={item.value}>{item.name}</Option>);
    }
    return null;
  };

  const options = value => {
    if (value === everyWeek.value) {
      return generateSelect(weeksSelect);
    }
    if (value === everyMonth.value) {
      return generateSelect(daySelect());
    }
    return null;
  };

  const needSelectDay = selectCycle === everyWeek.value || selectCycle === everyMonth.value;

  return (
    <div>
      <Modal
        visible={timeVisible}
        title={modalTitle}
        okText={formatMessage({ id: 'common.save' })}
        onCancel={onCancel}
        onOk={submitTime}
        closable
        maskClosable={false}
        destroyOnClose
        width={600}
      >
        <Form style={{ marginTop: 8 }}>
          {needSelectDay ? (
            <Form.Item {...formItemLayout} label={formatMessage({ id: 'common.select' })}>
              {getFieldDecorator('selectDay', {
                initialValue: record.selectDay,
                rules: [{ required: true, message: formatMessage({ id: 'common.must' }) }],
              })(
                <Select placeholder={formatMessage({ id: 'common.please.select' })}>
                  {options(selectCycle)}
                </Select>,
              )}
            </Form.Item>
          ) : null}
          <Form.Item {...formItemLayout} label={formatMessage({ id: 'useState.range.time' })}>
            {getFieldDecorator('startTime', {
              initialValue: record.startTime,
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'useState.startEnd.required' }),
                },
              ],
            })(<TimePicker format={timeFormat} minuteStep={15} secondStep={60} />)}
            ~
            {getFieldDecorator('endTime', {
              initialValue: record.endTime,
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'useState.startEnd.required' }),
                },
              ],
            })(<TimePicker format={timeFormat} minuteStep={15} secondStep={60} />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Form.create({})(TimeSelectForm);
