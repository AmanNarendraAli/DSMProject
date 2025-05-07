"use client";

import ReactWordcloudNext from '@korarit/react-wordcloud-next';

// Default options for the word cloud, can be customized
const wordcloudOptions = {
    rotations: 2,
    rotationAngles: [-90, 0], // Prefer horizontal and vertical words
    fontSizes: [20, 80], // Range of font sizes
    fontFamily: 'var(--font-inter)', // Use Inter font
    colors: ["#1DB954", "#1ED760", "#1AAE4E", "#FFFFFF", "#B3B3B3"], // Spotify-like colors
    enableTooltip: true,
    deterministic: false, // For more varied layouts on each render, set to true for consistent layout
    padding: 1,
    scale: 'sqrt', // How word sizes are scaled based on value
    spiral: 'archimedean', // Layout algorithm
    transitionDuration: 1000,
};

export default function WordSignature({ data }) {
    if (!data || !data.signature || data.signature.length === 0) {
        return <p className="text-[var(--color-text-secondary)]">Word signature data is not available.</p>;
    }

    // The library expects data in the format: { text: string, value: number }[]
    const words = data.signature.map(item => ({
        text: item.term,
        value: item.score * 1000, // Scale score for better visual representation if scores are small
    }));

    +    console.log("Word cloud data:", words); // Log the data passed to the component
    +
     // Ensure the component only renders on the client-side where window is available
     // react-wordcloud-next might rely on browser APIs not available during SSR
     if (typeof window === 'undefined') {
        return null; // Or a loading spinner
    }

    return (
        <div style={{ width: '100%', height: '300px' }}> {/* Ensure container has dimensions */}
            <ReactWordcloudNext
                words={words}
                options={wordcloudOptions}
            // maxWords={100} // Optional: limit number of words
            />
        </div>
    );
}
