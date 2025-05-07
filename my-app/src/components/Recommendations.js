"use client";

export default function Recommendations({ data }) {
    if (!data || !data.recommendations || data.recommendations.length === 0) {
        return <p className="text-[var(--color-text-secondary)]">No recommendations available at this time.</p>;
    }

    const { recommendations } = data;

    return (
        <div className="space-y-4">
            <p className="text-lg mb-2">
                Based on your preferences, you might like:
            </p>
            <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                    <li key={rec.business_id || index} className="p-3 bg-[var(--background)] rounded-md shadow">
                        <h3 className="text-md font-semibold text-[var(--color-accent-primary)] mb-1">{rec.name}</h3>
                        {rec.categories && rec.categories.length > 0 && (
                            <div className="text-xs">
                                {rec.categories.map(category => (
                                    <span
                                        key={category}
                                        className="inline-block bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full mr-1 mb-1"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
