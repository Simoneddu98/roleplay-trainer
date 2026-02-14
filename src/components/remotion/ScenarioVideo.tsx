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
import type { DialogLine, SimulationCharacter } from '@/data/simulation-scenarios';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ScenarioVideoProps {
  branch: 'none' | 'A' | 'B';
  title: string;
  subtitle: string;
  titleGradient: string;
  characterA: SimulationCharacter;
  characterB: SimulationCharacter;
  dialogue: DialogLine[];
  outcomes: { A: DialogLine[]; B: DialogLine[] };
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

function Avatar({
  imageSrc,
  fallbackInitials: _fallbackInitials,
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
  // Breathing animation: gentle scale oscillation
  const breathScale = interpolate(
    Math.sin((frame / fps) * 1.8),
    [-1, 1],
    [0.99, 1.02],
  );
  // Speaking pulse: faster, more visible when talking
  const speakScale = isSpeaking
    ? interpolate(Math.sin((frame / fps) * 6), [-1, 1], [1.0, 1.04])
    : 1;
  const scale = breathScale * speakScale;

  // Slide-up entrance
  const entrance = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120 },
  });
  const translateY = interpolate(entrance, [0, 1], [120, 0]);

  // Speaking glow
  const glowOpacity = isSpeaking
    ? interpolate(Math.sin((frame / fps) * 4), [-1, 1], [0.3, 0.7])
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        [side]: side === 'left' ? 30 : 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
    >
      {/* Character image */}
      <div
        style={{
          position: 'relative',
          height: 350,
          width: 260,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {/* Speaking glow behind character */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${fallbackColor}44, transparent)`,
            opacity: glowOpacity,
            filter: 'blur(20px)',
          }}
        />
        <Img
          src={staticFile(imageSrc)}
          style={{
            height: '100%',
            objectFit: 'contain',
            filter: `drop-shadow(0 8px 24px rgba(0,0,0,0.25))`,
            position: 'relative',
            zIndex: 1,
          }}
        />
      </div>

      {/* Name label */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: -10,
          background: isSpeaking
            ? `linear-gradient(135deg, ${fallbackColor}, ${fallbackColor}dd)`
            : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: 12,
          padding: '6px 16px',
          boxShadow: isSpeaking
            ? `0 4px 16px ${fallbackColor}44`
            : '0 2px 10px rgba(0,0,0,0.1)',
          border: isSpeaking ? 'none' : '1px solid rgba(255,255,255,0.8)',
        }}
      >
        <span
          style={{
            color: isSpeaking ? 'white' : '#334155',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.3,
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
        bottom: 360,
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
  const lightShift = Math.sin(frame * 0.01) * 2;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${135 + lightShift}deg, #e0e7ff 0%, #f1f5f9 50%, #dbeafe 100%)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.03) 0%, transparent 50%)',
        }}
      />
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

function TitleCard({
  frame,
  fps,
  title,
  subtitle,
  gradient,
}: {
  frame: number;
  fps: number;
  title: string;
  subtitle: string;
  gradient: string;
}) {
  const opacity = interpolate(frame, [0, 20, 80, 100], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  const y = spring({ frame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        background: gradient,
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
          {title}
        </div>
        <div
          style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Main Composition ────────────────────────────────────────────────────────

export default function ScenarioVideo({
  branch,
  title,
  subtitle,
  titleGradient,
  characterA,
  characterB,
  dialogue,
  outcomes,
}: ScenarioVideoProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeDialog =
    branch === 'A'
      ? [...dialogue, ...outcomes.A]
      : branch === 'B'
        ? [...dialogue, ...outcomes.B]
        : dialogue;

  const currentSpeaker = activeDialog.find(
    (line) => frame >= line.startFrame && frame < line.startFrame + line.durationFrames
  )?.speaker ?? null;

  return (
    <AbsoluteFill style={{ fontFamily: 'system-ui, sans-serif' }}>
      {frame < 110 && (
        <TitleCard
          frame={frame}
          fps={fps}
          title={title}
          subtitle={subtitle}
          gradient={titleGradient}
        />
      )}

      {frame >= 20 && (
        <Sequence from={20}>
          <OfficeBackground frame={frame} />

          <Avatar
            imageSrc={characterA.image}
            fallbackInitials={characterA.fallbackInitials}
            fallbackColor={characterA.fallbackColor}
            side="left"
            label={characterA.label}
            frame={frame}
            fps={fps}
            isSpeaking={currentSpeaker === 'A'}
          />
          <Avatar
            imageSrc={characterB.image}
            fallbackInitials={characterB.fallbackInitials}
            fallbackColor={characterB.fallbackColor}
            side="right"
            label={characterB.label}
            frame={frame}
            fps={fps}
            isSpeaking={currentSpeaker === 'B'}
          />

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
                accentColor={
                  line.speaker === 'A'
                    ? characterA.fallbackColor
                    : characterB.fallbackColor
                }
              />
            );
          })}
        </Sequence>
      )}
    </AbsoluteFill>
  );
}
