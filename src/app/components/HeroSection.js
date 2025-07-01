// components/HeroSection.js
import SearchBar from './SearchBar';

export default function HeroSection({ onSearch }) {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto text-center">
                <h2 className="text-5xl font-bold text-gray-800 mb-6">
                    Stay Ahead with{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Trending Insights
                    </span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Discover the latest trends, insights, and stories that matter.
                    AI-powered content curation brings you the most relevant articles.
                </p>
                <SearchBar onSearch={onSearch} />
            </div>
        </section>
    );
}
