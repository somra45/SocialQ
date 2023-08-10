import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar/NavBar";
import "./MainPage.css"
function MainPage() {
    return (
      <>
      <div className="main-page-container">
          <div className="splash-page-background">
            {/* <NavBar/> */}
            <Link to="/login"><button className="splash-sign-in">Sign In</button></Link>
            <Link to="/signup"><button className="splash-sign-in">Sign Up</button></Link>
            
            
          </div>
      </div >
      </>
    );
  }
  
  export default MainPage;