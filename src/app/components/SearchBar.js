// components/SearchBar.js
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
    return (
        <div className="max-w-md mx-auto relative mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
                type="text"
                placeholder="Search articles..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-full"
            />
        </div>
    );
}
