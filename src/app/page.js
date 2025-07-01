import ArticleList from "./components/ArticleList";
import Header from "./components/Header";
import Index from "./components/Index";
import Article from "./components/ArticleCard";
export default async function Home() {
  const res = await fetch('http://localhost:5000/api/articles', { cache: "no-store" });
  const articles = await res.json();

  return (
    <>
    
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-5">
      {/* <h1 className="text-4xl font-extrabold text-center mb-12">
        <span className="text-blue-600">Trending</span> Articles
      </h1> */}
      
      <Index mockArticles={articles} />
    </div>
    </>
  );
}
// "use client";
// import { useState } from 'react';
// import Header from './components/Header';
// import HeroSection from './components/HeroSection';
// import TrendingSection from './components/TrendingSection';
// import ArticleCard from './components/ArticleCard';
// import Footer from './components/Footer';
// import { Button } from './components/ui/button';

// async function getArticles() {
//   try {
//     const res = await fetch('http://localhost:5000/api/articles', { cache: 'no-store' });
//     if (!res.ok) throw new Error('Failed to fetch articles');
//     return res.json();
//   } catch (error) {
//     console.error('Error fetching articles:', error);
//     return [];
//   }
// }

// export default async function Home() {
//   const articles = await getArticles();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       <Header />
//       <HeroSection onSearch={(term) => console.log('Search:', term)} />

//       {articles.length > 0 && (
//         <>
//           <TrendingSection articles={articles} />

//           <section className="py-12 px-4">
//             <div className="container mx-auto">
//               <div className="flex items-center justify-between mb-8">
//                 <h3 className="text-2xl font-bold text-gray-800">Latest Articles</h3>
//                 <p className="text-gray-600">{articles.length} articles found</p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {articles.map((article) => (
//                   <ArticleCard key={article._id} article={article} />
//                 ))}
//               </div>
//             </div>
//           </section>
//         </>
//       )}

//       <Footer />
//     </div>
//   );
// }
