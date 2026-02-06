import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';

const CMD_PARTS = [
  { text: '$ ', cls: 'prompt' },
  { text: 'curl ', cls: 'cmd' },
  { text: '-X POST ', cls: 'flag' },
  { text: 'gladia.com/v2/transcription ', cls: 'string' },
  { text: '\\\n  ', cls: 'cmd' },
  { text: '-H ', cls: 'flag' },
  { text: '"x-gladia-key: sk-••••••••" ', cls: 'string' },
  { text: '\\\n  ', cls: 'cmd' },
  { text: '-F ', cls: 'flag' },
  { text: 'audio=@meeting.mp3', cls: 'string' },
];

const RESPONSE_LINES = [
  { key: null, val: '{', type: 'brace' },
  { key: '"status"', val: '"done"', type: 'string' },
  { key: '"duration"', val: '184.2', type: 'number' },
  { key: '"confidence"', val: '0.97', type: 'number' },
  { key: '"text"', val: '"Revenue grew 23% this quarter..."', type: 'string' },
  { key: null, val: '}', type: 'brace' },
];

// Build full command string + per-char style map
let FULL_CMD = '';
const CHAR_STYLES = [];
for (const part of CMD_PARTS) {
  for (const ch of part.text) {
    FULL_CMD += ch;
    CHAR_STYLES.push(part.cls);
  }
}

// DS tokens
const TOKENS = {
  bgPrimary: '#000000',
  bgTertiary: '#1C1C1E',
  borderSubtle: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.12)',
  radius3: 24,         // --radius-3
  radius2: 16,         // --radius-2
  space4: 32,          // --space-4
  space3: 24,          // --space-3
  space2: 16,          // --space-2
  textPrimary: '#FFFFFF',
  textSecondary: '#A3A3A3',
  textTertiary: '#515151',
  purple400: '#947AFC',
  green500: '#22C55E',
  neutralBg: '#080808',
};

const COLORS = {
  prompt: TOKENS.green500,
  cmd: '#E2E2E2',
  flag: TOKENS.purple400,
  string: '#FFBD2E',
  brace: TOKENS.textTertiary,
  number: TOKENS.green500,
  key: TOKENS.purple400,
};

const TYPING_SPEED = 3;
const RESPONSE_DELAY = 40;
const RESPONSE_LINE_GAP = 15;
const HOLD = 180;

const TYPING_END = FULL_CMD.length * TYPING_SPEED;
const RESP_START = TYPING_END + RESPONSE_DELAY;

export const IntegrationTerminal = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const f = frame % durationInFrames;

  const typedCount = Math.min(Math.floor(f / TYPING_SPEED), FULL_CMD.length);
  const typingDone = typedCount >= FULL_CMD.length;

  // Build command spans
  const cmdSpans = [];
  let runStart = 0;
  let runCls = CHAR_STYLES[0];
  for (let i = 0; i <= typedCount; i++) {
    if (i === typedCount || CHAR_STYLES[i] !== runCls) {
      const text = FULL_CMD.slice(runStart, i);
      if (text) {
        cmdSpans.push(
          <span key={runStart} style={{ color: COLORS[runCls] }}>
            {text}
          </span>
        );
      }
      if (i < typedCount) {
        runStart = i;
        runCls = CHAR_STYLES[i];
      }
    }
  }

  // Cursor
  const cursorOpacity = typingDone ? 0 : (Math.sin(f * 0.25) > 0 ? 1 : 0.2);

  // Response lines
  const respFrame = f - RESP_START;
  const visibleRespLines = typingDone && respFrame > 0
    ? Math.min(Math.floor(respFrame / RESPONSE_LINE_GAP) + 1, RESPONSE_LINES.length)
    : 0;

  return (
    <AbsoluteFill style={{
      background: TOKENS.neutralBg,
      padding: TOKENS.space4,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Card shell — matches b__card from DS */}
      <div style={{
        width: '100%',
        height: '100%',
        background: TOKENS.bgPrimary,
        border: `1px solid ${TOKENS.borderSubtle}`,
        borderRadius: TOKENS.radius3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Terminal bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          padding: '14px 20px',
          background: TOKENS.bgTertiary,
          borderBottom: `1px solid ${TOKENS.borderSubtle}`,
          borderRadius: `${TOKENS.radius3}px ${TOKENS.radius3}px 0 0`,
        }}>
          {['#FF5F57', '#FFBD2E', '#28CA42'].map((c, i) => (
            <div key={i} style={{
              width: 10, height: 10,
              borderRadius: '50%',
              background: c,
              opacity: 0.85,
            }} />
          ))}
          <span style={{
            marginLeft: 14,
            fontSize: 11,
            fontFamily: "'Geist Mono', monospace",
            color: TOKENS.textTertiary,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            terminal
          </span>
        </div>

        {/* Terminal body */}
        <div style={{
          flex: 1,
          padding: TOKENS.space3,
          fontFamily: "'Geist Mono', 'SF Mono', monospace",
          fontSize: 13,
          lineHeight: 1.7,
          color: '#E2E2E2',
          whiteSpace: 'pre-wrap',
        }}>
          {/* Command */}
          {cmdSpans}
          {!typingDone && (
            <span style={{
              display: 'inline-block',
              width: 7,
              height: 15,
              background: TOKENS.purple400,
              verticalAlign: 'text-bottom',
              marginLeft: 2,
              borderRadius: 1,
              opacity: cursorOpacity,
            }} />
          )}

          {/* Response */}
          {visibleRespLines > 0 && (
            <div style={{
              marginTop: TOKENS.space2,
              paddingTop: TOKENS.space2,
              borderTop: `1px solid ${TOKENS.borderSubtle}`,
              opacity: interpolate(
                Math.min(respFrame, 20),
                [0, 20],
                [0, 1],
              ),
            }}>
              {RESPONSE_LINES.slice(0, visibleRespLines).map((line, i) => (
                <div key={i} style={{
                  opacity: interpolate(
                    Math.min(respFrame - i * RESPONSE_LINE_GAP, 10),
                    [0, 10],
                    [0, 1],
                  ),
                }}>
                  {line.key === null ? (
                    <span style={{ color: COLORS.brace }}>{line.val}</span>
                  ) : (
                    <>
                      {'  '}
                      <span style={{ color: COLORS.key }}>{line.key}</span>
                      <span style={{ color: TOKENS.textTertiary }}>: </span>
                      <span style={{ color: COLORS[line.type] }}>{line.val}</span>
                      {i < RESPONSE_LINES.length - 2 ? ',' : ''}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default IntegrationTerminal;
