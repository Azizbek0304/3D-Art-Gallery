import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { WebGL } from 'three/examples/jsm/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './virtualGallery.css';

const VirtualGallery = () => {
  const sceneRef = useRef();
  const rendererRef = useRef();
  const cubeRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    if (WebGL.isWebGLAvailable()) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
      rendererRef.current = renderer;

      sceneRef.current.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#fff' });
      const cube = new THREE.Mesh(geometry, material);
      cubeRef.current = cube;
      scene.add(cube);

      camera.position.z = 5;

      const controls = new OrbitControls(camera, renderer.domElement);
      controlsRef.current = controls;
      controls.enableRotate = true;
      controls.enableZoom = true;
      controls.enablePan = true;

      const animate = () => {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
        controls.update();
      };

      animate();

      return () => {
        scene.remove(cube);
        renderer.dispose();
        sceneRef.current.removeChild(renderer.domElement);
        controls.dispose();
      };
    } else {
      const warning = WebGL.getWebGLErrorMessage();
      sceneRef.current.appendChild(warning);
    }
  }, []);

  return <div ref={sceneRef} />;
};

export default VirtualGallery;
