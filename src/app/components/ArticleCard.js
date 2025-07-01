"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Search, TrendingUp, Calendar, User, ArrowRight, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import AuthButton from "./AuthButton";

const ArticleCard = ({ article, isTrending = false }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleClick = () => {
        if (session) {
            router.push(`/article/${article.slug}`);
        } else {
            router.push('/api/auth/signin');
        }
    };

    return (
        <div
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            onClick={handleClick}
            role="button"
            tabIndex={0}
        >
            <div className="relative">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {isTrending ? (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                        Trending
                    </Badge>
                ) : (
                    <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                        {article.category}
                    </Badge>
                )}
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

            {!session && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <Lock className="h-8 w-8 text-white mb-2" />
                    <p className="text-white font-bold text-lg mb-3">Login to read</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        Sign In
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ArticleCard;
