import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';

// ── Design tokens ──
const colors = {
  bg: '#0C0C0C',
  bgCard: '#1C1C1E',
  border: 'rgba(255,255,255,0.08)',
  text: '#FFFFFF',
  textSec: '#727272',
  textTert: '#515151',
  purple: '#947AFC',
  blue: '#1A9EFF',
  green: '#4ADE80',
};

// ── Entity definitions (shared between transcript + bottom bar) ──
const entities = [
  { text: '23% increase', line: 0, delay: 70 },
  { text: 'EMEA', line: 2, delay: 165 },
  { text: 'North America', line: 2, delay: 170 },
  { text: 'APAC', line: 2, delay: 175 },
  { text: '142%', line: 4, delay: 285 },
];

// ── Waveform bars ──
const WaveformBar = ({ index, frame, active }) => {
  const baseHeight = 4 + Math.sin(index * 0.8) * 2;
  const wave = active
    ? Math.abs(Math.sin((frame * 0.12) + index * 0.7)) *
      (20 + Math.sin(index * 1.3 + frame * 0.05) * 12)
    : baseHeight;
  const height = interpolate(wave, [0, 32], [4, 32]);

  return (
    <div
      style={{
        width: 3,
        height,
        borderRadius: 2,
        background: active ? colors.purple : colors.textTert,
        opacity: active ? 0.9 : 0.25,
        transition: 'height 80ms ease-out',
      }}
    />
  );
};

const Waveform = ({ frame, active, width = 200 }) => {
  const barCount = Math.floor(width / 6);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 32 }}>
      {Array.from({ length: barCount }).map((_, i) => (
        <WaveformBar key={i} index={i} frame={frame} active={active} />
      ))}
    </div>
  );
};

// ── Latency pill ──
const LatencyPill = ({ frame, delay }) => {
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const values = ['287ms', '245ms', '312ms', '198ms', '265ms', '301ms', '223ms'];
  const idx = Math.floor((frame - delay) / 25) % values.length;
  const isLow = parseInt(values[idx]) < 300;

  return (
    <div style={{
      opacity,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 12px',
      background: 'rgba(148,122,252,0.1)',
      border: '1px solid rgba(148,122,252,0.25)',
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 500,
      color: isLow ? colors.green : colors.purple,
      fontFamily: 'monospace',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: isLow ? colors.green : colors.purple,
      }} />
      {values[idx]} latency
    </div>
  );
};

// ── Inline highlight style ──
const highlightStyle = {
  background: 'rgba(148,122,252,0.15)',
  border: '1px solid rgba(148,122,252,0.3)',
  borderRadius: 4,
  padding: '1px 4px',
  margin: '0 1px',
  color: colors.purple,
  fontWeight: 500,
  transition: 'all 300ms ease-out',
};

// ── Render text with highlighted entities ──
const renderHighlightedText = (fullText, visibleText, lineEntities, frame) => {
  // Find which entities are active (visible in text AND past their delay)
  const active = lineEntities.filter(
    (e) => frame >= e.delay && visibleText.includes(e.text)
  );

  if (active.length === 0) return visibleText;

  // Split visible text around entity matches
  let result = [];
  let remaining = visibleText;
  let key = 0;

  // Sort entities by their position in the text
  const sorted = [...active].sort(
    (a, b) => remaining.indexOf(a.text) - remaining.indexOf(b.text)
  );

  for (const entity of sorted) {
    const idx = remaining.indexOf(entity.text);
    if (idx === -1) continue;

    // Text before the entity
    if (idx > 0) {
      result.push(<span key={key++}>{remaining.slice(0, idx)}</span>);
    }

    // The highlighted entity
    const elapsed = frame - entity.delay;
    const hlOpacity = interpolate(elapsed, [0, 12], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    result.push(
      <span key={key++} style={{ ...highlightStyle, opacity: hlOpacity }}>
        {entity.text}
      </span>
    );

    remaining = remaining.slice(idx + entity.text.length);
  }

  // Remaining text after last entity
  if (remaining) {
    result.push(<span key={key++}>{remaining}</span>);
  }

  return result;
};

// ── Transcript lines ──
const transcriptData = [
  { speaker: 'Speaker 1', color: colors.blue, text: 'The quarterly results show a 23% increase in revenue' },
  { speaker: 'Speaker 2', color: colors.green, text: "That's great news. Can you break down the regional performance?" },
  { speaker: 'Speaker 1', color: colors.blue, text: 'EMEA grew 31%, North America 18%, and APAC 27%' },
  { speaker: 'Speaker 2', color: colors.green, text: 'Impressive. What about customer retention metrics?' },
  { speaker: 'Speaker 1', color: colors.blue, text: 'Net retention rate hit 142%, our highest quarter ever' },
];

const TranscriptLine = ({ lineIndex, speaker, color, text, frame, startFrame }) => {
  const elapsed = frame - startFrame;
  if (elapsed < 0) return null;

  const labelOpacity = interpolate(elapsed, [0, 8], [0, 1], { extrapolateRight: 'clamp' });

  const words = text.split(' ');
  const wordsPerFrame = 0.25;
  const visibleWords = Math.min(Math.floor(elapsed * wordsPerFrame), words.length);
  const isComplete = visibleWords >= words.length;
  const visibleText = words.slice(0, visibleWords).join(' ');

  // Get entities for this line
  const lineEntities = entities.filter((e) => e.line === lineIndex);

  return (
    <div style={{ marginBottom: 16, opacity: labelOpacity }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
        <span style={{ fontSize: 11, fontWeight: 600, color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {speaker}
        </span>
      </div>
      <div style={{
        fontSize: 14,
        lineHeight: 1.6,
        color: colors.text,
        paddingLeft: 16,
      }}>
        {renderHighlightedText(text, visibleText, lineEntities, frame)}
        {!isComplete && (
          <span style={{
            display: 'inline-block',
            width: 2,
            height: 16,
            background: colors.purple,
            marginLeft: 2,
            verticalAlign: 'text-bottom',
            opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0.3,
          }} />
        )}
      </div>
    </div>
  );
};

// ── Entity tag (bottom bar) ──
const EntityTag = ({ text, frame, delay }) => {
  const opacity = interpolate(frame - delay, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scale = interpolate(frame - delay, [0, 10], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <span style={{
      opacity,
      transform: `scale(${scale})`,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '2px 8px',
      background: 'rgba(148,122,252,0.12)',
      border: '1px solid rgba(148,122,252,0.2)',
      borderRadius: 6,
      fontSize: 11,
      color: colors.purple,
      fontWeight: 500,
    }}>
      {text}
    </span>
  );
};

// ── Main composition ──
export const PerformanceAnimation = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const loopFrame = frame % durationInFrames;
  const waveActive = loopFrame > 10 && loopFrame < durationInFrames - 20;
  const lineStarts = [30, 80, 135, 190, 245];

  return (
    <AbsoluteFill style={{
      background: colors.bg,
      fontFamily: "'Suisse Intl', 'Inter', -apple-system, sans-serif",
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: waveActive ? colors.green : colors.textTert,
            boxShadow: waveActive ? `0 0 8px ${colors.green}` : 'none',
          }} />
          <span style={{ fontSize: 12, color: colors.textSec, fontWeight: 500 }}>
            {waveActive ? 'Transcribing...' : 'Ready'}
          </span>
        </div>
        <LatencyPill frame={loopFrame} delay={20} />
      </div>

      {/* Waveform */}
      <div style={{
        padding: '12px 16px',
        background: colors.bgCard,
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
      }}>
        <Waveform frame={loopFrame} active={waveActive} width={400} />
      </div>

      {/* Transcript */}
      <div style={{
        flex: 1,
        padding: '16px 16px',
        background: colors.bgCard,
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        overflow: 'hidden',
      }}>
        {transcriptData.map((line, i) => (
          <TranscriptLine
            key={i}
            lineIndex={i}
            speaker={line.speaker}
            color={line.color}
            text={line.text}
            frame={loopFrame}
            startFrame={lineStarts[i]}
          />
        ))}
      </div>

      {/* Entity extraction bar */}
      <div style={{
        padding: '10px 16px',
        background: colors.bgCard,
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 10, color: colors.textTert, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 4 }}>
          Entities
        </span>
        {entities.map((e, i) => (
          <EntityTag key={i} text={e.text} frame={loopFrame} delay={e.delay} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export default PerformanceAnimation;
