import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const VirtualGallery = () => {
  const sceneRef = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('./../../3dModel/small_art_gallery_space.glb', (gltf) => {
      sceneRef.current.add(gltf.scene);
    });
  }, []);

  return (
    <div className="canvas-container">
      <Canvas>
        <scene ref={sceneRef} />
      </Canvas>
    </div>
  );
};

export default VirtualGallery;
