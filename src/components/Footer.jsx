import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faVk, faTiktok } from '@fortawesome/free-brands-svg-icons';
import logo from "../assets/logo.svg"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-about">
                    <img src={logo} alt="Logo" className="footer-logo" />
                    <p>
                        Movies & TV Shows, Online cinema,<br />
                        Movie database React Template.
                    </p>
                    <div className="social-icons">

                        <a href="https://facebook.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="https://vk.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faVk} /></a>
                        <a href="https://tiktok.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTiktok} /></a>
                    </div>
                </div>


                <div className="footer-links">
                    <div className="footer-col">
                        <h4>FlixTV</h4>
                        <ul>

                            <li><Link to="/about">About us</Link></li>
                            <li><Link to="/profile">My profile</Link></li>
                            <li><Link to="/pricing">Pricing plans</Link></li>
                            <li><Link to="/contacts">Contacts</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Browse</h4>
                        <ul>
                            <li><Link to="/live-tv">Live TV</Link></li>
                            <li><Link to="/news">Live News</Link></li>
                            <li><Link to="/sports">Live Sports</Link></li>
                            <li><Link to="/library">Streaming Library</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>&nbsp;</h4>
                        <ul>
                            <li><Link to="/tv-shows">TV Shows</Link></li>
                            <li><Link to="/movies">Movies</Link></li>
                            <li><Link to="/kids">Kids</Link></li>
                            <li><Link to="/collections">Collections</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Help</h4>
                        <ul>
                            <li><Link to="/account">Account & Billing</Link></li>
                            <li><Link to="/plans">Plans & Pricing</Link></li>
                            <li><Link to="/devices">Supported devices</Link></li>
                            <li><Link to="/accessibility">Accessibility</Link></li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>© FlixTV.template, 2026. Created by Thaw Zin.</p>
                    <div className="bottom-links">
                        <Link to="/privacy">Privacy policy</Link>
                        <Link to="/terms">Terms and conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;