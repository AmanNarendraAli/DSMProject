"use client";

// import ReactWordcloudNext from '@korarit/react-wordcloud-next'; // Remove old import
import { WordCloud } from '@isoterik/react-word-cloud'; // Corrected: Named import

// Options for @isoterik/react-word-cloud
// Refer to its documentation for all available props
// https://github.com/isoteriksoftware/react-word-cloud?tab=readme-ov-file#configuring-other-properties
const defaultFontSize = (word) => Math.sqrt(word.value) * 2; // Example: scale sqrt of value, then multiply
// Our 'value' is already item.score * 1000
// So Math.sqrt(item.score * 1000) * 2
// e.g. score 0.1 -> value 100 -> sqrt 10 -> size 20
// e.g. score 0.4 -> value 400 -> sqrt 20 -> size 40

export default function WordSignature({ data }) {
    if (!data || !data.signature || data.signature.length === 0) {
        return <p className="text-[var(--color-text-secondary)]">Word signature data is not available.</p>;
    }

    // Data format { text: string, value: number } should be compatible with most word cloud libs
    const words = data.signature.map(item => ({
        text: item.term,
        value: item.score * 1000, // Keep scaling for now, adjust if needed
    }));

    console.log("Word cloud data (for @isoterik/react-word-cloud):", words); // Keep log

    // Client-side check remains important
    if (typeof window === 'undefined') {
        return null;
    }

    // Adapt component usage based on @isoterik/react-word-cloud's expected props
    return (
        <div style={{ width: '100%', height: '300px' }}>
            <WordCloud
                words={words} // Corrected prop name
                width={500} // Explicit width/height as per docs example
                height={300}
                font={'var(--font-inter)'} // Pass font family directly
                fontSize={defaultFontSize} // Use the function for dynamic font size
                rotate={() => (Math.random() > 0.7 ? (Math.random() > 0.5 ? 90 : -90) : 0)} // ~30% words rotated
                padding={2}
                enableTooltip={true}
            // fill can be a function: (word, index) => colors[index % colors.length]
            // For simplicity, letting it use its default or a single color for now
            // fill={"var(--color-accent-primary)"} 
            />
        </div>
    );
}
