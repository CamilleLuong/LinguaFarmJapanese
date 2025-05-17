// components/TextToSpeech.js
export default function TextToSpeech({ text }) {
  const handleSpeak = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.pitch = 1;
      utterance.rate = 1;
      window.speechSynthesis.cancel(); // Stop previous speech
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      onClick={handleSpeak}
      className="ml-2 text-gray-500 hover:text-black"
      aria-label="Play pronunciation"
    >
      🔊
    </button>
  );
}
