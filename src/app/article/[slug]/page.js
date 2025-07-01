// app/article/[slug]/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import ArticleDetailPage from "../../components/ArticleDetail";

async function getArticle(slug) {
    try {
        const res = await fetch(`http://localhost:5000/api/articles/${slug}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

export default async function ArticlePage({ params }) {
    const session = await getServerSession(authOptions);
    const article = await getArticle(params.slug);

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
                    <p className="text-gray-600 mb-6">
                        You must be signed in to view this article. Please log in to continue.
                    </p>
                    <a
                        href="/api/auth/signin"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Sign In
                    </a>
                </div>
            </div>
        );
    }

    return <ArticleDetailPage article={article} />;
}
