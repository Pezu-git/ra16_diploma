const categoriesData = JSON.parse(localStorage.getItem('category'));

export const findCategoryName = (a) => {    
    let s = categoriesData.find((o) => o.id === a)
    if (s !== undefined) {
      return s.title;
    }
  };

  export const findCategoryId = (a) => {
    let s = categoriesData.find((o) => o.title === a)
      if (s !== undefined) {
        return s.id;
      } 
  };