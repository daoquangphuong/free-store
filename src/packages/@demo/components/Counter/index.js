import React from 'react';
import { useStore } from '@';
import { $count1, $count2 } from '../../stores';
import AddAll from '../../actions/AddAll';
import container from './container';

const Counter = props => {
  const [count1, count2] = useStore([$count1, $count2]);
  const { children } = props;
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          AddAll();
        }}
      >
        Add All
      </button>
      <br />
      {count1}
      <br />
      {count2}
      {children}
    </div>
  );
};

export default container(Counter);
