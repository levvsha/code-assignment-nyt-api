import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { NewsList, mapStateToProps, mapDispatchToProps } from '../';
import NewsItem from 'components/NewsItem';

describe('<NewsList />', () => {
  it('mapStateToProps', () => {
    const mockState = {
      news: {
        isLoading: false,
        searchQuery: 'foo',
        newsList: expectedNewsList,
        expandedNewsId: '5b20fe52068401528a2b3515',
        errorMessage: null,
        pageOffset: 0,
        foo: 'bar'
      },
      foo: 'bar'
    };

    const expectedState = {
      isLoading: false,
      searchQuery: 'foo',
      newsList: expectedNewsList,
      expandedNewsId: '5b20fe52068401528a2b3515',
      errorMessage: null,
      pageOffset: 0
    };

    expect(mapStateToProps(mockState)).toEqual(expectedState);
  });

  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).actions.updateSearchQuery({ target: { value: 'foo' }});

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'news/UPDATE_SEARCH_QUERY',
      searchQuery: 'foo'
    });
  });

  it('<NewsList /> renders correctly', () => {
    const actions = {
      getNews: () => {},
      toggleNewsCondition: () => {},
      updateSearchQuery: () => {}
    };

    const tree = renderer.create(
      <NewsList
        searchQuery="foo"
        isLoading={false}
        newsList={expectedNewsList}
        expandedNewsId="5b20fe52068401528a2b3515"
        errorMessage={null}
        pageOffset={0}
        actions={actions}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('<NewsList /> renders correctly (data loading case)', () => {
    const actions = {
      getNews: () => {},
      toggleNewsCondition: () => {},
      updateSearchQuery: () => {}
    };

    const tree = renderer.create(
      <NewsList
        searchQuery="foo"
        isLoading={true}
        newsList={expectedNewsList}
        expandedNewsId="5b20fe52068401528a2b3515"
        errorMessage={null}
        pageOffset={0}
        actions={actions}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('<NewsList /> interaction', () => {
    let actions = {};
    let component = null;

    beforeEach(() => {
      actions = {
        getNews: jest.fn(),
        toggleNewsCondition: jest.fn(),
        updateSearchQuery: jest.fn()
      };

      component = mount(
        <NewsList
          searchQuery="bar"
          isLoading={false}
          newsList={expectedNewsList}
          expandedNewsId={null}
          errorMessage={null}
          pageOffset={0}
          actions={actions}
        />
      );
    });

    afterEach(() => {
      jest.resetAllMocks();
      component.unmount();
    });

    it('<NewsList /> call getNews action after mounting', () => {
      expect(actions.getNews).toHaveBeenCalled();
      expect(actions.getNews).toHaveBeenCalledWith('bar');
    });

    it('<NewsList /> call getNews action after click "load more" button', () => {
      expect(actions.getNews).toHaveBeenCalledTimes(1);

      component.find('.load-more-button').simulate('click');

      expect(actions.getNews).toHaveBeenCalledTimes(2);
      expect(actions.getNews).toHaveBeenNthCalledWith(2, 'bar', true);
    });

    it('<NewsList /> call getNews action after typing in search field and hit "Enter" button', () => {
      const event = {
        preventDefault: () => {},
        keyCode: 13
      };

      expect(actions.getNews).toHaveBeenCalledTimes(1);

      component.find('.c-search-field .search-input').simulate('keydown', event);

      expect(actions.getNews).toHaveBeenCalledTimes(2);
      expect(actions.getNews).toHaveBeenNthCalledWith(2, 'bar');
    });

    it('<NewsList /> call getNews action after typing in search field and NOT "Enter"', () => {
      const event = {
        preventDefault: () => {},
        keyCode: 32
      };
      component.find('.c-search-field .search-input').simulate('keydown', event);

      expect(actions.getNews).toHaveBeenCalledTimes(1);
    });

    it('<NewsList /> call toggleNewsCondition action after click on item', () => {
      component.find(NewsItem).at(2).simulate('click');

      expect(actions.toggleNewsCondition).toHaveBeenCalled();
      expect(actions.toggleNewsCondition).toHaveBeenCalledWith('5b8a7a1f068401528a2d6cc4');
    });
  });
});

/* eslint-disable */
const expectedNewsList = [
  {
    "headline": "Review: ‘New Amsterdam’ Puts Patients First, Subtlety Last",
    "snippet": "Heartfelt, well-meaning and dull, the NBC drama offers a sugarcoated pill for viewers’ anxieties about the health care system.",
    "id": "5ba909b0068401528a2dca76",
    "link": "https://www.nytimes.com/2018/09/24/arts/television/new-amsterdam-review-nbc.html",
    "publicationDate": "24 September 2018",
    "image": "https://static01.nyt.com/images/2018/09/25/arts/25newamsterdam1/merlin_144237420_bf8f658f-7574-4665-b650-051b5cf0dec6-articleLarge.jpg"
  },
  {
    "headline": "Amsterdam’s Plea to Tourists: Visit, but Please Behave Yourselves",
    "snippet": "There is a growing perception that the ballooning numbers traveling to the city — many lured by marijuana and prostitution — are doing more harm than good.",
    "id": "5bb429b0068401528a2de2ac",
    "link": "https://www.nytimes.com/2018/10/02/world/europe/amsterdam-tourism-cannabis-prostitution.html",
    "publicationDate": "3 October 2018",
    "image": "https://static01.nyt.com/images/2018/10/03/world/03AmsterdamTourist-1-print-alt/merlin_143250285_49999f7b-d1e8-4c48-b38b-50dc2e570bdf-articleLarge.jpg"
  },
  {
    "headline": "Amsterdam Stabbing Victims Identified as U.S. Citizens",
    "snippet": "The U.S. ambassador to the Netherlands said two American tourists were attacked. The Dutch authorities said statements from the Afghan suspect pointed to a terrorist motive.",
    "id": "5b8a7a1f068401528a2d6cc4",
    "link": "https://www.nytimes.com/2018/09/01/world/europe/amsterdam-stabbing-americans.html",
    "publicationDate": "1 September 2018",
    "image": "https://static01.nyt.com/images/2018/09/02/world/02amsterdam-shooting/02amsterdam-shooting-articleLarge.jpg"
  },
  {
    "headline": "Instrumental Armies Do Battle at Amsterdam’s Opera",
    "snippet": "A wide-ranging Opera Forward Festival was the perfect send-off for Pierre Audi, leaving after three decades in charge of the Dutch National Opera.",
    "id": "5abbbf30068401528a29e5be",
    "link": "https://www.nytimes.com/2018/03/28/arts/music/review-dutch-opera-stockhausen-audi.html",
    "publicationDate": "28 March 2018",
    "image": "https://static01.nyt.com/images/2018/03/28/arts/28dutchopera/merlin_136043691_96f0eb3b-6dec-4e84-bbe8-14c0e4fedddf-articleLarge.jpg"
  },
  {
    "headline": "Keith Haring Mural in Amsterdam Is Uncovered After Nearly 30 Years",
    "snippet": "The 40-foot work, painted on the side of a storage facility, was hidden behind aluminum insulation panels.",
    "id": "5b325833068401528a2b8242",
    "link": "https://www.nytimes.com/2018/06/26/arts/design/keith-haring-amsterdam.html",
    "publicationDate": "26 June 2018",
    "image": "https://static01.nyt.com/images/2018/06/27/arts/27HARING-ITEM1/merlin_140045382_019592ef-ee45-4135-ac97-6f57a0264fdb-articleLarge.jpg"
  },
  {
    "headline": "At an Amsterdam Hotel, Canals and Character",
    "snippet": "The Pulitzer Amsterdam celebrates its past but has a flair for modern touches. Don’t miss the bar — or the boat tour.",
    "id": "5a87fd3910f40f00018c18f7",
    "link": "https://www.nytimes.com/2018/02/17/travel/pulitzer-amsterdam-hotel-review.html",
    "publicationDate": "17 February 2018",
    "image": "https://static01.nyt.com/images/2018/01/18/travel/18checkin-amsterdam-1/18checkin-amsterdam-1-articleLarge-v4.jpg"
  },
  {
    "headline": "New Amsterdam Figured Out Religious Tolerance 361 Years Ago",
    "snippet": "The Flushing Remonstrance to Peter Stuyvesant has a lot in common with Sonia Sotomayor’s rebuke of President Trump.",
    "id": "5b335c2b068401528a2b8575",
    "link": "https://www.nytimes.com/2018/06/27/opinion/travel-ban-supreme-court-new-amsterdam.html",
    "publicationDate": "27 June 2018",
    "image": "https://static01.nyt.com/images/2018/06/27/opinion/27shorto/27shorto-articleLarge.jpg"
  },
  {
    "headline": "Eberhard van der Laan, Popular Mayor of Amsterdam, Dies at 62",
    "snippet": "A progressive-minded leader, he announced that he had lung cancer in January and wrote a farewell letter to the city’s residents when he stepped down in September.",
    "id": "59d7f6d27c459f246b62d187",
    "link": "https://www.nytimes.com/2017/10/06/obituaries/eberhard-van-der-laan-dead-mayor-of-amsterdam.html",
    "publicationDate": "7 October 2017",
    "image": "https://static01.nyt.com/images/2017/10/09/climate/09vanderlaan/08vanderlaan-articleLarge-v2.jpg"
  },
  {
    "headline": "Inquiry Clears Museum Director Who Quit in Conflict-of-Interest Storm",
    "snippet": "Three board members resigned at the Stedelijk, the Netherlands’ leading modern art museum, after a report exonerated Beatrix Ruf, its former head.",
    "id": "5b20fe52068401528a2b3515",
    "link": "https://www.nytimes.com/2018/06/13/arts/design/beatrix-ruf-stedelijk-report.html",
    "publicationDate": "13 June 2018",
    "image": "https://static01.nyt.com/images/2018/06/14/arts/14arts3/14RUF-ITEM2-articleLarge.jpg"
  },
  {
    "headline": "Van Gogh Never Visited Japan, but He Saw It Everywhere",
    "snippet": "After buying some prints in Paris in 1886, the Dutch painter became obsessed by Japanese art. An exhibition in Amsterdam explores how that fascination shaped his work.",
    "id": "5ab88c6e068401528a29cc4c",
    "link": "https://www.nytimes.com/2018/03/26/arts/design/vincent-van-gogh-japan.html",
    "publicationDate": "26 March 2018",
    "image": "https://static01.nyt.com/images/2018/03/27/arts/27vangogh5/merlin_135552219_7b230766-cc6d-441c-aac2-47aec0be4fb2-articleLarge.jpg"
  }
];