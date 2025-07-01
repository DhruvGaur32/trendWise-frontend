// components/Footer.js
import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
    return (
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
                            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="/trending" className="hover:text-white transition-colors">Trending</a></li>
                            <li><a href="/categories" className="hover:text-white transition-colors">Categories</a></li>
                            <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-semibold mb-4">Categories</h5>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/category/technology" className="hover:text-white transition-colors">Technology</a></li>
                            <li><a href="/category/business" className="hover:text-white transition-colors">Business</a></li>
                            <li><a href="/category/marketing" className="hover:text-white transition-colors">Marketing</a></li>
                            <li><a href="/category/environment" className="hover:text-white transition-colors">Environment</a></li>
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
    );
}
