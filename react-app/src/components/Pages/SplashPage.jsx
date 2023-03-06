import ProfileButton from "../Navigation/ProfileButton";
import SplashButtons from "../Navigation/SplashButtons";
import DemoUserButton from "../Buttons/DemoUserButton";
function SplashPage(){

    return(
        <div className="splash-container">
        <div className="splash-background">

            <SplashButtons/>
        </div>
    {/* <div class='splash-footer-container'>


        <div class='footer-img-container'>
        <p class='footer-name'> Developed By: <span style={{fontWeight: 900}}>Arko Chakrabarty | </span>

            <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' class='github-img'
            onClick={() => window.open('https://github.com/SA-Ark')}></img>
            <span class='github-text' onClick={() => window.open('https://github.com/SA-Ark')}>
            GitHub
            </span>
        </p>

    </div>
    </div> */}
    </div>

    )
}

export default SplashPage
