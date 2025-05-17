// components/TextToSpeechAdvanced.js
import { useState } from "react";

export default function TextToSpeechAdvanced({ text }) {
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const [showControls, setShowControls] = useState(false);

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = rate;
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const pause = () => window.speechSynthesis.pause();
  const resume = () => window.speechSynthesis.resume();
  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="text-sm text-gray-700 space-y-2">
      <button
        onClick={() => setShowControls(!showControls)}
        className="text-gray-600 hover:text-black"
      >
        🔊
      </button>

      {showControls && (
        <div className="text-sm text-gray-700 space-y-2">
      <div className="flex items-center space-x-2">
        <button onClick={speak} className="px-2 py-1 border rounded">▶️ Play</button>
        <button onClick={pause} className="px-2 py-1 border rounded">⏸️ Pause</button>
        <button onClick={resume} className="px-2 py-1 border rounded">🔁 Resume</button>
        <button onClick={stop} className="px-2 py-1 border rounded">⏹️ Stop</button>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="rate">Speed: {rate.toFixed(1)}</label>
        <input
          id="rate"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
        />
      </div>
        </div>
      )}
    </div>
  );
}



