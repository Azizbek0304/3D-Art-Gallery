import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Renderer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Set up controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Add lights to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 0);
    scene.add(directionalLight);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Clean up Three.js resources on component unmount
    return () => {
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={canvasRef}></div>;
};

export default Renderer;