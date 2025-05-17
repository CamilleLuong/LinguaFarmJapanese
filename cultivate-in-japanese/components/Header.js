// components/Header.js
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md">
      <div className="flex items-center space-x-4">
        <Image src="/image/logojapan.png" alt="Logo" width={80} height={80} />
        <span className="text-3xl font-extrabold">LinguaFarm Japanese</span>
      </div>
      <div className="flex space-x-10">
        <Link href="/">
          <button className="bg-yellow-600 text-white text-xl px-8 py-4 font-semibold">HOME</button>
        </Link>
        <Link href="/lessons">
          <button className="text-xl px-8 py-4">My Lessons</button>
        </Link>
        <Link href="/quiz">
          <button className="text-xl px-8 py-4">Quiz</button>
        </Link>
        <Link href="/beginner">
          <button className="text-xl px-8 py-4">Beginner</button>
        </Link>
        <Link href="/grammar">
          <button className="text-xl px-8 py-4">Grammar</button>
        </Link>
        <Link href="/account">
          <button className="bg-yellow-600 text-white text-xl px-8 py-4 font-semibold">ACCOUNT</button>
        </Link>
      </div>
    </div>
  );
}
