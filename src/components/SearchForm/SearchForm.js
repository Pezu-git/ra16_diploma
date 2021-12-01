import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchFieldChange, searchTextStatus } from '../../actions/searchAction';
import { useLocationField } from 'react-location-query';
import { useHistory } from 'react-router';
var qs = require('qs');

export default function SearchForm() {
  const searchState = useSelector((state) => state.searchReducer);
  const dispatch = useDispatch();
  const [querys, setQuery] = useLocationField('query', searchState.search);
  // const history = useHistory();
  // const parsed = qs.parse(history.location.search.substr(1))
  const onInputChange = (event) => {
    setQuery(event.target.value)
    const { name, value } = event.target;
    dispatch(searchFieldChange(name, value));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    
    dispatch(searchTextStatus(querys, true));
    
    // setQuery(event.target.value)
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={onSubmit}>
      <input className="form-control" name="search" placeholder="Поиск" value={querys} onChange={onInputChange} />
    </form>
  );
}