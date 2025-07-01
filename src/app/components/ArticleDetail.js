import React from 'react';
import SEO from './SEO';
import Link from 'next/link';
import Image from 'next/image';

const ArticleDetail = ({ article }) => {
    if (!article) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-20">
                    <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
                    <Link href="/" className="text-blue-600 hover:underline">
                        Return to homepage
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <SEO
                title={article.meta?.title || article.title}
                description={article.meta?.description || `Read about ${article.title} on TrendWise`}
            />
            <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
                &larr; Back to Home
            </Link>
            <article className="bg-zinc p-6 rounded-lg shadow-md">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
                    {article.meta?.keywords && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {article.meta.keywords.map((tag, i) => (
                                <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{tag}</span>
                            ))}
                        </div>
                    )}
                </header>
                {/* Embedded Media */}
                {article.media && (
                    <div className="mb-8">
                        {article.media.images?.map((img, i) => (
                            <Image key={i} src={img} alt={article.title + ' image'} width={800} height={500} loading="lazy" className="rounded-lg mb-4" />
                        ))}
                        {article.media.videos?.map((video, i) => (
                            <div key={i} className="aspect-w-16 aspect-h-9 mb-4">
                                <iframe
                                    src={video}
                                    title={article.title + ' video'}
                                    className="w-full h-64 rounded-lg"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ))}
                    </div>
                )}
                {/* Article Content */}
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
                <footer className="mt-12 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Published on {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                </footer>
            </article>
        </div>
    );
};

export default ArticleDetail;
