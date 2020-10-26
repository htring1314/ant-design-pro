import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, DatePicker, Select, Row, Col, List } from 'antd';
import rmb11 from '@/assets/rmb/rmb11.jpg';
import rmb12 from '@/assets/rmb/rmb12.jpg';
import rmb21 from '@/assets/rmb/rmb21.jpg';
import rmb22 from '@/assets/rmb/rmb22.jpg';
import rmb52 from '@/assets/rmb/rmb52.jpg';
import rmb51 from '@/assets/rmb/rmb51.jpg';
import styles from './index.less';

function CssExp(props) {
  return (
    <PageHeaderWrapper
      content={ formatMessage({ id: 'useState.new.page' }) }
      className={ styles.main }
      title={ false }
    >
      {/* <div className={styles.glassWrap}> */ }
      {/*  <div className={`${styles.pubPosition} ${styles.wordWrap}`} /> */ }
      {/*  <p className={`${styles.pubPosition} ${styles.content}`}>模糊玻璃</p> */ }
      {/* </div> */ }

      <div className={ styles.noAbsoluteDiv }><img alt="rmb22" src={ rmb22 } height={ 63 }/></div>
      <div style={ { height: 15 } }>&nbsp;</div>
      <div className={ styles.withAbsoluteDiv }>
        <span className={ styles.cover }/>
        <img alt="rmb11" src={ rmb12 } height={ 63 }/>
        {/* <span className={styles.badgeDigit}>首</span> */ }
        <span className={ styles.badgeDigit2 }>二</span>
      </div>
      <div style={ { height: 30 } }>&nbsp;</div>
      <div className={ styles.noAbsoluteDiv }>
        <img alt="rmb22" src={ rmb52 } height={ 63 }/>
      </div>
      <div style={ { height: 15 } }>&nbsp;</div>
      <div style={ { border: '3px solid yellowgreen', width: 180 } }>
        <img style={ { float: 'left' } } alt="rmb22" src={ rmb22 } height={ 63 }/>
        我还有个文字我还有个文字我还有个文字我还有个文字我还有个文字我还有个文字我还有个文字我还有个文字
      </div>
      {/* <div style={ { border: '3px solid aqua' } }> */ }
      {/*  <img alt="rmb22" src={ rmb12 } height={ 63 }/> */ }
      {/* </div> */ }
      <div style={ { height: 30 } }>&nbsp;</div>
      {/* <ul style={{ width: 512 }}> */ }
      {/* <li style={ { width: 138, margin: '0 10px', textAlign: 'center', float: 'left' } }> */ }
      {/*   <div><img src={ rmb11 } alt="" height={ 63 }/>尼古拉斯.旺财.julia roberts</div> */ }
      {/* </li> */ }
      {/* <li style={ { width: 138, margin: '0 10px', textAlign: 'center', float: 'left' } }> */ }
      {/*   <div><img src={ rmb21 } alt="" height={ 63 }/>功夫熊猫</div> */ }
      {/* </li> */ }
      {/* <li style={ { width: 138, margin: '0 10px', textAlign: 'center', float: 'left' } }> */ }
      {/*   <div><img src={ rmb12 } alt="" height={ 63 }/>月野兔</div> */ }
      {/* </li> */ }
      {/* <li style={ { width: 138, margin: '0 10px', textAlign: 'center', float: 'left' } }> */ }
      {/*   <div><img src={ rmb22 } alt="" height={ 63 }/>猫女郎</div> */ }
      {/* </li> */ }
      {/* </ul> */ }
      {/* <div style={ { height: 30 } }>&nbsp;</div> */ }
      <ul style={ { width: 512 } }>
        <li style={ {
          width: 138,
          margin: '0 10px',
          textAlign: 'center',
          display: 'inline-block',
          verticalAlign: 'top'
        } }>
          <div><img src={ rmb11 } alt="" height={ 63 }/>尼古拉斯.旺财.julia roberts</div>
        </li>
        <li style={ {
          width: 138,
          margin: '0 10px',
          textAlign: 'center',
          display: 'inline-block',
          verticalAlign: 'top'
        } }>
          <div><img src={ rmb21 } alt="" height={ 63 }/>功夫熊猫</div>
        </li>
        <li style={ {
          width: 138,
          margin: '0 10px',
          textAlign: 'center',
          display: 'inline-block',
          verticalAlign: 'top'
        } }>
          <div><img src={ rmb12 } alt="" height={ 63 }/>月野兔</div>
        </li>
        <li style={ {
          width: 138,
          margin: '0 10px',
          textAlign: 'center',
          display: 'inline-block',
          verticalAlign: 'top'
        } }>
          <div><img src={ rmb22 } alt="" height={ 63 }/>猫女郎</div>
        </li>
      </ul>
      <div style={ { border: '4px solid blue', overflow: 'hidden' } }>
        <div style={ { width: 200, border: '4px solid red', float: 'left' } }>
          我是浮动元素_red
        </div>
        <div style={ { width: 200, border: '4px solid yellow', float: 'left' } }>
          我是浮动元素_yellow
        </div>
        {/* <div style={{ clear: 'both' }} /> */}
      </div>
      <div style={ { border: '4px solid gray', clear: 'left' } }>我是页脚</div>
    </PageHeaderWrapper>
  );
}

export default Form.create({})(CssExp);
