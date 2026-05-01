git add .let audioContext;

function getAudioContext() {
  if (typeof window === 'undefined') {
    return null;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {});
  }

  return audioContext;
}

function playTone({
  frequency,
  duration,
  type = 'sine',
  gainValue = 0.035,
  detune = 0,
}) {
  const context = getAudioContext();

  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.detune.setValueAtTime(detune, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.03);
}

export function playSpinSound() {
  playTone({
    frequency: 180,
    duration: 0.9,
    type: 'triangle',
    gainValue: 0.03,
  });

  setTimeout(() => {
    playTone({
      frequency: 320,
      duration: 0.55,
      type: 'sine',
      gainValue: 0.025,
      detune: 400,
    });
  }, 180);
}

export function playRevealSound() {
  playTone({
    frequency: 520,
    duration: 0.22,
    type: 'square',
    gainValue: 0.028,
  });

  setTimeout(() => {
    playTone({
      frequency: 760,
      duration: 0.35,
      type: 'triangle',
      gainValue: 0.032,
    });
  }, 120);
}
