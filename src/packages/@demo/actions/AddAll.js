import { createAction } from '@';
import { $count1, $count2 } from '../stores';

export default createAction('demo:AddAll', () => {
  $count1.setState(s => s + 1);
  $count2.setState(s => s + 2);
});
