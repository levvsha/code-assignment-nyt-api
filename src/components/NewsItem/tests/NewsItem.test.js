import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import NewsItem from '../';

describe('<NewsItem />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('NewsItem renders correctly', () => {
    const tree = renderer.create(
      <NewsItem
        headline="headline"
        onClick={() => {}}
        id="id"
        snippet="snippet"
        image="url/to/image.jpg"
        isActive={false}
        publicationDate="24 September 2018"
        link="url/to/article"
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('NewsItem onChange handler is triggered', () => {
    const onClickSpy = jest.fn();

    const component = shallow(
      <NewsItem
        headline="headline"
        onClick={onClickSpy}
        id="id"
        snippet="snippet"
        image="https://static01.nyt.com/images/2018/09/25/arts/25newamsterdam1/merlin_144237420_bf8f658f-7574-4665-b650-051b5cf0dec6-articleLarge.jpg"
        isActive={false}
        publicationDate="24 September 2018"
        link="https://www.nytimes.com/2018/09/24/arts/television/new-amsterdam-review-nbc.html"
      />
    );

    component.simulate('click');

    expect(onClickSpy).toHaveBeenCalled();
    expect(onClickSpy).toHaveBeenCalledWith('id');
    component.unmount();
  });

  it('NewsItem onChange handler is triggered', () => {
    const component = shallow(
      <NewsItem
        headline="headline"
        onClick={() => {}}
        id="id"
        snippet="snippet"
        image="https://static01.nyt.com/images/2018/09/25/arts/25newamsterdam1/merlin_144237420_bf8f658f-7574-4665-b650-051b5cf0dec6-articleLarge.jpg"
        isActive={true}
        publicationDate="24 September 2018"
        link="https://www.nytimes.com/2018/09/24/arts/television/new-amsterdam-review-nbc.html"
      />
    );

    component.setState = jest.fn();

    global.innerWidth = 500; // eslint-disable-line no-undef
    global.dispatchEvent(new Event('resize')); // eslint-disable-line no-undef

    return new Promise(resolve => {
      setTimeout(() => {
        expect(component.setState).toHaveBeenCalled();
        component.unmount();

        resolve();
      }, 400); // fait for debounced resize event handler will be executed
    });
  });
});
