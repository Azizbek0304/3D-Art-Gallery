import Model from './3dModel';

export default function App() {
  return (
    <div className="App">
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
