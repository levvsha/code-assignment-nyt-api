import './NewsList.styl';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import config from 'config';
import * as NewsActions from 'actions/NewsActions.js';
import SearchField from 'components/SearchField';
import NewsItem from 'components/NewsItem';
import Preloader from 'components/Preloader';

export class NewsList extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    searchQuery: PropTypes.string,
    newsList: PropTypes.arrayOf(PropTypes.object),
    expandedNewsId: PropTypes.string,
    errorMessage: PropTypes.string,
    pageOffset: PropTypes.number,
    actions: PropTypes.shape({
      getNews: PropTypes.func.isRequired,
      toggleNewsCondition: PropTypes.func.isRequired,
      updateSearchQuery: PropTypes.func.isRequired
    })
  }

  componentDidMount() {
    this.props.actions.getNews(this.props.searchQuery);
  }

  /*
    Call the action to set active (expanded) news ID
   */
  toggleNewsCondition = (id) => {
    this.props.actions.toggleNewsCondition(id);
  }

  /*
    Call the action to request more news
   */
  handleLoadMoreButtonClick = () => {
    if (!this.props.isLoading) {
      this.props.actions.getNews(this.props.searchQuery, true);
    }
  }

  /*
    Handle key down event and request new news list when hit "Enter" key
   */
  handleKeyDown = (event) => {
    if (!this.props.isLoading && event.keyCode === 13) { // "Enter" key
      this.props.actions.getNews(this.props.searchQuery);
    }
  }

  render() {
    const {
      expandedNewsId,
      newsList,
      searchQuery,
      actions,
      isLoading,
      errorMessage,
      pageOffset
    } = this.props;

    const message = errorMessage
      ? `Error - ${ errorMessage }`
      : 'Type and hit «Enter» for search';

    return (
      <div className="c-news-list">
        <div className={`message${ errorMessage ? ' is-error' : '' }`}>
          {
            isLoading ? <Preloader /> : message
          }
        </div>
        <SearchField
          value={searchQuery}
          onChange={actions.updateSearchQuery}
          onKeyDown={this.handleKeyDown}
        />
        <div className="container">
          <div className="news-list">
            {
              !!newsList.length && this.props.newsList.map(item => (
                <NewsItem
                  {...item}
                  key={item.id}
                  isActive={expandedNewsId === item.id}
                  onClick={this.toggleNewsCondition}
                />
              ))
            }
            {
              !this.props.newsList.length && !isLoading && (
                <div className="notification">
                  No news on this topic...
                </div>
              )
            }
          </div>
          <div className={`button-wrapper${ isLoading ? ' is-loading' : '' }`}>
            {
              isLoading && !!newsList.length && pageOffset <= config.pageOffsetLimit && <Preloader color="white" />
            }
            {
              !!newsList.length && pageOffset <= config.pageOffsetLimit && (
                <button
                  className="load-more-button"
                  onClick={this.handleLoadMoreButtonClick}
                >
                  LOAD MORE
                </button>
              )
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
  expandedNewsId: state.news.expandedNewsId,
  errorMessage: state.news.errorMessage,
  pageOffset: state.news.pageOffset,
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(NewsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
