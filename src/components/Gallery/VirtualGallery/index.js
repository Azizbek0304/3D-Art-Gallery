import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function VirtualGallery() {
  const model = useLoader(GLTFLoader, './artgallery.glb');
  console.log(model);

  // ...
}
