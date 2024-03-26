import { Link } from 'react-router-dom';

import "./css/kmolocr-bc2ca5.webflow.css";
import "./css/normalize.css";
import "./css/webflow.css";

const About = () => {
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
                <div id="w-node-_9b2922ad-09b1-aebb-0430-7dee623c62c1-8ab1a17b" class="about-head-text-wrap">
                    <h1 class="hi-there-heading">What is K-molocr?</h1>
                    <p class="paragraph-light">K-molocr is ...</p>
                </div>
            </div>
        </div>
        <div class="footer-wrap">
            <div>
                <a href="https://webflow.com/" target="_blank" class="webflow-link w-inline-block">
                    <div class="paragraph-tiny">K-molocr</div>
                </a>
            </div>
        </div>
        </>
    )
}

export default About;