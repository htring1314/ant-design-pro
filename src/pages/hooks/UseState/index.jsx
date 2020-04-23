import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, DatePicker, Select, Row, Col, List } from 'antd';
import moment from 'moment';
import TimeSelectForm from './components/TimeSelectForm';
import styles from './index.less';
import { frequencySelect } from './components/data';

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

function UseState(props) {
  // 本组件中props
  const {
    form: { getFieldDecorator },
  } = props;

  // 是否表单提交中
  const [submiting, setSubmiting] = useState(false);
  // 是否显示新增时间范围按钮
  const [selectDisplay, setSelectDisplay] = useState({ display: 'none' });
  // 动态控制周期选择框的长度
  const [selectSpan, setSelectSpan] = useState(24);
  // 录入的时间范围数据
  const [selectedTimes, setSelectedTimes] = useState([]);
  // 是否显示时间范围新增弹框
  const [timeVisible, setTimeVisible] = useState(false);
  // 编辑时间弹框时的数据
  const [timeRecord, setTimeRecord] = useState({});
  // 时间弹框的标题
  const [modalTitle, setModalTitle] = useState('');
  // 选中的周期
  const [selectCycle, setSelectCycle] = useState('');

  // 自动提交表单数据
  const handleSubmit = e => {
    setSubmiting(true);
    const { form } = props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log(selectedTimes);
        setTimeout(() => {
          setSubmiting(false);
        }, 1000);
      }
    });
  };

  // 手动提交表单数据
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

  // 选择周期
  const selectType = value => {
    setSelectedTimes([]);
    if (
      frequencySelect.some(item => {
        if (item.value === value) {
          return true;
        }
        return false;
      })
    ) {
      setSelectCycle(value);
      setSelectDisplay({ display: 'block' });
      setSelectSpan(20);
    } else {
      setSelectCycle('');
      setSelectDisplay({ display: 'none' });
      setSelectSpan(24);
    }
  };

  // 新增时间范围弹框
  const addDuty = () => {
    setTimeVisible(true);
    setModalTitle(formatMessage({ id: 'useState.add.time' }));
  };

  // 关闭时间选择弹框
  const onCancel = () => {
    // setSelectCycle('');
    setTimeVisible(false);
    setTimeRecord({});
  };

  // 保存新增的时间范围信息
  const onSaveTimeRange = params => {
    setSelectedTimes(prev => {
      const filterArr = (prev || []).filter(
        item =>
          item.selectDay !== timeRecord.selectDay &&
          item.startTime !== timeRecord.startTime &&
          item.endTime !== timeRecord.endTime,
      );
      filterArr.push(params);
      return filterArr;
    });
    onCancel();
  };

  // 编辑时间范围
  const editTime = item => {
    setTimeVisible(true);
    setTimeRecord(item);
    setModalTitle(formatMessage({ id: 'useState.edit.time' }));
  };

  // 删除时间范围
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
          <Row>
            <Col span={12}>
              <Form.Item {...formItemLayout} label={formatMessage({ id: 'useState.startEnd' })}>
                {getFieldDecorator('startDate')(
                  <DatePicker
                    placeholder={formatMessage({ id: 'useState.start.select' })}
                    style={{ width: '100%' }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item wrapperCol={{ span: 24 }}>
                {getFieldDecorator('endDate')(
                  <DatePicker
                    placeholder={formatMessage({ id: 'useState.start.select' })}
                    style={{ width: '100%' }}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item {...formItemLayout} label={formatMessage({ id: 'useState.frequency.select' })}>
            <Row>
              <Col span={selectSpan}>
                {getFieldDecorator('troubleType', { rules: [{ required: true }] })(
                  <Select
                    onChange={selectType}
                    placeholder={formatMessage({ id: 'useState.frequency.please' })}
                  >
                    {frequencySelect.map(item => (
                      <Option key={item.value}>{item.name}</Option>
                    ))}
                  </Select>,
                )}
              </Col>
              <Col span={4} style={{ display: selectDisplay.display }}>
                <Button onClick={() => addDuty()} icon="plus">
                  {formatMessage({ id: 'useState.range.add' })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          {!!selectedTimes && selectedTimes.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={selectedTimes}
              style={{ marginLeft: '29.2%' }}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <a href="#" onClick={() => editTime(item)}>
                      {formatMessage({ id: 'common.edit' })}
                    </a>,
                    <a href="#" onClick={() => delTime(item)}>
                      {formatMessage({ id: 'common.delete' })}
                    </a>,
                  ]}
                >
                  {`${formatMessage({ id: 'useState.startEnd.time' })} ${index + 1} :
                  ${item.selectDay} ${item.startTime.format(timeFormat)}~
                ${item.endTime.format(timeFormat)}`}
                </List.Item>
              )}
            ></List>
          ) : null}
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              {formatMessage({ id: 'common.auto' })}
            </Button>
            <Button
              loading={submiting}
              type="danger"
              onClick={() => manSubmit()}
              className={styles.rightButton}
            >
              {formatMessage({ id: 'common.man' })}
            </Button>
          </Form.Item>
        </Form>
        <TimeSelectForm
          timeVisible={timeVisible}
          onCancel={onCancel}
          onSaveTimeRange={onSaveTimeRange}
          record={timeRecord}
          modalTitle={modalTitle}
          selectCycle={selectCycle}
        ></TimeSelectForm>
      </div>
    </PageHeaderWrapper>
  );
}

export default Form.create({})(UseState);
