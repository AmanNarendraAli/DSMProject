"use client";

export default function InfluencePercentile({ data }) {
    if (!data || data.overall_influence_percentile === null || data.overall_influence_percentile === undefined) {
        return <p className="text-[var(--color-text-secondary)]">Influence percentile data is not available.</p>;
    }

    const percentile = Math.round(data.overall_influence_percentile);

    return (
        <div>
            <p className="text-lg md:text-xl">
                Your influence puts you at the
                <span className="font-bold text-[var(--color-accent-primary)] text-2xl md:text-3xl mx-2">{percentile}th</span>
                percentile.
            </p>
        </div>
    );
}
