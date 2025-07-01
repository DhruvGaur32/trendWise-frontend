"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import AuthButton from "./AuthButton";

export default function ArticleList({ articles }) {
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex justify-end mb-6">
        <AuthButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div
            key={article._id}
            className="relative group bg-white border rounded-xl p-0 shadow transition-all hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Card image with zoom effect */}
            <div className="overflow-hidden rounded-t-xl">
              {article.media?.images?.[0] ? (
                <img
                  src={article.media.images[0]}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-xl">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>

            <div className="p-5">
              {/* Optional: Category badge */}
              {article.category && (
                <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                  {article.category}
                </span>
              )}

              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-700 mb-4">
                {article.excerpt ||
                  (article.content?.replace(/<[^>]+>/g, '').substring(0, 120) + "...")}
              </p>

              {/* Only logged in users can open the article */}
              {session ? (
                <Link
                  href={`/article/${article.slug}`}
                  className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  aria-label={`Read more about ${article.title}`}
                >
                  Read More
                </Link>
              ) : (
                <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-xl group-hover:bg-white/90 transition">
                  <span className="text-gray-500 font-medium mb-2">Login to read</span>
                  <AuthButton />
                </div>
              )}
            </div>

            {/* Show comment button only if user is logged in */}
            <div className="px-5 pb-4">
              {session ? (
                <button className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  Comment
                </button>
              ) : (
                <p className="mt-4 text-sm text-gray-400 italic text-center">Login to comment</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
