import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';

// Deterministic pseudo-random for star placement
const seededRandom = (seed) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Star field
const Stars = ({ width, height, count, frame }) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = seededRandom(i) * width;
    const y = seededRandom(i + 500) * height * 0.55; // only top portion
    const size = 0.5 + seededRandom(i + 1000) * 1.8;
    const twinkleSpeed = 0.02 + seededRandom(i + 2000) * 0.04;
    const twinklePhase = seededRandom(i + 3000) * Math.PI * 2;
    const baseOpacity = 0.15 + seededRandom(i + 4000) * 0.5;
    const opacity = baseOpacity * interpolate(
      Math.sin(frame * twinkleSpeed + twinklePhase),
      [-1, 1],
      [0.3, 1],
    );

    stars.push(
      <circle
        key={i}
        cx={x}
        cy={y}
        r={size}
        fill="#ffffff"
        opacity={opacity}
      />
    );
  }
  return <>{stars}</>;
};

export const HeroBG = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const f = frame % durationInFrames;

  const planetR = width * 0.75;
  const planetCx = width / 2;
  const planetCy = height * 0.46 + planetR;
  const arcY = planetCy - planetR;

  // Very slow, dreamy movement
  const d1x = Math.sin(f * 0.004) * 30;
  const d1y = Math.cos(f * 0.003) * 10;
  const d2x = Math.sin(f * 0.005 + 1.8) * 25;
  const d2y = Math.cos(f * 0.004 + 2.5) * 8;
  const d3x = Math.sin(f * 0.006 + 3.2) * 20;
  const d3y = Math.cos(f * 0.005 + 1.2) * 7;
  const d4x = Math.sin(f * 0.003 + 0.5) * 35;
  const d4y = Math.cos(f * 0.004 + 3.8) * 12;

  // Breathing
  const b1 = 1 + Math.sin(f * 0.003) * 0.04;
  const b2 = 1 + Math.sin(f * 0.004 + 1.5) * 0.05;
  const b3 = 1 + Math.sin(f * 0.005 + 3) * 0.03;

  const rimOp = interpolate(Math.sin(f * 0.008), [-1, 1], [0.12, 0.3]);

  return (
    <AbsoluteFill style={{ background: '#030308', overflow: 'hidden' }}>

      {/* Deep space ambient — barely visible dark blue wash */}
      <div style={{
        position: 'absolute',
        left: -100,
        top: -100,
        width: width + 200,
        height: height * 0.6,
        background: 'radial-gradient(ellipse at 50% 100%, #0A0A2E 0%, #050510 50%, transparent 80%)',
        opacity: 0.8,
      }} />

      {/* Nebula layer 1 — deep teal mist (far left) */}
      <div style={{
        position: 'absolute',
        left: -350 + d1x,
        top: arcY - 400 + d1y,
        width: 1000 * b1,
        height: 700 * b1,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 65% 65%, rgba(8,145,178,0.6) 0%, rgba(14,116,144,0.3) 30%, rgba(6,78,96,0.1) 55%, transparent 75%)',
        filter: 'blur(60px)',
      }} />

      {/* Nebula layer 2 — dark violet base (wide) */}
      <div style={{
        position: 'absolute',
        left: width * 0.1 + d4x,
        top: arcY - 500 + d4y,
        width: 1400 * b2,
        height: 800 * b2,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 70%, rgba(46,16,101,0.7) 0%, rgba(30,10,60,0.4) 35%, transparent 70%)',
        filter: 'blur(50px)',
      }} />

      {/* Nebula layer 3 — soft magenta-purple (center) */}
      <div style={{
        position: 'absolute',
        left: width * 0.18 + d2x,
        top: arcY - 440 + d2y,
        width: 1100 * b1,
        height: 700 * b1,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 52% 72%, rgba(147,51,234,0.5) 0%, rgba(126,34,206,0.3) 25%, rgba(88,28,135,0.15) 50%, transparent 72%)',
        filter: 'blur(45px)',
      }} />

      {/* Nebula layer 4 — dreamy pink heart */}
      <div style={{
        position: 'absolute',
        left: width * 0.28 + d2x * 0.6,
        top: arcY - 360 + d1y * 0.8,
        width: 800 * b2,
        height: 500 * b2,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 75%, rgba(192,132,252,0.55) 0%, rgba(168,85,247,0.3) 30%, rgba(107,33,168,0.1) 55%, transparent 72%)',
        filter: 'blur(40px)',
      }} />

      {/* Nebula layer 5 — indigo-blue drift (right) */}
      <div style={{
        position: 'absolute',
        left: width * 0.4 + d3x,
        top: arcY - 420 + d3y,
        width: 1100 * b3,
        height: 700 * b3,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 55% 68%, rgba(67,56,202,0.5) 0%, rgba(49,46,129,0.3) 30%, rgba(30,27,75,0.1) 55%, transparent 72%)',
        filter: 'blur(50px)',
      }} />

      {/* Nebula layer 6 — teal whisper (far right) */}
      <div style={{
        position: 'absolute',
        left: width * 0.6 + d1x * -0.6,
        top: arcY - 350 + d2y * -0.8,
        width: 900 * b1,
        height: 600 * b1,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 65%, rgba(8,145,178,0.4) 0%, rgba(14,116,144,0.2) 30%, transparent 65%)',
        filter: 'blur(55px)',
      }} />

      {/* Bright core — warm pink glow peaking over the horizon */}
      <div style={{
        position: 'absolute',
        left: width * 0.3 + d2x * 0.3,
        top: arcY - 250 + d1y * 0.5,
        width: 550 * b2,
        height: 350 * b2,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 85%, rgba(232,121,249,0.45) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)',
        filter: 'blur(30px)',
      }} />

      {/* Hot spot — ethereal white-pink whisper */}
      <div style={{
        position: 'absolute',
        left: width * 0.38 + d2x * 0.2,
        top: arcY - 140 + d1y * 0.3,
        width: 280 * b2,
        height: 160 * b2,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 85%, rgba(245,208,254,0.4) 0%, rgba(192,132,252,0.15) 45%, transparent 75%)',
        filter: 'blur(18px)',
      }} />

      {/* Planet + stars + rim — SVG on top */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Stars — twinkling behind the planet */}
        <Stars width={width} height={height} count={120} frame={f} />

        {/* Planet */}
        <circle cx={planetCx} cy={planetCy} r={planetR} fill="#030308" />

        {/* Soft atmospheric rim */}
        <defs>
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0E7490" stopOpacity="0" />
            <stop offset="15%" stopColor="#0891B2" stopOpacity="0.3" />
            <stop offset="35%" stopColor="#7C3AED" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#9333EA" stopOpacity="0.7" />
            <stop offset="65%" stopColor="#6366F1" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#4338CA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0E7490" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx={planetCx} cy={planetCy} r={planetR} fill="none" stroke="url(#rimGrad)" strokeWidth={1.5} opacity={rimOp} />
        <circle cx={planetCx} cy={planetCy} r={planetR + 6} fill="none" stroke="url(#rimGrad)" strokeWidth={16} opacity={rimOp * 0.2} style={{ filter: 'blur(14px)' }} />
      </svg>
    </AbsoluteFill>
  );
};

export default HeroBG;
