import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { WebGL } from 'three/examples/jsm/addons/capabilities/WebGL.js';
import './virtualGallery.css';

const VirtualGallery = () => {
  const sceneRef = useRef();
  const rendererRef = useRef();
  const cubeRef = useRef();

  useEffect(() => {
    if (WebGL.isWebGLAvailable()) {
      // Create the scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

      // Attach the renderer to the DOM
      sceneRef.current.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#fff' });
      const cube = new THREE.Mesh(geometry, material);

      scene.add(cube);

      camera.position.z = 5;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();

      // Clean up
      return () => {
        // Remove renderer and cube from scene
        scene.remove(cube);
        renderer.dispose();

        // Remove renderer DOM element
        sceneRef.current.removeChild(renderer.domElement);
      };
    } else {
      const warning = WebGL.getWebGLErrorMessage();
      sceneRef.current.appendChild(warning);
    }
  }, []);

  return <div ref={sceneRef} />;
};

export default VirtualGallery;
