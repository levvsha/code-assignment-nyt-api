import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import SearchField from '../';

describe('<SearchField />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('SearchField renders correctly', () => {
    const tree = renderer.create(
      <SearchField
        value="foo"
        onChange={() => {}}
        onKeyDown={() => {}}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('SearchField onChange handler is triggered', () => {
    const onChangeSpy = jest.fn();

    const component = shallow(
      <SearchField
        value="foo"
        onChange={onChangeSpy}
        onKeyDown={() => {}}
      />
    );

    const event = {
      preventDefault: () => {},
      target: { value: 'foot' }
    };

    component.find('input').simulate('change', event);

    expect(onChangeSpy).toHaveBeenCalled();
    expect(onChangeSpy).toHaveBeenCalledWith(event);
    component.unmount();
  });

  it('SearchField onKeyDown handler is triggered', () => {
    const onKeyDownSpy = jest.fn();

    const component = shallow(
      <SearchField
        value="foo"
        onChange={() => {}}
        onKeyDown={onKeyDownSpy}
      />
    );

    const event = {
      preventDefault: () => {},
      keyCode: 123
    };

    component.find('input').simulate('keydown', event);

    expect(onKeyDownSpy).toHaveBeenCalled();
    expect(onKeyDownSpy).toHaveBeenCalledWith(event);
    component.unmount();
  });
});
