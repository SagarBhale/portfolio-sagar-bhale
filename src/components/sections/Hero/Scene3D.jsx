import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import styles from './Hero.module.css';

/**
 * Premium Three.js scene:
 * - 2000-point particle galaxy/nebula field
 * - 3 floating glowing orbs with mouse parallax
 * - Animated geometric sphere in center
 * - Smooth color transitions for dark/light mode
 */
function Scene3D({ isDark }) {
  const containerRef = useRef(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rendererRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Color palette
    const primaryColor = isDark ? 0x00d4aa : 0x059669;
    const secondaryColor = isDark ? 0xa78bfa : 0x7c3aed;
    const accentColor = isDark ? 0xf472b6 : 0xec4899;

    // ── 1. Galaxy Particle Field ──────────────────────────────────────────
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorA = new THREE.Color(primaryColor);
    const colorB = new THREE.Color(secondaryColor);
    const colorC = new THREE.Color(accentColor);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spiral galaxy distribution
      const radius = Math.random() * 18 + 2;
      const spinAngle = radius * 2.5;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;
      const randomX = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 1.5;
      const randomY = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 1.5;
      const randomZ = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 1.5;

      positions[i3]     = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color gradient from center
      const mixFactor = Math.min(radius / 18, 1);
      const t = i / particleCount;
      let c;
      if (t < 0.33) c = colorA.clone().lerp(colorB, mixFactor);
      else if (t < 0.66) c = colorB.clone().lerp(colorC, mixFactor);
      else c = colorC.clone().lerp(colorA, mixFactor);

      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
      sizes[i] = Math.random() * 3 + 0.5;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.85 : 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── 2. Central Geometric Sphere ───────────────────────────────────────
    const sphereGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.2,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Inner solid sphere glow
    const innerGeo = new THREE.SphereGeometry(1.0, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isDark ? 0.06 : 0.04,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);

    // ── 3. Floating Orbs (mouse parallax) ────────────────────────────────
    const orbData = [
      { pos: [4, 2.5, -3],  color: primaryColor,   size: 0.4, speed: 0.8 },
      { pos: [-4.5, -2, -2], color: secondaryColor, size: 0.3, speed: 1.1 },
      { pos: [2, -3.5, -4], color: accentColor,    size: 0.25, speed: 0.6 },
    ];

    const orbs = orbData.map(({ pos, color, size, speed }) => {
      const geo = new THREE.SphereGeometry(size, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: isDark ? 0.7 : 0.5,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.userData = { basePos: [...pos], speed };
      scene.add(mesh);

      // Ring around orb
      const ringGeo = new THREE.TorusGeometry(size * 1.8, size * 0.08, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: isDark ? 0.4 : 0.25,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 4;
      mesh.add(ring);

      return mesh;
    });

    // ── 4. Connecting Lines (sparse) ──────────────────────────────────────
    const linePoints = [];
    for (let i = 0; i < 30; i++) {
      const a = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      );
      const b = new THREE.Vector3(
        a.x + (Math.random() - 0.5) * 4,
        a.y + (Math.random() - 0.5) * 3,
        a.z + (Math.random() - 0.5) * 2
      );
      linePoints.push(a, b);
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMat = new THREE.LineBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isDark ? 0.12 : 0.08,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // ── Animation Loop ────────────────────────────────────────────────────
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.006;

      // Galaxy rotation
      particles.rotation.y = time * 0.05;
      particles.rotation.x = Math.sin(time * 0.1) * 0.05;

      // Sphere rotation
      sphere.rotation.x = time * 0.15;
      sphere.rotation.y = time * 0.2;
      sphere.rotation.z = time * 0.08;

      // Lines subtle rotation
      lines.rotation.y = time * 0.03;

      // Orbs floating + mouse parallax
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      orbs.forEach((orb, idx) => {
        const { basePos, speed } = orb.userData;
        orb.position.x = basePos[0] + Math.sin(time * speed + idx) * 0.4 + mx * 0.6;
        orb.position.y = basePos[1] + Math.cos(time * speed * 0.7 + idx) * 0.3 + my * 0.4;
        orb.position.z = basePos[2] + Math.sin(time * speed * 0.5) * 0.2;
        orb.children[0].rotation.z += 0.01 * speed;
        orb.children[0].rotation.x += 0.005 * speed;
      });

      // Camera gentle drift
      camera.position.x += (mx * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (my * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize Handler ────────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      orbs.forEach((orb) => {
        orb.geometry?.dispose();
        orb.material?.dispose();
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDark, onMouseMove]);

  return <div ref={containerRef} className={styles.scene3d} aria-hidden />;
}

export default React.memo(Scene3D);
