// pages/category/[slug].js

import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LessonCard from '../../components/LessonCard';
import Header from '../../components/Header';

const categorySlugMap = {
  "folklore": "Folklore, customs and traditions",
  "literature": "Literature and Art",
  "society": "Society, Economy and Politics",
  "history": "History",
  "anime": "Anime, Manga and Pop culture",
  "geography": "Geography, Travel and Tourism",
  "biodiversity": "Biodiversity",
  "songs": "Japanese Songs",
  "philosophy": "Philosophy",
  "thoughts": "Thoughts",
  "science": "Science and Medicine",
  "technology": "Technology"
};

export const reverseCategorySlugMap = Object.fromEntries(
  Object.entries(categorySlugMap).map(([slug, name]) => [name, slug])
);

export default function CategoryLessonsPage({ lessons }) {
  const router = useRouter();
  const { slug } = router.query;
  const categoryName = categorySlugMap[slug] || slug;

  const [filterLevels, setFilterLevels] = useState({
    beginner: true,
    intermediate: true,
    advanced: true,
  });
  const [showFilter, setShowFilter] = useState(false);

  const filteredLessons = lessons.filter(
    (lesson) => filterLevels[lesson.level]
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Navbar */}
      <Header />

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
            <h2 className="text-xl font-bold mb-4">Filter Lessons by Level</h2>
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
            <div className="flex justify-end">
              <button
                onClick={() => setShowFilter(false)}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Gallery */}
      <div className="flex flex-wrap justify-center gap-6 px-4 py-6">
        {filteredLessons.map((lesson) => (
          <div className="w-56"><LessonCard lesson={lesson} /></div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = Object.keys(categorySlugMap).map(slug => ({
    params: { slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
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

  const allLessons = filePaths.flatMap((filePath) => {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return [JSON.parse(content)];
    } catch (error) {
      console.warn(`Failed to parse ${filePath}:`, error.message);
      return [];
    }
  });


  const categoryName = categorySlugMap[params.slug];
  console.log('Category Slug:', params.slug);
  console.log('Resolved Category Name:', categoryName);
  const lessons = allLessons.filter(l => l.category === categoryName);

  return {
    props: {
      lessons,
    },
  };
}


