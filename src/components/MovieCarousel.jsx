import { useRef, useEffect, useState } from "react";
import "./MovieCarousel.css";

function MovieCarousel({ children }) {
    const carouselRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [items, setItems] = useState([]);
    const [jumpCount, setJumpCount] = useState(0);

    const totalOriginal = children.length;
    const baseCloneCount = 10;

    // Initialize with enough items
    useEffect(() => {
        const initialItems = Array(baseCloneCount * 3).fill(children).flat();
        console.log("Initial items count:", initialItems);
        setItems(initialItems);
    }, [children]);


    const getCardWidth = () => {
        const card = carouselRef.current?.querySelector(".movie-card");
        if (!card) return 0;
        const gap = 20;
        return card.offsetWidth + gap;
    };

    const scrollNext = () => {
        const cardWidth = getCardWidth();
        if (cardWidth === 0) return;

        setIsScrolling(true);
        carouselRef.current.scrollBy({
            left: cardWidth * 3,
            behavior: "smooth",
        });

        setTimeout(() => setIsScrolling(false), 500);
    };

    const scrollPrev = () => {
        const cardWidth = getCardWidth();
        if (cardWidth === 0) return;

        setIsScrolling(true);
        carouselRef.current.scrollBy({
            left: -cardWidth * 3,
            behavior: "smooth",
        });

        setTimeout(() => setIsScrolling(false), 500);
    };

    // Dynamic item management
    useEffect(() => {
        const container = carouselRef.current;
        if (!container || items.length === 0) return;

        let scrollTimeout;

        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            setIsScrolling(true);

            scrollTimeout = setTimeout(() => {
                const cardWidth = getCardWidth();
                if (cardWidth === 0) return;

                const scrollLeft = container.scrollLeft;
                const totalWidth = cardWidth * totalOriginal;
                const currentSection = Math.floor(scrollLeft / totalWidth);
                const totalSections = items.length / totalOriginal;

                // Near the end - add more items
                if (currentSection > totalSections - 3) {
                    const newItems = [...items, ...Array(3).fill(children).flat()];
                    setItems(newItems);
                }

                // Near the beginning - add items to front
                if (currentSection < 3) {
                    const newItems = [...Array(3).fill(children).flat(), ...items];
                    setItems(newItems);
                    // Adjust scroll position
                    container.scrollLeft = scrollLeft + (cardWidth * totalOriginal * 3);
                }

                // Random jump with multiple strategies
                if (currentSection < 2 || currentSection > totalSections - 2) {
                    setJumpCount(prev => prev + 1);

                    // Strategy changes based on jump count
                    let targetSection;

                    if (jumpCount % 3 === 0) {
                        // Jump to random section
                        targetSection = 5 + Math.floor(Math.random() * 5);
                    } else if (jumpCount % 3 === 1) {
                        // Jump with progressive offset
                        targetSection = 5 + (jumpCount % 3);
                    } else {
                        // Jump to middle
                        targetSection = Math.floor(totalSections / 2);
                    }

                    const randomOffset = Math.floor(Math.random() * totalOriginal) * cardWidth;
                    const newPosition = (targetSection * totalWidth) + (scrollLeft % totalWidth) + randomOffset;

                    // Instant jump
                    container.scrollLeft = newPosition;
                }

                setIsScrolling(false);
            }, 100);
        };

        container.addEventListener("scroll", handleScroll);
        return () => {
            container.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, [items, totalOriginal, jumpCount, children]);

    // Set initial position
    useEffect(() => {
        if (carouselRef.current && items.length > 0) {
            const cardWidth = getCardWidth();
            const startSection = Math.floor(items.length / totalOriginal / 2);
            const randomOffset = Math.floor(Math.random() * totalOriginal) * cardWidth;
            carouselRef.current.scrollLeft = (startSection * totalOriginal * cardWidth) + randomOffset;
        }
    }, [items]);

    // Auto play with variable speed
    useEffect(() => {
        if (isHovered || isScrolling) return;

        const randomInterval = 3000 + Math.random() * 3000; // 3-6 seconds
        const interval = setInterval(() => {
            scrollNext();
        }, randomInterval);

        return () => clearInterval(interval);
    }, [isHovered, isScrolling]);

    return (
        <div
            className="carousel-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button className="arrow left" onClick={scrollPrev}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="white" />
                </svg>
            </button>

            <div className="carousel-wrapper" ref={carouselRef}>
                <div className="carousel-track">
                    {items.map((child, index) => (
                        <div key={index} className="carousel-item">
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            <button className="arrow right" onClick={scrollNext}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="white" />
                </svg>
            </button>
        </div>
    );
}

export default MovieCarousel;