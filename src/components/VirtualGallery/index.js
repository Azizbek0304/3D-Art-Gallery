import React, { useRef, useEffect, useState } from 'react';
import Artwork from './ArtWork';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Loading from './Loading';

const VirtualGallery = ({ artworks, activeExhibition, onArtworkClick }) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for 3 seconds (you can replace this with actual data fetching or loading)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Set up Three.js scene when the component mounts
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(10, 10, 10);
    spotLight.angle = 0.15;
    spotLight.penumbra = 1;
    spotLight.castShadow = true;
    scene.add(spotLight);

    artworks.forEach((artwork) => {
      const loader = new GLTFLoader();
      loader.load(artwork.url, (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.1, 0.1, 0.1);
        model.position.set(0, 0, 0);
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

    // Set up animation loop for rendering the scene
    const animate = () => {
      requestAnimationFrame(animate);
      // Add any animations or updates to the scene here

      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();

    // Clean up Three.js resources when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.dispose();
    };
  }, [artworks, onArtworkClick]);

  return (
    <div ref={canvasRef}>
      {loading ? (
        <Loading />
      ) : (
        <Canvas>
          <OrbitControls
            enablePan
            enableZoom
            enableRotate
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
          <OrbitControls />
          {/* Render the 3D scene and artworks */}
          {artworks.map((artwork) => (
            <Artwork
              key={artwork.id}
              name={artwork.name}
              description={artwork.description}
              imageUrl={artwork.imageUrl}
            />
          ))}
        </Canvas>
      )}
    </div>
  );
};

export default VirtualGallery;
