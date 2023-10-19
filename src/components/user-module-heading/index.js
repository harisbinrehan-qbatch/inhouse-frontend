import CustomDropdown from '../dropdown';
import CustomForm from '../input';
// import CustomForm from '../input';
import './style.css';

const UserModuleHeader = () => (
  <div className="container d-flex justify-content-between user-header-main-div navbar-sticky-section pe-5 ps-5">
    <h4 className="header-heading pt-3 ps-4">Heading</h4>
    <div className="d-flex gap-4 pt-3 pb-3">
      <h5 className="pt-2 header-text">Filters:</h5>
      <CustomDropdown dropdownText="Size" prop1="S" prop2="M" prop3="L" />
      <CustomDropdown
        dropdownText="Color"
        prop1="Aik tera rang"
        prop2="Aik mera rang"
        prop3="Aik uska rang"
      />
      <CustomDropdown
        dropdownText="Price"
        prop1="Rs.100"
        prop2="Rs.200"
        prop3="Rs.300"
      />
      <h5 className="pt-2 header-text">Sorting:</h5>
      <CustomDropdown
        dropdownText="Default Sorting:"
        prop1="Rs.100"
        prop2="Rs.200"
        prop3="Rs.300"
      />
      <h5 className="pt-2 header-text">Search:</h5>
      <CustomForm
        style={{ marginTop: '-24px' }}
        placeholder="Search by name"
        className="mx-3"
      />
    </div>
  </div>
);

export default UserModuleHeader;
