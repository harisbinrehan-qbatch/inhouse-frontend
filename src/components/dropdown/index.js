import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function CustomDropdown({ heading, items, handleFilter }) {
  const colorMap = {
    '#155724': 'green',
    '#AAA': 'grey',
    '#1B1E21': 'black',
    '#231579': 'blue',
    '#740F0F': 'red',
  };

  return (
    <Dropdown as={ButtonGroup}>
      <Button variant="light">{heading}</Button>

      <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />

      <Dropdown.Menu>
        {items.map((item, index) => (
          <Dropdown.Item
            onClick={() => handleFilter({ [heading]: index, filterAction: item })}
            key={index}
          >
            {colorMap[item] || item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;
