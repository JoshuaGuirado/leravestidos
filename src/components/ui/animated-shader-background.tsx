import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedShaderBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
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

        void main() {
          vec2 p = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y * 6.0;
          vec2 v;
          vec4 o = vec4(0.0);

          float f = 2.0 + fbm(p + vec2(iTime * 0.2, 0.0)) * 0.5;

          for (float i = 0.0; i < 25.0; i++) {
            v = p + cos(i * i + (iTime * 0.05 + p.x * 0.02) + i * vec2(11.0, 9.0)) * 2.5;
            
            // Paleta de cor baseada no site (Champagne/Dourado/Off-white)
            // Accent Color: #c5a059 -> 0.77, 0.63, 0.35
            vec3 lowColor = vec3(0.77, 0.63, 0.35); // Dourado Milchukova
            vec3 highColor = vec3(0.98, 0.97, 0.96); // Paper White
            
            vec3 auroraColors = mix(lowColor, highColor, 0.5 + 0.5 * sin(i * 0.5 + iTime * 0.2));
            
            float dist = length(max(v, vec2(v.x * f * 0.015, v.y * 0.8)));
            vec3 currentContribution = auroraColors * exp(sin(i * 0.5 + iTime * 0.4)) / dist;
            
            float opacity = smoothstep(0.0, 1.0, i / 25.0) * 0.15; // Tornar mais sutil
            o += vec4(currentContribution, 1.0) * opacity;
          }

          // Ajuste de brilho e tom para o site
          o = tanh(pow(o / 100.0, vec4(1.4)));
          gl_FragColor = vec4(o.rgb * 1.5, o.a * 0.4); // Reduzir opacidade final para transparência suave
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    const animate = () => {
      material.uniforms.iTime.value += 0.01;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1]" style={{ opacity: 0.6 }} />
  );
};

export default AnimatedShaderBackground;
