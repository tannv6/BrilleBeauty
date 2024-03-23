/* eslint-disable @next/next/no-img-element */
import { useState } from "react";



export default function Start() {
    const [selectedStar, setSelectedStar] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);

    const handleMouseEnter = (num :any) => {
        setHoveredStar(num);
    };
  
    const handleMouseLeave = () => {
        setHoveredStar(0);
    };

    const handleClick = (num :any) => {
        setSelectedStar(num);
    };

    return (
        <div className="star-container flex gap-[3px]">
            {[1, 2, 3, 4, 5].map((index) => (
                <div
                    key={index}
                    className={index <= (hoveredStar || selectedStar) ? 'img_star' : 'img_star_none'}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
}
