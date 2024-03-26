import { Link } from 'react-router-dom';

import "./css/kmolocr-bc2ca5.webflow.css";
import "./css/normalize.css";
import "./css/webflow.css";

const Code = () => {
    return(
        <>
        <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navigation w-nav">
            <div class="navigation-items">
                <Link to="/" className="logo-link w-nav-brand w--current"><h5 class="heading">K-molocr</h5></Link>
                <div class="navigation-wrap">
                    <nav role="navigation" class="navigation-items w-nav-menu">
                        <Link to='/' className="navigation-item w-nav-link w--current">Home</Link>
                        <Link to='/About' className="navigation-item w-nav-link">About</Link>
                        <Link to='/Code' className="navigation-item w-nav-link">Code</Link>
                    </nav>
                    <div class="menu-button w-nav-button"><img src="images/menu-icon_1menu-icon.png" width="22" alt="" class="menu-icon"/></div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container">
                <div>
                    <h1>Front-end</h1>
                </div>
                <div>
                    <h1>Back-end</h1>
                </div>
                <div>
                    <h1>Detection</h1>
                </div>
                <div>
                    <h1>...</h1>
                </div>
            </div>
        </div>
        </>
    )
}

export default Code;