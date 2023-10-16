import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function CustomDropdown({ dropdownText, ...rest }) {
  return (
    <Dropdown as={ButtonGroup}>
      <Button variant="light">{dropdownText}</Button>

      <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />

      <Dropdown.Menu>
        {Object.keys(rest).map((propKey) => (
          <Dropdown.Item key={propKey} href={`#/action-${propKey}`}>
            {rest[propKey]}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;
