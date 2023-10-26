import CustomNavbar from '../components/navbar';

const MainPageLayout = ({ children, setIsLoggedIn }) => (
  <div className="">
    <div className="">
      <CustomNavbar
        name=""
        userImage="/Users/qbatch/Desktop/project/src/assets/Bell.png"
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
    <div className="">{children}</div>
  </div>
);

export default MainPageLayout;
