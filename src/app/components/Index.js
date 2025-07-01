"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Search, TrendingUp, Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import AuthButton from "./AuthButton";

const categories = ["All", "Technology", "Business", "Marketing", "Workplace", "Environment", "Security"];

export default function Index({ mockArticles }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredArticles = mockArticles.filter(article => {
        const matchesSearch =
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.meta.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || article.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    //Latest two articles are considered trending
    mockArticles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const trendingArticles = mockArticles.slice(0, 2);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <TrendingUp className="h-8 w-8 text-blue-600" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                TrendWise
                            </h1>
                        </div>
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
                            <Link href="/trending" className="text-gray-600 hover:text-blue-600 transition-colors">Trending</Link>
                            <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">Categories</Link>
                            <Button variant="outline" size="sm" onClick={() => router.push("/api/auth/signin")}>Sign In</Button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
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

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative mb-12">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-full"
                        />
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            {trendingArticles.length > 0 && (
                <section className="py-12 px-4">
                    <div className="container mx-auto">
                        <div className="flex items-center mb-8">
                            <TrendingUp className="h-6 w-6 text-red-500 mr-2" />
                            <h3 className="text-2xl font-bold text-gray-800">Trending Now</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {trendingArticles.map((article) => (
                                <Link
                                    key={article.title}
                                    href={`/article/${article.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                >
                                    <div className="relative">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                                            Trending
                                        </Badge>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                                            {article.title}
                                        </h4>
                                        <p className="text-gray-600 mb-4 line-clamp-2">{article.meta.title}</p>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center">
                                                    <User className="h-4 w-4 mr-1" />
                                                    {article.author}
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    {new Date(article.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <span>{article.readTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Category Filter */}
            <section className="py-8 px-4">
                <div className="container mx-auto">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category)}
                                className={`rounded-full ${selectedCategory === category
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-600 hover:bg-blue-50"
                                    }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-gray-800">Latest Articles</h3>
                        <p className="text-gray-600">{filteredArticles.length} articles found</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map((article) => (
                            <Link
                                key={article.title}
                                href={`/article/${article.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="relative">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                                        {article.category}
                                    </Badge>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {article.title}
                                    </h4>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center space-x-2">
                                            <User className="h-4 w-4" />
                                            <span>{article.author}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-sm text-gray-500">{article.readTime}</span>
                                        <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4 mt-20">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <TrendingUp className="h-6 w-6 text-blue-500" />
                                <h4 className="text-xl font-bold">TrendWise</h4>
                            </div>
                            <p className="text-gray-400">
                                Your go-to source for trending insights and AI-powered content curation.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Quick Links</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                                <li><Link href="/trending" className="hover:text-white transition-colors">Trending</Link></li>
                                <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Categories</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/category/technology" className="hover:text-white transition-colors">Technology</Link></li>
                                <li><Link href="/category/business" className="hover:text-white transition-colors">Business</Link></li>
                                <li><Link href="/category/marketing" className="hover:text-white transition-colors">Marketing</Link></li>
                                <li><Link href="/category/environment" className="hover:text-white transition-colors">Environment</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Connect</h5>
                            <p className="text-gray-400 mb-4">
                                Stay updated with the latest trends and insights.
                            </p>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} TrendWise. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
