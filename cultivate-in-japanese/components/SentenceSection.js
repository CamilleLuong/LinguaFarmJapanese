// components/SentenceSection.js
import VocabExampleBlock from './VocabExampleBlock';
import SentenceControlButtons from './SentenceControlButtons';
import TextToSpeechAdvanced from './TextToSpeechAdvanced';

export default function SentenceSection({ sentence, sentenceIndex, clickedWords, vocabData, lessonVocab, onToggleTranslit, onToggleTranslation, onPractice, showTranslit, showTranslation }) {
  return (
    <div className="mb-10">
      {clickedWords.map((word, idx) => (
        sentence.words.includes(word) && (vocabData[word] || lessonVocab[word]) ? (
          <VocabExampleBlock
            key={`${word}-${sentenceIndex}`}
            word={word}
            sentenceIndex={sentenceIndex}
            examples={(lessonVocab[word] || vocabData[word]).exampleSentences}
            transliterations={(lessonVocab[word] || vocabData[word]).transliteration}
            translations={(lessonVocab[word] || vocabData[word]).translation}
            onToggleTranslit={onToggleTranslit}
            onToggleTranslation={onToggleTranslation}
            onPractice={onPractice}
            showTranslit={showTranslit[`${word}-${sentenceIndex}`]}
            showTranslation={showTranslation[`${word}-${sentenceIndex}`]}
          />
        ) : null
      ))}

      <h4 className="text-lg font-semibold mt-6">Sentence {sentenceIndex + 1} of the text</h4>
      <p className="mb-2">{sentence.text} <TextToSpeechAdvanced text={sentence.hira || sentence.text} /></p>
      <SentenceControlButtons
        uniqueKey={`sentence-${sentenceIndex}`}
        onTransliterate={onToggleTranslit}
        onTranslate={onToggleTranslation}
        onPractice={onPractice}
      />
    </div>
  );
}

