import React, { useState, useEffect } from 'react';
// import History from '../History/History';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { searchFieldChange, searchTextStatus } from '../../actions/searchAction';

export default function SearchForm() {
  const history = useHistory();
  // const searchState = useSelector((state) => state.searchReducer);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    const q = params.get("query");
    setLang(q ? q : "MatLab");
  }, []);

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setLang(input);
    history.push({
      pathname: `${history.location.pathname}`,
      search: `?query=${input}`
    })
    dispatch(searchTextStatus(input, true))
    setInput('');
    
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={onSubmit}>
      <input className="form-control" name="search" placeholder="Поиск" value={input} onChange={onInputChange} />
    </form>
  );
}