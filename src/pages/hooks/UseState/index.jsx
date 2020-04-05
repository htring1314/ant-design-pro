import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, DatePicker, Select, Row, Col, List } from 'antd';
import moment from 'moment';
import TimeSelectForm from './components/TimeSelectForm';
import styles from './index.less';

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

const radioArr = [
  { value: '1', name: formatMessage({ id: 'useState.everyday' }) },
  { value: '2', name: formatMessage({ id: 'useState.every.week' }) },
  { value: '3', name: formatMessage({ id: 'useState.every.month' }) },
];

function UseState(props) {
  const {
    form: { getFieldDecorator },
  } = props;

  const [submiting, setSubmiting] = useState(false);
  const [selectDisplay, setSelectDisplay] = useState({ display: 'none' });
  const [selectSpan, setSelectSpan] = useState(24);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [timeVisible, setTimeVisible] = useState(false);
  const [timeRecord, setTimeRecord] = useState({});
  const [modalTitle, setModalTitle] = useState('');

  const handleSubmit = e => {
    setSubmiting(true);
    const { form } = props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
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
        setTimeout(() => {
          setSubmiting(false);
        }, 1000);
      }
    });
  };

  const selectType = value => {
    if (value === '1') {
      setSelectDisplay({ display: 'block' });
      setSelectSpan(20);
    } else {
      setSelectDisplay({ display: 'none' });
      setSelectSpan(24);
    }
  };

  const addDuty = () => {
    setTimeVisible(true);
    setModalTitle(formatMessage({ id: 'useState.add.time' }));
  };

  const onCancel = () => {
    setTimeVisible(false);
    setTimeRecord({});
  };
  const onSubmit = params => {
    setSelectedTimes(prev => {
      (prev || []).push(params);
      return prev;
    });
    onCancel();
  };

  const editTime = item => {
    setTimeVisible(true);
    setTimeRecord(item);
    setModalTitle(formatMessage({ id: 'useState.edit.time' }));
  };

  const delTime = item => {
    setSelectedTimes(prev =>
      (prev || []).filter(
        time => time.startTime !== item.startTime && time.endTime !== item.endTime,
      ),
    );
  };

  return (
    <PageHeaderWrapper
      content={formatMessage({ id: 'useState.new.page' })}
      className={styles.main}
      title={false}
    >
      <div style={{ paddingTop: 15 }}>
        <Form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
          <Form.Item {...formItemLayout} label="开始结束日期">
            {getFieldDecorator('startDate')(
              <DatePicker placeholder="请选择开始日期" style={{ width: '50%' }} />,
            )}
            {getFieldDecorator('endDate')(
              <DatePicker placeholder="请选择结束日期" style={{ width: '50%' }} />,
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="选类型">
            <Row>
              <Col span={selectSpan}>
                {getFieldDecorator('troubleType', { rules: [{ required: true }] })(
                  <Select onChange={selectType} placeholder="请选择类型">
                    {radioArr.map(item => (
                      <Option key={item.value}>{item.name}</Option>
                    ))}
                  </Select>,
                )}
              </Col>
              <Col span={4} style={{ display: selectDisplay.display }}>
                <Button onClick={() => addDuty()} icon="plus">
                  新增时间
                </Button>
              </Col>
            </Row>
          </Form.Item>
          {!!selectedTimes && selectedTimes.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={selectedTimes}
              style={{ marginLeft: '29.2%' }}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a href="#" onClick={() => editTime(item)}>
                      编辑
                    </a>,
                    <a href="#" onClick={() => delTime(item)}>
                      删除
                    </a>,
                  ]}
                >
                  开始结束时间：{item.startTime.format(timeFormat)}~
                  {item.endTime.format(timeFormat)}
                </List.Item>
              )}
            ></List>
          ) : null}
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              是时候
            </Button>
            <Button
              loading={submiting}
              type="danger"
              onClick={() => manSubmit()}
              className={styles.rightButton}
            >
              手动提交
            </Button>
          </Form.Item>
        </Form>
        <TimeSelectForm
          timeVisible={timeVisible}
          onCancel={onCancel}
          onSubmit={onSubmit}
          record={timeRecord}
          modalTitle={modalTitle}
        ></TimeSelectForm>
      </div>
    </PageHeaderWrapper>
  );
}

export default Form.create({})(UseState);
