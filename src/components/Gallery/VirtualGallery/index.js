import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './virtualGallery.css';

const VirtualGallery = () => {
  const sceneRef = useRef();
  const rendererRef = useRef();
  const controlsRef = useRef();
  const modelRef = useRef(); // Add a reference for the model

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    rendererRef.current = renderer;

    sceneRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enablePan = true;

    scene.background = new THREE.Color('#e5e5e5');

    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: '#c7c7c7' });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const loader = new GLTFLoader();
    loader.load('path/to/your/model.glb', (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(model);
      modelRef.current = model; // Save the model reference
    });

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 50;
    scene.add(light);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
      controls.update();
    };

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    });

    return () => {
      scene.remove(modelRef.current); // Use the model reference
      renderer.dispose();
      sceneRef.current.removeChild(renderer.domElement);
      controls.dispose();
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default VirtualGallery;
