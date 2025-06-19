'use client';

import { useEffect, useRef } from 'react';

type IshiharaPlateProps = {
  width?: number;
  height?: number;
  number: string;
};

export default function IshiharaPlate({ width = 300, height = 300, number }: IshiharaPlateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const radius = width / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    // Background: fill circle with random green dots
    for (let i = 0; i < 1500; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      const dx = x - centerX;
      const dy = y - centerY;

      if (dx * dx + dy * dy <= radius * radius) {
        ctx.fillStyle = randomGreen();
        ctx.beginPath();
        ctx.arc(x, y, rand(3, 6), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Overlay number in red/orange dots
    ctx.font = `${radius * 0.9}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textData = getTextPixels(ctx, number, width, height);

    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;

      const idx = ((Math.floor(y) * width) + Math.floor(x)) * 4;
      const isTextPixel = textData[idx + 3] > 128;

      const dx = x - centerX;
      const dy = y - centerY;

      if (dx * dx + dy * dy <= radius * radius && isTextPixel) {
        ctx.fillStyle = randomRed();
        ctx.beginPath();
        ctx.arc(x, y, rand(3, 6), 0, Math.PI * 2);
        ctx.fill();
      }
    }

  }, [number, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}

// helpers
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomGreen() {
  const greens = ['#6EB36E', '#92D392', '#7CC67C', '#A0E0A0'];
  return greens[Math.floor(Math.random() * greens.length)];
}

function randomRed() {
  const reds = ['#E57373', '#FF8A65', '#F44336', '#EF5350'];
  return reds[Math.floor(Math.random() * reds.length)];
}

function getTextPixels(ctx: CanvasRenderingContext2D, text: string, w: number, h: number): Uint8ClampedArray {
  const buffer = document.createElement('canvas');
  buffer.width = w;
  buffer.height = h;
  const bctx = buffer.getContext('2d')!;
  bctx.clearRect(0, 0, w, h);
  bctx.font = `${w * 0.4}px Arial`;
  bctx.textAlign = 'center';
  bctx.textBaseline = 'middle';
  bctx.fillStyle = '#000';
  bctx.fillText(text, w / 2, h / 2);
  return bctx.getImageData(0, 0, w, h).data;
}