import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/moviesSlice";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { GoSignIn } from "react-icons/go";
import "./Navbar1.css";
import logo from "../assets/logo.svg";

function Navbar() {
    const dispatch = useDispatch();
    const search = useSelector((state) => state.movies.search);
    const [menuOpen, setMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);

    // Add effect to close menu when resizing above mobile breakpoint
    useEffect(() => {
        const handleResize = () => {
            // Check if window width is above mobile breakpoint (768px)
            if (window.innerWidth >= 768 && menuOpen) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, [menuOpen]); // Add menuOpen as dependency

    useEffect(() => {
        if (menuOpen && mobileMenuRef.current) {
            const height = mobileMenuRef.current.offsetHeight;
            document.body.style.marginTop = `${height}px`;
            document.body.classList.add('menu-open');
        } else {
            document.body.style.marginTop = '0';
            document.body.classList.remove('menu-open');
        }

        return () => {
            document.body.style.marginTop = '0';
            document.body.classList.remove('menu-open');
        };
    }, [menuOpen]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && menuOpen) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [menuOpen]);

    // Update the existing resize effect to include menu height adjustment
    useEffect(() => {
        const handleResize = () => {
            if (menuOpen && mobileMenuRef.current) {
                const height = mobileMenuRef.current.offsetHeight;
                document.body.style.marginTop = `${height}px`;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [menuOpen]);

    const menuItems = [
        { name: 'Home', hasDot: true },
        { name: 'Catalog', hasDot: true },
        { name: 'Pricing plans', hasDot: false },
        { name: 'Live', hasDot: false, isLive: true },
        { name: '...', hasDot: false, isMore: true }
    ];

    const handleMenuItemClick = (item) => {
        console.log(`Navigating to ${item.name}`);
        setMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Menu */}
            <div
                className={`mobile-menu ${menuOpen ? 'open' : ''}`}
                ref={mobileMenuRef}
            >
                <ul className="mobile-menu-items">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleMenuItemClick(item)}
                            style={{ '--item-index': index }}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>

                {/* Bottom navbar with X */}
                <div className="mobile-navbar">
                    <div className="mobile-nav-left">
                        <button
                            className="mobile-menu-toggle"
                            onClick={() => setMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <FaTimes />
                        </button>
                        <img src={logo} alt="Logo" className="mobile-nav-logo" />
                    </div>
                    <div className="mobile-nav-right">
                        <FaSearch className="mobile-search-icon" />
                        <div className="mobile-signin">
                            <span>Sign In</span>
                            <GoSignIn />
                        </div>
                    </div>
                </div>
            </div>

            {/* Original Navbar */}
            <nav className={`navbar ${menuOpen ? 'original-hidden' : ''}`}>
                {/* Left: Hamburger + Logo */}
                <div className="nav-left">
                    <button
                        className="menu-toggle"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <FaBars />
                    </button>
                    <div className="logo-spacer"></div>
                    <img src={logo} alt="Logo" className="nav-logo" />
                </div>

                {/* Desktop Menu */}
                <ul className="nav-links">
                    {menuItems.map((item, index) => (
                        <li key={index} className={item.isLive ? 'live-item' : ''}>
                            <span onClick={() => handleMenuItemClick(item)}>
                                {item.name}
                            </span>
                            {item.hasDot && <span className="dot-separator">·</span>}
                            {item.isLive && (
                                <span className="live-indicator">
                                    <span className="live-dot"></span>
                                </span>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Right: Search + Sign In */}
                <div className="nav-right">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder="I'm looking for..."
                            value={search}
                            onChange={(e) => dispatch(setSearch(e.target.value))}
                        />
                        <FaSearch className="search-icon" />
                    </div>

                    <button className="signin-btn">
                        <span className="signin-text">Sign In</span>
                        <GoSignIn className="signin-icon" />
                    </button>
                </div>
            </nav>
        </>
    );
}

export default Navbar;