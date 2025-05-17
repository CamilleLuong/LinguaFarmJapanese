// components/VocabExampleBlock.js
import SentenceControlButtons from './SentenceControlButtons';
import TextToSpeech from './TextToSpeech';

export default function VocabExampleBlock({ word, sentenceIndex, examples, transliterations, translations, onToggleTranslit, onToggleTranslation, onPractice, showTranslit, showTranslation }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-2">
        Vocabulary word: {word} (from sentence {sentenceIndex + 1})
      </h3>
      <div className="space-y-2">
        {examples.map((sentence, idx) => (
          <div key={idx} className="bg-gray-100 p-2 rounded">
            <p>{sentence} <TextToSpeech text={sentence} /></p>
            {showTranslit && <p className="text-sm text-gray-600">{transliterations[idx]}</p>}
            {showTranslation && <p className="text-sm italic text-blue-600">{translations[idx]}</p>}
          </div>
        ))}
      </div>

      <div className="mt-2">
        <SentenceControlButtons
          uniqueKey={`${word}-${sentenceIndex}`}
          onTransliterate={onToggleTranslit}
          onTranslate={onToggleTranslation}
          onPractice={onPractice}
        />
      </div>
    </div>
  );
}