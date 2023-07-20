import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const VirtualGallery = ({ artworks, onArtworkClick }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Set up Three.js scene when the component mounts

    // Camera configuration
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    // Load 3D models and add them to the scene
    const scene = new THREE.Scene();
    const loader = new GLTFLoader();

    artworks.forEach((artwork) => {
      loader.load(artwork.url, (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.1, 0.1, 0.1); // Adjust scale as needed
        model.position.set(0, 0, 0); // Adjust position as needed
        scene.add(model);

        // Add click event listener to the model to handle artwork selection
        model.userData = { artwork };
        model.onClick = () => onArtworkClick(artwork);
      });
    });

    // Set up resize event listener for responsive rendering
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up Three.js resources when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [artworks, onArtworkClick]);

  // Animation loop for rendering the scene
  const animate = () => {
    requestAnimationFrame(animate);
    // Add any animations or updates to the scene here
  };

  useEffect(() => {
    animate();
  }, []);

  return <div ref={canvasRef} />;
};

export default VirtualGallery;
