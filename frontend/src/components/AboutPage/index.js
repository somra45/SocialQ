import NavBar from '../NavBar/NavBar';
import './AboutPage.css';

const AboutPage = () => {
    return (
        <>
        <NavBar />
         <div className='splash-page-container'>

        <div className='splash-inner-container'>

        <div className='team-member-container'>

            <img className="team-member-picture"src='./assets/images/Harvey.png' alt='harvey'></img>
        
            <div className='team-member-bio'>
            <h1 className='team-member-name'>Harvinder Somra</h1>
            <h2 className='team-member-role'>Project Manager</h2>
            <br/>
            <p>About Me:</p>
            <br/>
            <p>I love hiking and gaming, and pursuing my dream of  </p>
            <p>traveling the world while I contribute to making it better</p>
            <br/>
            < a href="https://github.com/somra45" className="fa-brands fa-github fa-2xl" style={{color: "#ffff",}}> </a>  < a href="https://www.linkedin.com/in/harvinder-somra-39ba536a/" className="fa-brands fa-linkedin fa-2xl" style={{color: "#ffff",}}> </a>
            </div>

        </div>

        <div className='team-member-container'>
                
                <img className="team-member-picture" src='./assets/images/Joe.png' alt='harvey'></img>
                
                <div className='team-member-bio'>
                    <h1 className='team-member-name'>Joe Randazzo</h1>
                    <h2 className='team-member-role'>Backend Engineer</h2>
                    <br/>
                    <p>About Me: </p>
                    <br/>
                    <p>When I'm not playing dodgeball, I'm equally passionate about academic</p>
                    <p>pursuits and fostering meaningful connections with those around me</p>
                    <br/>
                    <p></p>
                    <br/>
                    < a href="https://github.com/jprandazzo" className="fa-brands fa-github fa-2xl" style={{color: "#ffff",}}> </a>  < a href="https://www.linkedin.com/in/jprandazzo/" className="fa-brands fa-linkedin fa-2xl" style={{color: "#ffff",}}> </a>
                </div>

        </div>

        <div className='team-member-container'>
                
                <img className="team-member-picture"src='./assets/images/Theo.png' alt='harvey'></img>
                
                <div className='team-member-bio'>
                    <h1 className='team-member-name'>Theofanis Neofotistos</h1>
                    <h2 className='team-member-role'>Frontend Engineer & UX/UI</h2>
                    <p>About Me:</p>
                    <br/>
                    <p>While not playing card games or solving puzzles I love traveling the world </p>
                    <p>and learning about different cultures</p>
                    <br/>
                    < a href="https://github.com/TheofanisNeofotistos" className="fa-brands fa-github fa-2xl" style={{color: "#ffff",}}> </a>  < a href="https://www.linkedin.com/in/theofanis-neofotistos-483b33254/" className="fa-brands fa-linkedin fa-2xl" style={{color: "#ffff",}}> </a>
                </div>

        </div>

        <div className='team-member-container'>
                
                <img className="team-member-picture"src='./assets/images/Max.png' alt='harvey'></img>
                
                <div className='team-member-bio'>
                    <h1 className='team-member-name'>Max Carpenter</h1>
                    <h2 className='team-member-role'>Full Stack Support Engineer</h2>
                    <p>About Me:</p>
                    <br/>
                    <p>Max is a software engineer, crossword constructor, film programmer,</p>
                    <p> and writer based in New York.</p>
                    <br/>
                    < a href="https://github.com/mxcrpntr" className="fa-brands fa-github fa-2xl" style={{color: "#ffff",}}> </a>  < a href="https://www.linkedin.com/in/max-carpenter-245746288/" className="fa-brands fa-linkedin fa-2xl" style={{color: "#ffff",}}> </a>
                </div>

        </div>

        </div>
  
</div>

        </>
    )
}

export default AboutPage