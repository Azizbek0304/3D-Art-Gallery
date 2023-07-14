// Set up your Three.js scene, camera, renderer, and controls here

// Load and position the museum environment

// Load the artworks and position them in the scene

// Handle interactions with the artworks (e.g., click event)

// Render the scene and handle animation

// Clean up Three.js resources on component unmount

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei'

import './museum.css';

const Museum = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return <div className="canvas-container" ref={canvasRef}></div>;
};

export default Museum;
