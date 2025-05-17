// components/LessonCard.js
import Image from 'next/image';
import Link from 'next/link';

export default function LessonCard({ lesson }) {
  const borderColors = {
    beginner: 'border-blue-500',
    intermediate: 'border-yellow-500',
    advanced: 'border-red-600',
  };

  return (
    <Link href={`/lesson/${lesson.id}`}>
      <div className={`border-4 ${borderColors[lesson.level]} p-2 w-full h-72 flex flex-col justify-between`}>
        <Image 
          src={`/image/${lesson.image}`} 
          alt={lesson.title.en} 
          width={200} 
          height={200} 
          className="object-cover" 
        />
        <div className="mt-2 font-medium text-base leading-tight break-words h-12 overflow-hidden flex items-center justify-center text-center">
          {lesson.title.en}
        </div>
      </div>
    </Link>
  );
}


