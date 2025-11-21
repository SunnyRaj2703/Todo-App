import { useRef, useState } from "react";

export default function useVoiceRecognition(onResult) {
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  function start() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Speech Recognition not supported. Use Chrome/Edge on HTTPS or localhost.");
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
      setIsListening(false);
      return;
    }

    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    document.body.classList.add("listening");
    setIsListening(true);

    const SAFETY_MS = 8000;
    const timeout = setTimeout(() => {
      try {
        recognition.stop();
      } catch (e) {}
    }, SAFETY_MS);

    recognition.onresult = (event) => {
      clearTimeout(timeout);
      const text = event.results?.[0]?.[0]?.transcript || "";
      if (onResult && text.trim()) onResult(text.trim());
    };

    recognition.onspeechend = () => {
      try {
        recognition.stop();
      } catch (e) {}
    };

    recognition.onerror = (err) => {
      clearTimeout(timeout);
      try {
        recognition.stop();
      } catch (e) {}
    };

    recognition.onend = () => {
      clearTimeout(timeout);
      recognitionRef.current = null;
      setIsListening(false);
      document.body.classList.remove("listening");
    };

    try {
      recognition.start();
    } catch (e) {
      recognitionRef.current = null;
      setIsListening(false);
      document.body.classList.remove("listening");
    }
  }

  return { start, isListening };
}
