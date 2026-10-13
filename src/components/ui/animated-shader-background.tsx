import React, { useEffect, useRef } from 'react';

// Renderiza o shader em resolução reduzida (o efeito é suave, então o upscale não aparece)
// e limita a ~30fps. WebGL puro: evita carregar a biblioteca three.js inteira.
const RENDER_SCALE = 0.5;
const FRAME_INTERVAL = 1000 / 30;

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float iTime;
  uniform vec2 iResolution;

  #define NUM_OCTAVES 3

  float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);

    float res = mix(
      mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
      mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
    return res * res;
  }

  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.3;
    vec2 shift = vec2(100);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
      v += a * noise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.4;
    }
    return v;
  }

  vec4 tanh4(vec4 x) {
    vec4 e = exp(-2.0 * x);
    return (1.0 - e) / (1.0 + e);
  }

  void main() {
    vec2 p = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y * 6.0;
    vec2 v;
    vec4 o = vec4(0.0);

    float f = 2.0 + fbm(p + vec2(iTime * 0.2, 0.0)) * 0.5;

    // Paleta de cor baseada no site (Champagne/Dourado/Off-white)
    // Accent Color: #c5a059 -> 0.77, 0.63, 0.35
    vec3 lowColor = vec3(0.77, 0.63, 0.35); // Dourado Milchukova
    vec3 highColor = vec3(0.98, 0.97, 0.96); // Paper White

    for (float i = 0.0; i < 25.0; i++) {
      v = p + cos(i * i + (iTime * 0.05 + p.x * 0.02) + i * vec2(11.0, 9.0)) * 2.5;

      vec3 auroraColors = mix(lowColor, highColor, 0.5 + 0.5 * sin(i * 0.5 + iTime * 0.2));

      float dist = length(max(v, vec2(v.x * f * 0.015, v.y * 0.8)));
      vec3 currentContribution = auroraColors * exp(sin(i * 0.5 + iTime * 0.4)) / dist;

      float opacity = smoothstep(0.0, 1.0, i / 25.0) * 0.15; // Tornar mais sutil
      o += vec4(currentContribution, 1.0) * opacity;
    }

    // Ajuste de brilho e tom para o site
    o = tanh4(pow(o / 100.0, vec4(1.4)));
    gl_FragColor = vec4(o.rgb * 1.5, o.a * 0.4); // Reduzir opacidade final para transparência suave
  }
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

const AnimatedShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Sem animação para quem pediu menos movimento no sistema
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;

    const program = gl.createProgram()!;
    const vs = compile(gl, gl.VERTEX_SHADER, vertexShader);
    const fs = compile(gl, gl.FRAGMENT_SHADER, fragmentShader);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Um único triângulo que cobre a tela inteira
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'iTime');
    const uResolution = gl.getUniformLocation(program, 'iResolution');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // equivalente ao AdditiveBlending do three.js

    const resize = () => {
      const w = Math.max(1, Math.floor(window.innerWidth * RENDER_SCALE));
      const h = Math.max(1, Math.floor(window.innerHeight * RENDER_SCALE));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uResolution, w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    let last = 0;
    let frameId = 0;
    const animate = (now: number) => {
      frameId = requestAnimationFrame(animate);
      if (now - last < FRAME_INTERVAL) return;
      // Mantém a mesma velocidade do original (0.01 por frame a 60fps)
      time += Math.min(now - last, 100) * 0.0006;
      last = now;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const start = () => {
      if (!frameId) {
        last = performance.now();
        frameId = requestAnimationFrame(animate);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };
    // Não gasta GPU com a aba em segundo plano
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ opacity: 0.6 }}
    />
  );
};

export default AnimatedShaderBackground;
