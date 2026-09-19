// Speech Recognition, Text-to-Speech, and Audio Visualizer Service for MUBA AI

type SpeechRecognitionInstance = any;

class SpeechService {
  private recognition: SpeechRecognitionInstance | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private micStream: MediaStream | null = null;
  private micSource: MediaStreamAudioSourceNode | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isListeningActive = false;
  private isSpeakingActive = false;

  public isRecognitionSupported = false;
  public isSynthesisSupported = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.isRecognitionSupported = !!SpeechRecognition;
      this.isSynthesisSupported = 'speechSynthesis' in window;

      if (this.isRecognitionSupported) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
      }

      if (this.isSynthesisSupported) {
        this.initVoice();
        window.speechSynthesis.onvoiceschanged = () => this.initVoice();
      }
    }
  }

  private initVoice() {
    if (!this.isSynthesisSupported) return;
    const voices = window.speechSynthesis.getVoices();
    // Prefer natural sounding English voices (Google, Natural, Samantha, Jenny, Zira)
    const preferred = voices.find(
      v =>
        (v.name.includes('Google') && v.lang.startsWith('en')) ||
        (v.name.includes('Natural') && v.lang.startsWith('en')) ||
        (v.name.includes('Samantha') && v.lang.startsWith('en')) ||
        (v.name.includes('Jenny') && v.lang.startsWith('en')) ||
        (v.name.includes('Zira') && v.lang.startsWith('en')) ||
        v.lang === 'en-US' ||
        v.lang === 'en-GB'
    );
    this.selectedVoice = preferred || voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
  }

  // --- Audio Amplitude & Waveform via Web Audio API ---

  public async startAudioAnalyser(): Promise<boolean> {
    try {
      if (this.micStream) return true;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.micStream = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.micSource = this.audioContext.createMediaStreamSource(stream);
      this.micSource.connect(this.analyser);
      return true;
    } catch (err) {
      console.warn('Microphone access for analyser failed:', err);
      return false;
    }
  }

  public stopAudioAnalyser() {
    if (this.micStream) {
      this.micStream.getTracks().forEach(track => track.stop());
      this.micStream = null;
    }
    if (this.micSource) {
      this.micSource.disconnect();
      this.micSource = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.suspend();
    }
    this.analyser = null;
  }

  /**
   * Returns current microphone volume amplitude normalized between 0.0 and 1.0
   * for driving radial wave animations.
   */
  public getMicrophoneVolume(): number {
    if (!this.analyser) return 0;
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const avg = sum / dataArray.length;
    return Math.min(1, avg / 128);
  }

  // --- Speech Recognition ---

  public startListening(
    onInterim: (text: string) => void,
    onFinal: (text: string) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ) {
    if (!this.recognition) {
      onError('Speech recognition is not supported in this browser.');
      return;
    }

    // Barge-in: Stop any speaking immediately
    this.stopSpeaking();

    try {
      this.recognition.abort();
    } catch {
      // Ignore
    }

    this.isListeningActive = true;

    this.recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          final += item[0].transcript;
        } else {
          interim += item[0].transcript;
        }
      }

      if (interim) {
        onInterim(interim);
      }
      if (final) {
        this.isListeningActive = false;
        onFinal(final.trim());
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListeningActive = false;
      if (event.error === 'not-allowed') {
        onError('Microphone permission denied. Please enable microphone access.');
      } else if (event.error === 'no-speech') {
        // Natural silence - just end and wait
        onEnd();
      } else {
        onError(`Speech error: ${event.error}`);
        onEnd();
      }
    };

    this.recognition.onend = () => {
      this.isListeningActive = false;
      onEnd();
    };

    try {
      this.recognition.start();
    } catch (err: any) {
      console.warn('Recognition start failed:', err);
      this.isListeningActive = false;
      onError('Failed to activate microphone.');
    }
  }

  public stopListening() {
    this.isListeningActive = false;
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        // Ignore
      }
    }
  }

  // --- Text to Speech ---

  public speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ) {
    if (!this.isSynthesisSupported) {
      if (onEnd) onEnd();
      return;
    }

    // Stop active speech
    this.stopSpeaking();

    // Clean text of markdown, bracketed tags, or asterisks
    const cleanSpeechText = text
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/[*_#`~]/g, '')
      .replace(/\n+/g, ' ')
      .trim();

    if (!cleanSpeechText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeakingActive = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeakingActive = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.isSpeakingActive = false;
      if (onError) onError(e);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if (this.isSynthesisSupported) {
      window.speechSynthesis.cancel();
      this.isSpeakingActive = false;
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingActive || (this.isSynthesisSupported && window.speechSynthesis.speaking);
  }

  public isListening(): boolean {
    return this.isListeningActive;
  }
}

export const speechService = new SpeechService();
