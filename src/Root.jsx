import React from 'react';
import { registerRoot, Composition } from 'remotion';
import { PerformanceAnimation } from './PerformanceAnimation';
import { HeroBG } from './HeroBG';

const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="PerformanceBento"
        component={PerformanceAnimation}
        durationInFrames={300}
        fps={30}
        width={560}
        height={680}
      />
      <Composition
        id="HeroBG"
        component={HeroBG}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
