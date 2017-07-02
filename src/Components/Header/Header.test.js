import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

test('Header component renders', () => {
  const component = shallow(<Header toggleFn={() => null} toggledMenu={false} />);
});
