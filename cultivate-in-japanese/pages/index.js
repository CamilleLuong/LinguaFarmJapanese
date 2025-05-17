import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CategorySection from '../components/CategorySection';
import Header from '../components/Header';

export default function Home({ lessons }) {
    const [filterLevels, setFilterLevels] = useState({
    beginner: true,
    intermediate: true,
    advanced: true,
  });

  const [showFilter, setShowFilter] = useState(false);

  const categories = [
    "Folklore, customs and traditions",
    "Literature and Art",
    "Society, Economy and Politics",
    "History",
    "Anime, Manga and Pop culture",
    "Geography, Travel and Tourism",
    "Biodiversity",
    "Japanese Songs",
    "Philosophy",
    "Thoughts",
    "Science and Medicine",
    "Technology"
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Banner Image */}
        <div className="relative w-full md:w-2/3 h-[500px]">
          <Image 
            src="/image/hero-placeholder.png" 
            alt="Hero" 
            layout="fill" 
            objectFit="cover" 
          />
        </div>

        {/* App Promo Section */}
        <div className="bg-yellow-600 w-full md:w-1/3 p-6 text-white">
          <h2 className="text-5xl font-bold mb-6 drop-shadow-md">Get the app</h2>
          <Link href="/android">
            <button className="bg-black text-white text-xl px-8 py-4 mb-8 block">Android -&gt;</button>
          </Link>
          <hr className="border-white mb-8" />
          <p className="mb-6 text-xl">Subscribe to a premium+ account and get access to all lessons</p>
          <Link href="/readmore">
            <button className="bg-black text-white text-xl px-8 py-4">Read More -&gt;</button>
          </Link>
        </div>
      </div>

      {/* Filter Button */}
      <div className="flex justify-end px-6 mt-6">
        <button
          onClick={() => setShowFilter(true)}
          className="text-gray-800 text-lg px-4 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100"
        >
          Filter
        </button>
      </div>

      {/* Filter Popup */}
      {showFilter && (
        <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Filter Options</h2>
            <div className="flex flex-col space-y-2 mb-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={filterLevels.beginner} onChange={() => setFilterLevels(prev => ({ ...prev, beginner: !prev.beginner }))} />
                <span>Beginner</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={filterLevels.intermediate} onChange={() => setFilterLevels(prev => ({ ...prev, intermediate: !prev.intermediate }))} />
                <span>Intermediate</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={filterLevels.advanced} onChange={() => setFilterLevels(prev => ({ ...prev, advanced: !prev.advanced }))} />
                <span>Advanced</span>
              </label>
            </div>
            <button
              onClick={() => setShowFilter(false)}
              className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Category Sections */}
      <div className="px-4 space-y-4">
        {categories.map(category => (
          <CategorySection
            key={category}
            category={category}
            lessons={lessons.filter(l => l.category === category && filterLevels[l.level])}
          />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const lessonDir = path.join(process.cwd(), 'data/lessons');

  function getAllLessonFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    return entries.flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return getAllLessonFiles(fullPath);
      } else if (entry.isFile() && fullPath.endsWith('.json')) {
        return [fullPath];
      }
      return [];
    });
  }

  const filePaths = getAllLessonFiles(lessonDir);

  const lessons = filePaths.flatMap((filePath) => {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return [JSON.parse(content)];
    } catch (error) {
      console.warn(`Failed to parse ${filePath}:`, error.message);
      return [];
    }
  });

  return {
    props: {
      lessons,
    },
  };
}



