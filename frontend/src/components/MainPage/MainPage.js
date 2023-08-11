import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar/NavBar";
import "./MainPage.css"
function MainPage() {
    return (
      
      <div className="main-page-container">
          <div className="splash-page-background">
            {/* <NavBar/> */}
            <div className="header-container">
              <h1 className="splash-header">Welcome to </h1>
              <h1 className="splash-header">SocialQ</h1>
            </div>

            
            <h1 className="landing-description">Our goal is to provide influencers with a seamless way to generate and deploy content</h1>

            
            <Link to="/signup"><button className="splash-sign-in">Sign Up Here!</button></Link>

            
            <Link to="/login"><button className="splash-sign-in">Sign In</button></Link>


            
            
          </div>
      </div >
  
    );
  }
  
  export default MainPage;