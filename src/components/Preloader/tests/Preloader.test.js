import React from 'react';
import renderer from 'react-test-renderer';

import Preloader from '../';

describe('<Preloader />', () => {
  it('Preloader renders correctly', () => {
    const tree = renderer.create(<Preloader color="white" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
