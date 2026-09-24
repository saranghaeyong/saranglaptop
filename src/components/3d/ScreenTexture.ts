import * as THREE from 'three';

export function createScreenTexture(isDark: boolean, activeSection: string | null): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Background
  if (isDark) {
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, '#090a0f');
    bgGrad.addColorStop(0.5, '#050608');
    bgGrad.addColorStop(1, '#020304');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const step = 48;
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  } else {
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, '#f1f3f7');
    bgGrad.addColorStop(0.5, '#e4e7ec');
    bgGrad.addColorStop(1, '#d8dbe0');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
    ctx.lineWidth = 1;
    const step = 48;
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  // Top Status Bar
  const textColor = isDark ? '#ffffff' : '#0f172a';
  const subTextColor = isDark ? '#94a3b8' : '#475569';
  const accentColor = isDark ? '#60a5fa' : '#2563eb';
  const dimColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';

  ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)';
  ctx.fillRect(0, 0, canvas.width, 42);
  ctx.fillStyle = dimColor;
  ctx.fillRect(0, 42, canvas.width, 1);

  // Status text
  ctx.font = '500 16px "JetBrains Mono", monospace';
  ctx.fillStyle = subTextColor;
  ctx.fillText('SARANG-OS // SYSTEM v26.4', 40, 26);

  ctx.textAlign = 'right';
  ctx.fillText('CUSAT · MCA FIRST CLASS · 7.66 CGPA   |   2026', canvas.width - 40, 26);
  ctx.textAlign = 'left';

  // Center Content - Assembled / Default view
  // Large Editorial Name
  ctx.font = '700 84px "Inter", sans-serif';
  ctx.fillStyle = textColor;
  ctx.letterSpacing = '4px';
  ctx.fillText('SARANG R N', 100, 310);

  // Decorative divider
  ctx.fillStyle = accentColor;
  ctx.fillRect(100, 345, 120, 4);

  // Taglines
  const taglines = [
    'MCA GRADUATE',
    'SOFTWARE DEVELOPMENT',
    'PYTHON',
    'MACHINE LEARNING'
  ];

  ctx.font = '600 24px "JetBrains Mono", monospace';
  ctx.fillStyle = subTextColor;
  taglines.forEach((tag, i) => {
    ctx.fillText(`• ${tag}`, 100, 410 + i * 44);
  });

  // Secondary right card: Feature project summary
  const cardX = 760;
  const cardY = 220;
  const cardW = 680;
  const cardH = 430;

  ctx.fillStyle = isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.7)';
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 12);
  ctx.fill();
  ctx.stroke();

  // Card header
  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillStyle = accentColor;
  ctx.fillText('FEATURED ACADEMIC DISSERTATION · 16 CREDITS · GRADE S', cardX + 32, cardY + 45);

  ctx.font = '700 24px "Inter", sans-serif';
  ctx.fillStyle = textColor;
  ctx.fillText('TOWARDS THE DETECTION OF PHISHING', cardX + 32, cardY + 90);
  ctx.fillText('WEBSITES USING LLM & CNN', cardX + 32, cardY + 124);

  ctx.font = '400 16px "Inter", sans-serif';
  ctx.fillStyle = subTextColor;
  ctx.fillText('Hybrid phishing detection combining webpage content analysis with', cardX + 32, cardY + 175);
  ctx.fillText('character-level CNN URL classification & LLM credential-taking analysis.', cardX + 32, cardY + 203);

  // Tech stack items
  const techs = ['PyTorch', 'CNN', 'LLM', 'Python', 'Selenium', 'Playwright', 'NLP'];
  ctx.font = '500 13px "JetBrains Mono", monospace';
  let tx = cardX + 32;
  const ty = cardY + 265;
  techs.forEach(t => {
    const textMetrics = ctx.measureText(t);
    const tw = textMetrics.width + 20;
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
    ctx.beginPath();
    ctx.roundRect(tx, ty - 18, tw, 26, 4);
    ctx.fill();
    ctx.fillStyle = textColor;
    ctx.fillText(t, tx + 10, ty);
    tx += tw + 10;
  });

  // Card bottom info
  ctx.font = '400 14px "JetBrains Mono", monospace';
  ctx.fillStyle = subTextColor;
  ctx.fillText('INSTITUTION: COCHIN UNIVERSITY OF SCIENCE AND TECHNOLOGY', cardX + 32, cardY + 340);
  ctx.fillText('COMPLETION: APRIL 2026   |   EVALUATION: ACCURACY · PRECISION · RECALL · F1', cardX + 32, cardY + 372);

  // Bottom prompt on screen
  ctx.font = '500 16px "JetBrains Mono", monospace';
  ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';
  ctx.fillText('[ CLICK LAPTOP TO TRIGGER CINEMATIC DISASSEMBLY ]', 100, 720);

  // Contact quick coordinates
  ctx.font = '400 15px "JetBrains Mono", monospace';
  ctx.fillStyle = subTextColor;
  ctx.fillText('rnsarang@gmail.com   ·   +91 7994963196   ·   Kakkand, Ernakulam, Kerala', 100, 765);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}
