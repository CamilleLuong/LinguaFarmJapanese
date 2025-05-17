// components/GeneratedLessonSection.js
import SentenceSection from './SentenceSection';
import SentenceControlButtons from './SentenceControlButtons';
import TextToSpeechAdvanced from './TextToSpeechAdvanced';

export default function GeneratedLessonSection({ lessonData, clickedWords, vocabData, showTranslit, showTranslation, onToggleTranslit, onToggleTranslation, onPractice }) {
  return (
    <div className="mt-10">
      {lessonData.sentences.map((sentence, index) => (
        <SentenceSection
          key={index}
          sentence={sentence}
          sentenceIndex={index}
          clickedWords={clickedWords}
          vocabData={vocabData}
          lessonVocab={lessonData.vocabulary || {}}
          onToggleTranslit={onToggleTranslit}
          onToggleTranslation={onToggleTranslation}
          onPractice={onPractice}
          showTranslit={showTranslit}
          showTranslation={showTranslation}
        />
      ))}

      <div className="mt-12 border-t pt-6">
        <h3 className="text-xl font-bold mb-2">Full Lesson Text</h3>
<TextToSpeechAdvanced text={lessonData.sentences.map(s => s.hira).join(' ')} />
        <div className="mb-2 space-y-2">
          {lessonData.sentences.map((s, idx) => (
            <p key={idx}>{s.text}</p>
          ))}
        </div>
        <SentenceControlButtons
          uniqueKey="full-text"
          onTransliterate={onToggleTranslit}
          onTranslate={onToggleTranslation}
          onPractice={onPractice}
        />
      </div>
    </div>
  );
}
