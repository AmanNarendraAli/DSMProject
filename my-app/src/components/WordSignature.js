"use client";

import { WordCloud } from '@isoterik/react-word-cloud';
import { useState, useCallback } from 'react';

// Adjusted defaultFontSize to make words a bit smaller overall.
// Experiment with the multiplier (e.g., 1.5 or 1.8 instead of 2, or even 1.2 if needed).
const defaultFontSize = (word) => Math.sqrt(word.value) * 1.8;

// SelfContainedWordRenderer manages its own hover state for individual word hover effects
const SelfContainedWordRenderer = ({ wordData }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);

    return (
        <text
            key={wordData.text + wordData.value} // Unique key for each word
            textAnchor="middle"
            transform={`translate(${wordData.x}, ${wordData.y}) rotate(${wordData.rotate})`}
            style={{
                fontSize: wordData.size, // Calculated by WordCloud library based on defaultFontSize
                fontFamily: wordData.font, // Passed from WordCloud props
                fontWeight: wordData.weight, // Passed from WordCloud props
                fill: 'var(--color-accent-primary)', // Ensure this CSS variable is defined
                cursor: 'pointer',
                transition: 'filter 0.2s ease-out',
                filter: isHovered ? 'brightness(1.5)' : 'brightness(1)', // Visual hover effect
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {wordData.text}
        </text>
    );
};


export default function WordSignature({ data }) {
    // `data` prop is expected to be an object like:
    // { signature: [{ term: "someWord", score: 0.8 }, { term: "another", score: 0.5 }] }

    if (!data || !data.signature || data.signature.length === 0) {
        return <p className="text-[var(--color-text-secondary)]">Word signature data is not available.</p>;
    }

    // Prepare words array for the WordCloud component.
    // The 'value' property is used by defaultFontSize and by the library for tooltips.
    // Adjust the multiplier (e.g., item.score * 1000) based on the typical range of your scores
    // to get appropriate sizes. If scores are very small (0.001), multiplier needs to be larger.
    // If scores are like 1-100, multiplier can be smaller.
    const words = data.signature.map(item => ({
        text: item.term,
        value: item.score * 1000, // This scales the score to influence font size
    }));

    // Important for components that might not render correctly during Server-Side Rendering (SSR)
    // or that rely on browser APIs. WordCloud might be one such case.
    if (typeof window === 'undefined') {
        return null; // Or a placeholder/loader
    }

    // Memoize the renderWord callback.
    // Since SelfContainedWordRenderer manages its own state and doesn't depend on WordSignature's state,
    // this callback is stable (created once) if its dependencies don't change.
    const renderWordWithLocalHover = useCallback((wordData) => (
        <SelfContainedWordRenderer wordData={wordData} />
    ), []); // Empty dependency array means this callback is created once


    return (
        // Ensure the container div has explicit dimensions, or WordCloud might not render correctly.
        <div style={{ width: '100%', height: '400px' }}>
            <WordCloud
                words={words} // The array of {text, value} objects
                width={500}   // Explicit width for the canvas. Adjust as needed.
                height={400}  // Explicit height for the canvas. Adjust as needed.
                font={'var(--font-inter)'} // CSS variable for font family. Ensure it's defined.
                fontSize={defaultFontSize}  // Function to calculate font size for each word
                // Rotation logic: ~30% chance of rotating, then 50/50 for +90 or -90 degrees.
                rotate={() => (Math.random() > 0.7 ? (Math.random() > 0.5 ? 90 : -90) : 0)}
                padding={5} // Increased padding to reduce overlap. Experiment with 5, 8, 10, etc.
                enableTooltip={true} // Let the library handle tooltips (shows text/value)
                renderWord={renderWordWithLocalHover} // Custom renderer for hover effects & styling
            />
        </div>
    );
}