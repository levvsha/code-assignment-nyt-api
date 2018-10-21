import './NewsList.styl';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as NewsActions from 'actions/NewsActions.js';
import SearchField from 'components/SearchField';
import NewsItem from 'components/NewsItem';

export class NewsList extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    searchQuery: PropTypes.string,
    newsList: PropTypes.arrayOf(PropTypes.object),
    expandedNewsId: PropTypes.string,
    actions: PropTypes.objectOf(PropTypes.func)
  }

  componentDidMount() {
    this.props.actions.getNews(this.props.searchQuery);
  }

  toggleNewsCondition = (id, isActive) => {
    this.props.actions.toggleNewsCondition(id, isActive);
  }

  render() {
    const {
      expandedNewsId,
      newsList,
      searchQuery
    } = this.props;

    return (
      <div className="c-news-list">
        <SearchField value={searchQuery} />
        <div className="container">
          <div className="news-list">
            {
              newsList && this.props.newsList.map(item => (
                <NewsItem
                  {...item}
                  key={item.id}
                  isActive={expandedNewsId === item.id}
                  onClick={this.toggleNewsCondition}
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  isLoading: state.news.isLoading,
  searchQuery: state.news.searchQuery,
  newsList: state.news.newsList,
  expandedNewsId: state.news.expandedNewsId
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(NewsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
