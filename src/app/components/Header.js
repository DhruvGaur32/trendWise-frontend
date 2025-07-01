// components/Header.js
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import AuthButton from './AuthButton';

export default function Header() {
    return (
        <header className="bg-white backdrop-blur-md border-b sticky top-0 z-50">
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
                        <AuthButton />
                    </nav>
                </div>
            </div>
        </header>
    );
}
