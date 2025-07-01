// components/TrendingSection.js
import ArticleCard from './ArticleCard';
import { TrendingUp } from 'lucide-react';

export default function TrendingSection({ articles }) {
    const trendingArticles = articles.slice(0, 2);

    return (
        <section className="py-12 px-4">
            <div className="container mx-auto">
                <div className="flex items-center mb-8">
                    <TrendingUp className="h-6 w-6 text-red-500 mr-2" />
                    <h3 className="text-2xl font-bold text-gray-800">Trending Now</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {trendingArticles.map((article) => (
                        <ArticleCard key={article._id} article={article} isTrending={true} />
                    ))}
                </div>
            </div>
        </section>
    );
}
