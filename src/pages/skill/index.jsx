import React, { useState, useEffect, useReducer, Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Spin, Button, Input, Card } from 'antd';
import styles from './index.less';

const pokemons = ['Charizard', 'Mr. Mime', 'Jynx'];

export default function Skill(props) {
  const [name, setName] = useReducer((_, value) => value, 'htring');

  // const [, rerender] = useState();
  // rerender({});

  const hasNoKey = pokemons.map(pokemon => (
    <div>
      <strong>Name: </strong>
      <span>{pokemon}</span>
    </div>
  ));

  const reactFragment = pokemons.map(pokemon => (
    <React.Fragment key={pokemon}>
      <Card title="Name:" style={{ width: 366, marginBottom: 10 }}>
        <span>{pokemon}</span>
      </Card>
    </React.Fragment>
  ));

  const MySimple = ({ MyComponent = 'Button', ...propss }) => (
    <MyComponent {...propss}></MyComponent>
  );

  return (
    <div>
      <div>{reactFragment}</div>
      <div>
        {name}
        <Input value={name} onChange={e => setName(e.target.value)}></Input>
      </div>
      <div>
        <Button type="danger" ghost>我是红色幽灵</Button>
        <MySimple>a button</MySimple>
        <MySimple MyComponent="Input">a link</MySimple>
      </div>
    </div>
  );
}
