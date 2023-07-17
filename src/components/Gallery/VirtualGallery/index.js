import React, { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Environment, useGLTF} from '@react-three/drei'

const VirtualGallery = () => {
  const model = useGLTF('./Model/artgallery.glb');

  return (
    <div className="canvas-container">
      <primitive object={model.scene} />
    </div>
  );
};

export default VirtualGallery;
