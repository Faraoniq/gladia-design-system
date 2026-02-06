import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';

const NODES = [
  { label: 'Twilio', angle: -60 },
  { label: 'Vonage', angle: -20 },
  { label: 'Telnyx', angle: 20 },
  { label: 'Slack', angle: 60 },
  { label: 'REST', angle: -80 },
  { label: 'WebSocket', angle: 80 },
];

const CENTER_LABEL = 'Gladia';
const ORBIT_RX = 200;
const ORBIT_RY = 130;

// Pulse dot traveling along a line
const PulseDot = ({ x1, y1, x2, y2, frame, delay, speed = 0.012 }) => {
  const t = Math.max(0, frame - delay) * speed;
  const progress = (t % 1.6) / 1.6; // 0→1 with gap
  if (progress > 1) return null;
  const px = x1 + (x2 - x1) * progress;
  const py = y1 + (y2 - y1) * progress;
  const op = progress < 0.1 ? progress / 0.1 : progress > 0.85 ? (1 - progress) / 0.15 : 1;
  return (
    <circle cx={px} cy={py} r={3} fill="#947AFC" opacity={op * 0.9}>
      <animate attributeName="r" values="2;4;2" dur="0.8s" repeatCount="indefinite" />
    </circle>
  );
};

export const IntegrationNodes = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const f = frame % durationInFrames;

  const cx = width / 2;
  const cy = height / 2 + 10;

  // Stagger node appearance
  const nodePositions = NODES.map((node, i) => {
    const rad = (node.angle * Math.PI) / 180;
    // Gentle float
    const drift = Math.sin(f * 0.015 + i * 1.2) * 6;
    const driftY = Math.cos(f * 0.012 + i * 0.9) * 4;
    const x = cx + Math.cos(rad) * ORBIT_RX + drift;
    const y = cy + Math.sin(rad) * ORBIT_RY + driftY;
    const appearFrame = 30 + i * 15;
    const opacity = interpolate(f, [appearFrame, appearFrame + 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return { ...node, x, y, opacity, appearFrame };
  });

  // Center node pulse
  const centerPulse = 1 + Math.sin(f * 0.04) * 0.15;
  const centerGlow = interpolate(Math.sin(f * 0.03), [-1, 1], [0.15, 0.35]);

  return (
    <AbsoluteFill style={{ background: '#080808' }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <radialGradient id="centerGlow">
            <stop offset="0%" stopColor="#947AFC" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#947AFC" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#947AFC" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#947AFC" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Ambient glow behind center */}
        <circle cx={cx} cy={cy} r={100} fill="url(#centerGlow)" opacity={centerGlow} />

        {/* Connection lines */}
        {nodePositions.map((node, i) => (
          <g key={`line-${i}`} opacity={node.opacity}>
            <line
              x1={cx} y1={cy} x2={node.x} y2={node.y}
              stroke="rgba(148,122,252,0.12)"
              strokeWidth={1}
            />
            {/* Pulse dot */}
            <PulseDot
              x1={cx} y1={cy} x2={node.x} y2={node.y}
              frame={f} delay={node.appearFrame + 20} speed={0.008 + i * 0.001}
            />
          </g>
        ))}

        {/* Satellite nodes */}
        {nodePositions.map((node, i) => (
          <g key={`node-${i}`} opacity={node.opacity}>
            {/* Outer ring */}
            <circle
              cx={node.x} cy={node.y} r={28}
              fill="rgba(148,122,252,0.06)"
              stroke="rgba(148,122,252,0.15)"
              strokeWidth={1}
            />
            {/* Inner dot */}
            <circle
              cx={node.x} cy={node.y} r={4}
              fill="#947AFC"
              opacity={0.6 + Math.sin(f * 0.05 + i) * 0.3}
            />
            {/* Label */}
            <text
              x={node.x}
              y={node.y + 44}
              textAnchor="middle"
              fill="#A3A3A3"
              fontSize={11}
              fontFamily="'Suisse Intl', -apple-system, sans-serif"
              fontWeight={450}
              letterSpacing="0.04em"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Center node */}
        <g>
          {/* Breathing ring */}
          <circle
            cx={cx} cy={cy} r={38 * centerPulse}
            fill="none"
            stroke="rgba(148,122,252,0.2)"
            strokeWidth={1}
          />
          {/* Main circle */}
          <circle
            cx={cx} cy={cy} r={30}
            fill="#0F0F12"
            stroke="rgba(148,122,252,0.35)"
            strokeWidth={1.5}
          />
          {/* Inner glow */}
          <circle
            cx={cx} cy={cy} r={8}
            fill="#947AFC"
            opacity={0.5 + Math.sin(f * 0.06) * 0.3}
          />
          {/* Label */}
          <text
            x={cx}
            y={cy + 52}
            textAnchor="middle"
            fill="#E2E2E2"
            fontSize={13}
            fontFamily="'Suisse Intl', -apple-system, sans-serif"
            fontWeight={500}
            letterSpacing="0.06em"
          >
            {CENTER_LABEL}
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export default IntegrationNodes;
