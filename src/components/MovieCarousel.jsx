import { useEffect, useState, useMemo, useCallback } from "react";
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import "./MovieCarousel.css";

function MovieCarousel({ children }) {
    const totalItems = children.length;
    const gap = 20;
    const cloneCount = 6;


    const [cardSize, setCardSize] = useState({ width: 450, height: 358.69 });
    const [itemsPerView, setItemsPerView] = useState(4);
    const [currentIndex, setCurrentIndex] = useState(cloneCount);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [useTransition, setUseTransition] = useState(true);
    const [offset, setOffset] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const fullCardWidth = cardSize.width + gap;

    const scrollNext = useCallback(() => {
        if (isTransitioning) return;
        setUseTransition(true);
        setIsTransitioning(true);


        setCurrentIndex((prev) => prev + itemsPerView);
    }, [isTransitioning, itemsPerView]);

    const scrollPrev = useCallback(() => {
        if (isTransitioning) return;
        setUseTransition(true);
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - itemsPerView);
    }, [isTransitioning, itemsPerView]);

    const handleTransitionEnd = useCallback(() => {
        setIsTransitioning(false);


        if (currentIndex >= totalItems + cloneCount) {
            setUseTransition(false);

            setCurrentIndex(currentIndex - totalItems);
        } else if (currentIndex <= cloneCount - itemsPerView) {
            setUseTransition(false);

            setCurrentIndex(currentIndex + totalItems);
        }
    }, [currentIndex, totalItems, cloneCount, itemsPerView]);

    useEffect(() => {
        const handleResize = () => {
            const containerWidth = window.innerWidth;
            let currentWidth;
            let currentHeight;


            if (containerWidth >= 1440) {

                currentWidth = 413.33;
                currentHeight = 329.45;
            } else if (containerWidth >= 1200) {

                currentWidth = 350;
                currentHeight = 278.98;
            } else if (containerWidth >= 768) {

                currentWidth = 450;
                currentHeight = 358.69;
            } else {

                currentWidth = 360;
                currentHeight = 286.95;
            }

            setCardSize({ width: currentWidth, height: currentHeight });

            const tempFullWidth = currentWidth + gap;
            const floatItems = containerWidth / tempFullWidth;

            const newItemsPerView = Math.floor(floatItems);

            const centerOffset = (containerWidth - currentWidth) / 2;

            setItemsPerView(newItemsPerView);
            setOffset(centerOffset);
            setUseTransition(false);
            setCurrentIndex(cloneCount);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [gap, cloneCount]);


    useEffect(() => {

        if (isPaused) return;

        const interval = setInterval(() => {
            scrollNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, scrollNext]);

    const extendedChildren = useMemo(() => {
        const firstBatch = children.slice(0, cloneCount);
        const lastBatch = children.slice(-cloneCount);
        return [...lastBatch, ...children, ...firstBatch];
    }, [children]);

    return (
        <div className="carousel-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)} >

            <button className="arrow left" onClick={scrollPrev}>
                <MdKeyboardArrowLeft size={30} />
            </button>

            <div className="carousel-wrapper" style={{ overflow: 'visible' }}>
                <div
                    className="carousel-track"
                    onTransitionEnd={handleTransitionEnd}
                    style={{
                        display: 'flex',
                        transform: `translateX(calc(-${currentIndex * fullCardWidth}px + ${offset}px))`,
                        transition: useTransition ? 'transform 0.5s ease-in-out' : 'none',
                    }}
                >
                    {extendedChildren.map((child, index) => (
                        <div
                            key={index}
                            style={{
                                flex: '0 0 auto',
                                width: `${cardSize.width}px`,
                                height: `${cardSize.height}px`,
                                marginRight: `${gap}px`,
                                boxSizing: 'border-box'
                            }}
                        >

                            {child}
                        </div>
                    ))}
                </div>
            </div>

            <button className="arrow right" onClick={scrollNext}>
                <MdOutlineKeyboardArrowRight size={30} />
            </button>
        </div>
    );
}

export default MovieCarousel;