// pages/lesson/[id].js
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import Header from '../../components/Header';
import GeneratedLessonSection from '../../components/GeneratedLessonSection';
import TextToSpeechAdvanced from '../../components/TextToSpeechAdvanced';

export default function LessonPage({ lessonData, vocabData }) {
  const router = useRouter();
  const { id } = router.query;

  const [clickedWords, setClickedWords] = useState([]);
  const [showTranslit, setShowTranslit] = useState({});
  const [showTranslation, setShowTranslation] = useState({});
  const [showPracticePopup, setShowPracticePopup] = useState(false);
  const [generate, setGenerate] = useState(false);

  const handleWordClick = (word) => {
    setClickedWords((prev) =>
      prev.includes(word)
        ? prev.filter(w => w !== word)
        : [...prev, word]
    );
  };

  const toggleTranslit = (key) => {
    setShowTranslit(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTranslation = (key) => {
    setShowTranslation(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePractice = (key) => {
    setShowPracticePopup(true);
  };

  return (
    <div className="bg-white font-sans min-h-screen">
      <Header />

      <div className="p-6 ml-0 md:ml-24">
        <h1 className="text-3xl font-bold mb-1">{lessonData.title.jp}</h1>
        <div className="text-xl text-gray-800">{lessonData.title.hira}</div>
        <div className="italic text-gray-500 mb-4">{lessonData.title.en}</div>

        <p className="text-blue-600 mb-2">
  Click on the words you don't know
</p>
<div className="mb-4">
  <TextToSpeechAdvanced text={lessonData.sentences.map(s => s.hira).join(' ')} />
</div>

        {/* Main lesson text with clickable words */}
        <div className="bg-gray-100 p-4 rounded mb-4">
          {lessonData.sentences.map((sentence, idx) => (
            <div key={idx} className="mb-2">
              {sentence.words.map((word, wIdx) => (
                <span
                  key={wIdx}
                  className={`cursor-pointer px-1 rounded ${clickedWords.includes(word) ? 'bg-yellow-500 text-white' : ''}`}
                  onClick={() => handleWordClick(word)}
                >
                  {word}
                </span>
              ))}
              <span className="text-black">。</span>

            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setGenerate(true)}
            className="bg-yellow-600 text-white px-4 py-2 rounded shadow"
          >
            Generate lesson
          </button>
        </div>

        {generate && (
          <GeneratedLessonSection
            lessonData={lessonData}
            clickedWords={clickedWords}
            vocabData={vocabData}
            showTranslit={showTranslit}
            showTranslation={showTranslation}
            onToggleTranslit={toggleTranslit}
            onToggleTranslation={toggleTranslation}
            onPractice={handlePractice}
          />
        )}

        {/* Practice popup placeholder */}
        {showPracticePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Practice</h2>
              <button
                onClick={() => setShowPracticePopup(false)}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const lessonsPath = path.join(process.cwd(), 'data/lessons');
  const categories = fs.readdirSync(lessonsPath);
  const paths = categories.flatMap(category => {
    const files = fs.readdirSync(path.join(lessonsPath, category));
    console.log(`Category: ${category}, Files:`, files);
    return files.map(file => ({
      params: { id: file.replace('.json', '') }
    }));
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const lessonPath = path.join(process.cwd(), 'data/lessons');
  const allDirs = fs.readdirSync(lessonPath);
  let lessonJson = null;

  for (const dir of allDirs) {
    const filePath = path.join(lessonPath, dir, `${params.id}.json`);
    if (fs.existsSync(filePath)) {
      lessonJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      break;
    }
  }

  const vocabDir = path.join(process.cwd(), 'data/vocab');
  const vocabFiles = ['n1vocab.json', 'n2vocab.json', 'n3vocab.json', 'n4vocab.json', 'n5vocab.json'];

  let vocabData = {};
  for (const file of vocabFiles) {
    const filePath = path.join(vocabDir, file);
    if (fs.existsSync(filePath)) {
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        vocabData = { ...vocabData, ...content };
      } catch (err) {
        console.warn(`Failed to parse ${file}: ${err.message}`);
      }
    }
  }

  return {
    props: {
      lessonData: lessonJson,
      vocabData,
    },
  };
}
