// components/SentenceControlButtons.js
export default function SentenceControlButtons({ uniqueKey, onTransliterate, onTranslate, onPractice }) {
  return (
    <div className="flex space-x-2 mt-2">
      <button
        className="px-3 py-1 text-sm border border-gray-400 rounded hover:bg-gray-100"
        onClick={() => onTransliterate(uniqueKey)}
      >
        Transliteration
      </button>

      <button
        className="px-3 py-1 text-sm border border-gray-400 rounded hover:bg-gray-100"
        onClick={() => onTranslate(uniqueKey)}
      >
        Translation
      </button>

      <button
        className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-100"
        onClick={() => onPractice(uniqueKey)}
      >
        Practice
      </button>
    </div>
  );
}