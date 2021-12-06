import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchFieldChange, searchTextStatus } from '../../actions/searchAction';
import { useHistory } from 'react-router-dom';
import { findCategoryName } from '../../helpFunction.js/helpFunction';
var qs = require('qs');


export default function SearchForm() {
  const categoriesState = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const parsed = qs.parse(history.location.search.substr(1))
  const searchValue = parsed.query !== undefined ? parsed.query : '';
  
  const onInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(searchFieldChange(name, value));  
    history.push({
      pathname: `${history.location.pathname}`,
      search: `?query=${value}&category=${findCategoryName(categoriesState.activeCategory)}`
    })
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(searchTextStatus(searchValue, true));
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={onSubmit}>
      <input className="form-control" name="search" placeholder="Поиск" value={searchValue} onChange={onInputChange} />
    </form>
  );
}
