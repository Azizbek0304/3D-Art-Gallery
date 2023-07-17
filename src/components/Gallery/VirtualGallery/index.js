import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const VirtualGallery = () => {
  const sceneRef = useRef();
  const rendererRef = useRef();
  const controlsRef = useRef();
  const statsRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(5));

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer();
    renderer.useLegacyLights = false;
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    sceneRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    const loader = new GLTFLoader();
    loader.load(
      './artgallery.glb', // Replace with the path to your GLB file
      function (gltf) {
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            const mesh = child;
            mesh.receiveShadow = true;
            mesh.castShadow = true;
          }
          if (child.isLight) {
            const light = child;
            light.castShadow = true;
            light.shadow.bias = -0.003;
            light.shadow.mapSize.width = 2048;
            light.shadow.mapSize.height = 2048;
          }
        });
        scene.add(gltf.scene);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      function (error) {
        console.log(error);
      }
    );

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }

    const stats = new Stats();
    statsRef.current = stats;
    document.body.appendChild(stats.dom);

    function animate() {
      requestAnimationFrame(animate);

      controls.update();

      render();

      stats.update();
    }

    function render() {
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      scene.remove(scene.children[0]);
      renderer.dispose();
      sceneRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default VirtualGallery;
