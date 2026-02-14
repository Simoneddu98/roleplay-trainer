'use client';

import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from 'remotion';

// ─── Types ───────────────────────────────────────────────────────────────────

interface DialogLine {
  speaker: 'A' | 'B';
  text: string;
  startFrame: number;
  durationFrames: number;
}

export interface BranchConfig {
  pauseAtFrame: number;
  branchA: { label: string; goToFrame: number };
  branchB: { label: string; goToFrame: number };
}

export interface ScenarioVideoProps {
  branch: 'none' | 'A' | 'B';
}

// ─── Dialog Data ─────────────────────────────────────────────────────────────

const introDialog: DialogLine[] = [
  {
    speaker: 'A',
    text: 'Buongiorno Dott. Bianchi, grazie per aver accettato questo incontro.',
    startFrame: 30,
    durationFrames: 120,
  },
  {
    speaker: 'B',
    text: 'Buongiorno. Ho visto la vostra proposta, ma devo dirvi che il prezzo mi sembra fuori mercato.',
    startFrame: 160,
    durationFrames: 140,
  },
];

const branchADialog: DialogLine[] = [
  {
    speaker: 'A',
    text: 'Capisco la sua preoccupazione. Mi permetta di mostrarle il ROI che i nostri clienti ottengono mediamente in 6 mesi.',
    startFrame: 310,
    durationFrames: 150,
  },
  {
    speaker: 'B',
    text: 'Hmm, interessante. Se i numeri sono questi, potremmo rivalutare. Mi mandi un caso studio dettagliato.',
    startFrame: 470,
    durationFrames: 140,
  },
  {
    speaker: 'A',
    text: 'Certamente! Le invio tutto entro domani. Possiamo fissare un follow-up per giovedì?',
    startFrame: 620,
    durationFrames: 130,
  },
];

const branchBDialog: DialogLine[] = [
  {
    speaker: 'A',
    text: 'Ha ragione, il prezzo è più alto. Ma consideri che include supporto 24/7 e formazione completa per il suo team.',
    startFrame: 310,
    durationFrames: 150,
  },
  {
    speaker: 'B',
    text: 'Il supporto dedicato è un buon punto. I competitor non lo offrono. Quanto dura la formazione?',
    startFrame: 470,
    durationFrames: 140,
  },
  {
    speaker: 'A',
    text: 'Due settimane on-site, poi supporto continuo. Il suo team sarà autonomo in un mese.',
    startFrame: 620,
    durationFrames: 130,
  },
];

// ─── Sub-Components ──────────────────────────────────────────────────────────

function Avatar({
  imageSrc,
  fallbackInitials,
  fallbackColor,
  side,
  label,
  frame,
  fps,
  isSpeaking,
}: {
  imageSrc: string;
  fallbackInitials: string;
  fallbackColor: string;
  side: 'left' | 'right';
  label: string;
  frame: number;
  fps: number;
  isSpeaking: boolean;
}) {
  // Breathing animation: subtle scale oscillation
  const breathCycle = Math.sin((frame / fps) * 1.8) * 0.015 + 1;
  // Speaking pulse: slightly more pronounced when active
  const speakPulse = isSpeaking
    ? Math.sin((frame / fps) * 6) * 0.02 + 1.03
    : 1;
  const scale = breathCycle * speakPulse;

  // Speaking glow ring
  const glowOpacity = isSpeaking
    ? interpolate(Math.sin((frame / fps) * 4), [-1, 1], [0.2, 0.5])
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 70,
        [side]: 70,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {/* Glow ring */}
      <div
        style={{
          position: 'absolute',
          top: -6,
          width: 112,
          height: 112,
          borderRadius: '50%',
          border: `3px solid ${isSpeaking ? '#4f46e5' : 'transparent'}`,
          opacity: glowOpacity,
          boxShadow: isSpeaking ? '0 0 20px rgba(79,70,229,0.3)' : 'none',
          transition: 'opacity 0.3s',
        }}
      />
      {/* Avatar container */}
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid white',
          boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          transform: `scale(${scale})`,
          background: fallbackColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Img
          src={staticFile(imageSrc)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={() => {
            // Fallback handled by the parent background + initials
          }}
        />
        {/* Fallback initials (visible if image fails to load via transparent overlay) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 32,
            fontWeight: 700,
            zIndex: -1,
          }}
        >
          {fallbackInitials}
        </div>
      </div>
      {/* Name label */}
      <div
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(4px)',
          borderRadius: 8,
          padding: '4px 12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <span
          style={{
            color: '#334155',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function SpeechBubble({
  text,
  side,
  frame,
  startFrame,
  fps,
  accentColor,
}: {
  text: string;
  side: 'left' | 'right';
  frame: number;
  startFrame: number;
  fps: number;
  accentColor: string;
}) {
  const scale = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  const opacity = interpolate(frame - startFrame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 210,
        [side]: 50,
        maxWidth: 380,
        transform: `scale(${scale})`,
        opacity,
        transformOrigin: side === 'left' ? 'bottom left' : 'bottom right',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 16,
          padding: '16px 20px',
          fontSize: 16,
          lineHeight: 1.5,
          color: '#1e293b',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          borderLeft: side === 'left' ? `3px solid ${accentColor}` : undefined,
          borderRight: side === 'right' ? `3px solid ${accentColor}` : undefined,
        }}
      >
        {text}
      </div>
      {/* Arrow */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '10px solid white',
          position: 'absolute',
          bottom: -10,
          [side]: 35,
        }}
      />
    </div>
  );
}

function OfficeBackground({ frame }: { frame: number }) {
  // Subtle ambient light animation
  const lightShift = Math.sin(frame * 0.01) * 2;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${135 + lightShift}deg, #e0e7ff 0%, #f1f5f9 50%, #dbeafe 100%)`,
      }}
    >
      {/* Wall texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.03) 0%, transparent 50%)',
        }}
      />
      {/* Desk */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 55,
          background: 'linear-gradient(to top, #7c5a3a, #9a7352)',
          borderTop: '3px solid #6d4c2e',
        }}
      />
      {/* Desk surface reflection */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '20%',
          right: '20%',
          height: 1,
          background: 'rgba(255,255,255,0.3)',
        }}
      />
      {/* Window */}
      <div
        style={{
          position: 'absolute',
          top: 25,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 180,
          height: 130,
          border: '5px solid #94a3b8',
          borderRadius: 8,
          background: 'linear-gradient(180deg, #93c5fd 0%, #dbeafe 100%)',
          boxShadow: 'inset 0 0 30px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 5,
            background: '#94a3b8',
            transform: 'translateY(-50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: 5,
            background: '#94a3b8',
            transform: 'translateX(-50%)',
          }}
        />
      </div>
      {/* Plant */}
      <div
        style={{
          position: 'absolute',
          bottom: 55,
          right: 35,
        }}
      >
        <div
          style={{
            width: 28,
            height: 45,
            background: 'linear-gradient(to top, #4ade80, #22c55e)',
            borderRadius: '50% 50% 4px 4px',
          }}
        />
        <div
          style={{
            width: 24,
            height: 18,
            background: '#78716c',
            borderRadius: '2px 2px 6px 6px',
            marginLeft: 2,
          }}
        />
      </div>
      {/* Bookshelf hint */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
          display: 'flex',
          gap: 3,
        }}
      >
        {['#6366f1', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6'].map((c, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 28 + (i % 3) * 6,
              background: c,
              borderRadius: 2,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
}

function TitleCard({ frame, fps }: { frame: number; fps: number }) {
  const opacity = interpolate(frame, [0, 20, 80, 100], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  const y = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        opacity,
      }}
    >
      <div
        style={{
          transform: `translateY(${interpolate(y, [0, 1], [30, 0])}px)`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: 'white',
            marginBottom: 12,
          }}
        >
          Simulazione Vendita
        </div>
        <div
          style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          Gestione Obiezioni sul Prezzo
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Main Composition ────────────────────────────────────────────────────────

export default function ScenarioVideo({ branch }: ScenarioVideoProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeDialog =
    branch === 'A'
      ? [...introDialog, ...branchADialog]
      : branch === 'B'
        ? [...introDialog, ...branchBDialog]
        : introDialog;

  // Determine who is currently speaking
  const currentSpeaker = activeDialog.find(
    (line) => frame >= line.startFrame && frame < line.startFrame + line.durationFrames
  )?.speaker ?? null;

  return (
    <AbsoluteFill style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Title card: first ~100 frames (fade out included) */}
      {frame < 110 && <TitleCard frame={frame} fps={fps} />}

      {/* Main scene */}
      {frame >= 20 && (
        <Sequence from={20}>
          <OfficeBackground frame={frame} />

          {/* Avatars with images */}
          <Avatar
            imageSrc="characters/manager-neutral.png"
            fallbackInitials="TU"
            fallbackColor="#4f46e5"
            side="left"
            label="Tu (Venditore)"
            frame={frame}
            fps={fps}
            isSpeaking={currentSpeaker === 'A'}
          />
          <Avatar
            imageSrc="characters/employee-neutral.png"
            fallbackInitials="MB"
            fallbackColor="#6d28d9"
            side="right"
            label="Dott. Bianchi"
            frame={frame}
            fps={fps}
            isSpeaking={currentSpeaker === 'B'}
          />

          {/* Dialog bubbles */}
          {activeDialog.map((line, i) => {
            const isVisible =
              frame >= line.startFrame &&
              frame < line.startFrame + line.durationFrames;

            if (!isVisible) return null;

            return (
              <SpeechBubble
                key={i}
                text={line.text}
                side={line.speaker === 'A' ? 'left' : 'right'}
                frame={frame}
                startFrame={line.startFrame}
                fps={fps}
                accentColor={line.speaker === 'A' ? '#4f46e5' : '#7c3aed'}
              />
            );
          })}
        </Sequence>
      )}
    </AbsoluteFill>
  );
}

// ─── Export config ────────────────────────────────────────────────────────────

export const SCENARIO_CONFIG = {
  fps: 30,
  durationInFrames: 780,
  width: 960,
  height: 540,
  pauseAtFrame: 300,
  branchA: {
    label: 'Risposta Strategica (mostra ROI)',
    goToFrame: 310,
  },
  branchB: {
    label: 'Risposta Empatica (evidenzia supporto)',
    goToFrame: 310,
  },
};
