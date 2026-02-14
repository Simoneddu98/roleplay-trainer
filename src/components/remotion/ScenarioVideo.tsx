'use client';

import {
  AbsoluteFill,
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
  initials,
  color,
  side,
  label,
}: {
  initials: string;
  color: string;
  side: 'left' | 'right';
  label: string;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        [side]: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 28,
          fontWeight: 700,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        {initials}
      </div>
      <span
        style={{
          color: '#334155',
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function SpeechBubble({
  text,
  side,
  frame,
  startFrame,
  fps,
}: {
  text: string;
  side: 'left' | 'right';
  frame: number;
  startFrame: number;
  fps: number;
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
        bottom: 190,
        [side]: 60,
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
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
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
          [side]: 30,
        }}
      />
    </div>
  );
}

function OfficeBackground() {
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 50%, #dbeafe 100%)',
      }}
    >
      {/* Desk */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: 'linear-gradient(to top, #8b5e3c, #a0714f)',
          borderTop: '3px solid #6d4c2e',
        }}
      />
      {/* Window */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 200,
          height: 140,
          border: '4px solid #94a3b8',
          borderRadius: 8,
          background: 'linear-gradient(180deg, #bfdbfe 0%, #e0f2fe 100%)',
          boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 4,
            background: '#94a3b8',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: 4,
            background: '#94a3b8',
          }}
        />
      </div>
      {/* Plant */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          right: 40,
          width: 30,
          height: 50,
          background: '#65a30d',
          borderRadius: '50% 50% 5px 5px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          right: 42,
          width: 26,
          height: 20,
          background: '#78716c',
          borderRadius: '2px 2px 4px 4px',
        }}
      />
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

  return (
    <AbsoluteFill style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Title card: first ~100 frames (fade out included) */}
      {frame < 110 && <TitleCard frame={frame} fps={fps} />}

      {/* Main scene */}
      {frame >= 20 && (
        <Sequence from={20}>
          <OfficeBackground />

          {/* Avatars */}
          <Avatar initials="TU" color="#4f46e5" side="left" label="Tu (Venditore)" />
          <Avatar initials="MB" color="#6d28d9" side="right" label="Dott. Bianchi" />

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
