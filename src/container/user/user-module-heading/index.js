import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import CustomDropdown from '../../../components/dropdown';
import CustomForm from '../../../components/input';
import { fetchProducts } from '../../../redux/slices/products';

import './style.css';

const UserModuleHeader = () => {
  const dispatch = useDispatch();
  const [filterObject, setFilterObject] = useState({});

  const dropdownArray = [
    {
      heading: 'Size',
      items: ['none', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    },
    {
      heading: 'Color',
      items: ['none', '#155724', '#AAA', '#1B1E21', '#231579', '#740F0F'],
    },
    {
      heading: 'Price',
      items: ['none', '$0 - $200', '$200 - $400', '$400 - $1000'],
    },
    {
      heading: 'Sorting',
      items: [
        'none',
        'Price low to high',
        'Price high to low',
        'Newest products',
      ],
    },
  ];

  const handleSearch = debounce((e) => {
    const search = e.target.value;
    setFilterObject({
      ...filterObject,
      search,
    });
  }, 500);

  useEffect(() => {
    dispatch(fetchProducts(filterObject));
  }, [filterObject]);

  const handleFilters = (filter) => {
    let filterName = Object.keys(filter)[0];
    const filterAction = filter[filterName];
    filterName = filterName.toLowerCase();

    if (filterName === 'price' && filterAction === 'none') {
      // Handle the case where 'Price' filter is set to 'none'
      setFilterObject({
        ...filterObject,
        [filterName]: undefined, // Remove the 'price' filter
      });
    } else if (filterName === 'price') {
      const splittedValue = filterAction.split('-');
      const startValue = splittedValue[0].split('$')[1];
      const endValue = splittedValue[1].split('$')[1];
      setFilterObject({
        ...filterObject,
        [filterName]: [startValue, endValue],
      });
    } else {
      setFilterObject({
        ...filterObject,
        [filterName]: filterAction,
      });
    }
  };

  return (
    <div
      style={{ zIndex: '1' }}
      className="container d-flex justify-content-between user-header-main-div navbar-sticky-section pe-5 ps-5"
    >
      <h4 className="header-heading pt-3 ps-4">Heading</h4>
      <div className="d-flex gap-4 pt-3 pb-3">
        <h5 className="pt-2 header-text">Filters:</h5>
        {dropdownArray.map((singleFilter, index) => (
          <CustomDropdown
            key={index}
            handleFilter={handleFilters}
            heading={singleFilter.heading}
            items={singleFilter.items}
          />
        ))}
        <h5 className="pt-2 header-text">Search:</h5>
        <CustomForm
          style={{ marginTop: '-24px' }}
          placeholder="Search by name"
          className="mx-3"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default UserModuleHeader;
