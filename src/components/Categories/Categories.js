/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { activeCategory } from '../../actions/categoriesAction';
import { useLocationField } from 'react-location-query';
import { useHistory } from 'react-router';


export default function Categories(props) {
  const { onChange } = props;
  const categoriesState = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();
  const [category, setCategory] = useLocationField('category', '');

  function findCat(a) {
    let s = categoriesState.categoriesData.find((o) => o.id === a)
    if (s !== undefined) {
      return s.title;
    }
  }
  function findCatId(a) {
    let s = categoriesState.categoriesData.find((o) => o.title === a)
    if (s !== undefined) {
      return s.id;
    }
  }
// setCategory(categoriesState.activeCategory)
 useEffect(() => {
    setCategory(findCat(categoriesState.activeCategory))
  }, [categoriesState.activeCategory])

  const onCategoryChange = (event, id) => {
    event.preventDefault();
    dispatch(activeCategory(id));
    onChange(id);
  };

  const actualActive = findCatId(category)
  // console.log(actualActive)
  
 
  
  return (
    <ul className="catalog-categories nav justify-content-center">
      {categoriesState.categoriesData.map((value) => (
        <li className="nav-item" key={value.id}>
          <a
            className={cn({
              'nav-link': true,
              active: value.id === actualActive,
            })}
            href=""
            onClick={(event) => onCategoryChange(event, value.id)}
          >
            {value.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

Categories.propTypes = {
  onChange: PropTypes.func.isRequired,
};