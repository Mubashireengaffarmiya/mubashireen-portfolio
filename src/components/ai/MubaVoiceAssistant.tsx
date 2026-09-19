import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, Volume2, Loader2, X } from 'lucide-react';
import { speechService } from '../../services/speech';
import { queryAIEngine, EXACT_GREETING } from '../../services/ai';
import { PROFILE } from '../../data/profile';

type AssistantState = 'idle' | 'greeting' | 'waiting' | 'listening' | 'thinking' | 'speaking';

export const MubaVoiceAssistant: React.FC = () => {
  const [state, setState] = useState<AssistantState>('idle');
  const [spokenSubtitle, setSpokenSubtitle] = useState<string>('');
  const [userSpeech, setUserSpeech] = useState<string>('');
  const [volumeLevel, setVolumeLevel] = useState<number>(0);

  const animFrameRef = useRef<number | null>(null);
  const stateRef = useRef<AssistantState>('idle');
  stateRef.current = state;

  // Cleanup all audio and speech
  const cleanup = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    speechService.stopListening();
    speechService.stopSpeaking();
    speechService.stopAudioAnalyser();
    setState('idle');
    setSpokenSubtitle('');
    setUserSpeech('');
    setVolumeLevel(0);
  }, []);

  // Handle Voice Navigation & Actions
  const handleVoiceAction = useCallback((command?: string) => {
    if (!command) return;

    if (command === 'navigate_certificates') {
      const el = document.getElementById('certifications');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (command === 'navigate_sih') {
      const el = document.getElementById('case-studies');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (command === 'navigate_projects') {
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (command === 'navigate_github') {
      window.open(PROFILE.github, '_blank', 'noopener,noreferrer');
    } else if (command === 'navigate_contact') {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (command === 'tour') {
      runPortfolioTour();
    }
  }, []);

  // Portfolio Voice Tour
  const runPortfolioTour = useCallback(() => {
    const tourSteps = [
      { target: 'about', text: "Let's start with Mubashireen's background in Computer Science at REVA University." },
      { target: 'skills', text: "Here is her technical toolkit, featuring Python, React, FastAPI, C++, and OpenCV." },
      { target: 'case-studies', text: "This is SMART-LM, her Smart India Hackathon project for legal packaging compliance." },
      { target: 'certifications', text: "Here are her four verified credentials from IBM and the Wadhwani Foundation." },
      { target: 'github', text: "And here is her GitHub showcase. Feel free to ask me any question!" }
    ];

    let current = 0;
    const executeStep = () => {
      if (current >= tourSteps.length) {
        setState('waiting');
        return;
      }
      const step = tourSteps[current];
      const el = document.getElementById(step.target);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSpokenSubtitle(step.text);
      setState('speaking');

      speechService.speak(
        step.text,
        () => setState('speaking'),
        () => {
          current++;
          setTimeout(executeStep, 1000);
        }
      );
    };

    executeStep();
  }, []);

  // Start Real-time Microphone Wave Visualizer
  const startVolumeVisualizer = useCallback(() => {
    const update = () => {
      if (stateRef.current === 'listening') {
        const vol = speechService.getMicrophoneVolume();
        setVolumeLevel(vol);
        animFrameRef.current = requestAnimationFrame(update);
      } else if (stateRef.current === 'speaking' || stateRef.current === 'greeting') {
        // Rhythmic pulsing for speech
        const time = Date.now() / 200;
        const wave = (Math.sin(time) + 1) / 2;
        setVolumeLevel(0.3 + wave * 0.5);
        animFrameRef.current = requestAnimationFrame(update);
      } else {
        setVolumeLevel(0);
      }
    };
    update();
  }, []);

  // Central Listening Loop
  const startListening = useCallback(async () => {
    speechService.stopSpeaking();
    setState('listening');
    setUserSpeech('');

    await speechService.startAudioAnalyser();
    startVolumeVisualizer();

    speechService.startListening(
      (interim) => {
        setUserSpeech(interim);
      },
      (final) => {
        setUserSpeech(final);
        processUserQuery(final);
      },
      () => {
        // Error or permission issue
        setState('waiting');
      },
      () => {
        // Natural pause/silence without speech
        if (stateRef.current === 'listening') {
          setState('waiting');
        }
      }
    );
  }, [startVolumeVisualizer]);

  // Process User Question & Generate Answer
  const processUserQuery = useCallback(async (query: string) => {
    if (!query.trim()) {
      setState('waiting');
      return;
    }

    setState('thinking');
    setSpokenSubtitle('');

    try {
      const response = await queryAIEngine(query);
      setSpokenSubtitle(response.spokenText);

      // Execute action if command detected
      if (response.voiceCommand) {
        handleVoiceAction(response.voiceCommand);
      }

      // Speak response
      setState('speaking');
      startVolumeVisualizer();

      speechService.speak(
        response.spokenText,
        () => {
          setState('speaking');
        },
        () => {
          // IMPORTANT: After answering, STOP and return to WAITING!
          setState('waiting');
          setVolumeLevel(0);
          // Wait for user to speak again
          startListening();
        },
        () => {
          setState('waiting');
        }
      );
    } catch {
      setState('waiting');
    }
  }, [handleVoiceAction, startListening, startVolumeVisualizer]);

  // Main Click Handler for M Button
  const handleMClick = async () => {
    // 1. If speaking or greeting, tapping M interrupts and immediately starts listening
    if (state === 'speaking' || state === 'greeting') {
      speechService.stopSpeaking();
      startListening();
      return;
    }

    // 2. If listening, tap to pause
    if (state === 'listening') {
      speechService.stopListening();
      speechService.stopAudioAnalyser();
      setState('waiting');
      return;
    }

    // 3. If waiting, tap to listen
    if (state === 'waiting') {
      startListening();
      return;
    }

    // 4. If idle, activate and speak EXACT GREETING
    if (state === 'idle') {
      setState('greeting');
      setSpokenSubtitle(EXACT_GREETING);
      startVolumeVisualizer();

      speechService.speak(
        EXACT_GREETING,
        () => {
          setState('greeting');
        },
        () => {
          // IMPORTANT: After greeting, STOP and switch to WAITING
          setState('waiting');
          setVolumeLevel(0);
          // Now ready for user to speak
          startListening();
        },
        () => {
          setState('waiting');
          startListening();
        }
      );
    }
  };

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const isWaveActive = state === 'listening' || state === 'speaking' || state === 'greeting';

  return (
    <aside
      aria-label="MUBA AI Voice Assistant"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto"
    >
      {/* Minimal Subtle Floating Status Pill (Above M) */}
      {state !== 'idle' && (
        <div className="mb-3 max-w-xs sm:max-w-sm px-3.5 py-2 rounded-2xl bg-dark-bg/90 border border-white/15 backdrop-blur-xl shadow-2xl animate-fade-in flex items-start gap-2 text-left">
          <div className="mt-0.5">
            {state === 'listening' && <Mic className="w-3.5 h-3.5 text-accent-cyan animate-pulse" />}
            {(state === 'speaking' || state === 'greeting') && <Volume2 className="w-3.5 h-3.5 text-accent-violet animate-pulse" />}
            {state === 'thinking' && <Loader2 className="w-3.5 h-3.5 text-accent-indigo animate-spin" />}
            {state === 'waiting' && <span className="flex h-2 w-2 rounded-full bg-accent-emerald mt-1 animate-ping" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted font-mono">
                {state === 'greeting' && "MUBA AI • Greeting"}
                {state === 'listening' && "Listening to you..."}
                {state === 'thinking' && "Thinking..."}
                {state === 'speaking' && "MUBA AI • Speaking"}
                {state === 'waiting' && "Ready • Speak anytime"}
              </span>
              <button
                onClick={cleanup}
                className="text-dark-muted hover:text-white p-0.5 transition-colors"
                title="Deactivate Assistant"
                aria-label="Deactivate Assistant"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Captions: User's recognized speech or Assistant's spoken text */}
            {userSpeech && state === 'listening' && (
              <p className="text-xs text-accent-cyan font-mono line-clamp-2">
                "{userSpeech}"
              </p>
            )}
            {spokenSubtitle && (state === 'speaking' || state === 'greeting') && (
              <p className="text-xs text-white/90 leading-snug line-clamp-3 font-sans">
                {spokenSubtitle}
              </p>
            )}
            {state === 'waiting' && !userSpeech && (
              <p className="text-[11px] text-light-muted dark:text-dark-muted">
                Ask about Mubashireen or any technical topic.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Small Circular M Device with Living Waves */}
      <div className="relative flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18">
        {/* Radial Waves around M (Only when listening, speaking, or greeting) */}
        {isWaveActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Wave Ring 1 */}
            <div
              style={{
                transform: `scale(${1.2 + volumeLevel * 0.9})`,
                opacity: 0.3 + volumeLevel * 0.5
              }}
              className={`absolute w-16 h-16 sm:w-18 sm:h-18 rounded-full border transition-transform duration-75 ${
                state === 'listening'
                  ? 'border-accent-cyan bg-accent-cyan/10'
                  : 'border-accent-violet bg-accent-violet/10'
              }`}
            />

            {/* Wave Ring 2 */}
            <div
              style={{
                transform: `scale(${1.5 + volumeLevel * 1.4})`,
                opacity: 0.2 + volumeLevel * 0.4
              }}
              className={`absolute w-16 h-16 sm:w-18 sm:h-18 rounded-full border transition-transform duration-100 ${
                state === 'listening'
                  ? 'border-accent-cyan/60'
                  : 'border-accent-indigo/60'
              }`}
            />

            {/* Wave Ring 3 */}
            <div
              style={{
                transform: `scale(${1.9 + volumeLevel * 1.8})`,
                opacity: 0.1 + volumeLevel * 0.3
              }}
              className={`absolute w-16 h-16 sm:w-18 sm:h-18 rounded-full border transition-transform duration-150 ${
                state === 'listening'
                  ? 'border-accent-cyan/30'
                  : 'border-accent-violet/30'
              }`}
            />
          </div>
        )}

        {/* Ambient Subtle Glow for IDLE / WAITING */}
        <div
          className={`absolute -inset-1 rounded-full bg-gradient-to-tr from-accent-cyan via-accent-indigo to-accent-violet transition-opacity duration-500 blur-md pointer-events-none ${
            state === 'thinking'
              ? 'opacity-80 animate-spin-slow'
              : state !== 'idle'
              ? 'opacity-50'
              : 'opacity-30 group-hover:opacity-70 animate-pulse-slow'
          }`}
        />

        {/* Circular M Button */}
        <button
          onClick={handleMClick}
          className={`group relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-dark-surface to-dark-bg border border-white/20 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none ${
            state === 'listening' ? 'border-accent-cyan shadow-glow-cyan' :
            state === 'speaking' ? 'border-accent-violet shadow-glow-violet' :
            state === 'thinking' ? 'border-accent-indigo' : ''
          }`}
          aria-label={
            state === 'idle' ? "Activate Mubashireen's Personal AI Assistant" :
            state === 'speaking' ? "Tap M to interrupt" :
            state === 'listening' ? "Tap M to pause" : "Tap M to talk"
          }
          title="MUBASHIREEN Personal AI Assistant (MUBA AI)"
        >
          {/* Inner Monogram */}
          <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-br from-accent-cyan via-accent-indigo to-accent-violet bg-clip-text text-transparent group-hover:scale-110 transition-transform select-none">
            M
          </span>

          {/* Tiny Status Indicator Dot on M */}
          <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
            {state === 'listening' && (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-cyan"></span>
              </>
            )}
            {(state === 'speaking' || state === 'greeting') && (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-violet opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-violet"></span>
              </>
            )}
            {state === 'waiting' && (
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-emerald"></span>
            )}
            {state === 'idle' && (
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-cyan/60"></span>
            )}
          </span>
        </button>
      </div>
    </aside>
  );
};
