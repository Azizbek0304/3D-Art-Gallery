import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './virtualGallery.css'; // Replace with the path to your .glTF model file

const VirtualGallery = () => {
  const sceneRef = useRef();
  const rendererRef = useRef();
  const controlsRef = useRef();
  const modelRef = useRef();
  const modelPath = await loader.loadAsync('./artgallery.glb');

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    sceneRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enablePan = true;

    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;
      modelRef.current = model;
      scene.add(model);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    };

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      scene.remove(modelRef.current);
      renderer.dispose();
      sceneRef.current.removeChild(renderer.domElement);
      controls.dispose();
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default VirtualGallery;
