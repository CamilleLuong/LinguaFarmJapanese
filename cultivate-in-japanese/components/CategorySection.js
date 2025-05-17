// components/CategorySection.js
import LessonCard from './LessonCard';
import Link from 'next/link';
import { reverseCategorySlugMap } from '../pages/category/[slug]';

export default function CategorySection({ category, lessons }) {
  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-4 mt-6 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {category} <span className="text-red-600">●</span>
        </h2>
        <Link
          href={`/category/${reverseCategorySlugMap[category]}`}
          className="flex items-center space-x-2 text-2xl font-bold text-black"
        >
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-yellow-600 rounded-full" />
            <div className="w-3 h-3 bg-yellow-600 rounded-full" />
            <div className="w-3 h-3 bg-yellow-600 rounded-full" />
          </div>
          <span>See more</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-yellow-600 rounded-full" />
            <div className="w-3 h-3 bg-yellow-600 rounded-full" />
            <div className="w-3 h-3 bg-yellow-600 rounded-full" />
          </div>
        </Link>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4 px-2">
        {lessons.map(lesson => (
          <div key={lesson.id} className="flex-shrink-0 w-56">
            <div className="flex flex-col h-full justify-between">
              <LessonCard lesson={lesson} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



