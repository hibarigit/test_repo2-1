import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { StatusBar } from 'expo-status-bar';
import * as THREE from 'three';

function Box(props: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta;
      meshRef.current.rotation.x += delta;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 3 : 2}
      //onClick={() => setActive(!active)}
      onPointerDown={() => setActive(!active)} 
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#FFFFFF' : '#FAFAFA'} />
    </mesh>
  );
}

function Ground() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.5, 0]}
      receiveShadow
    >
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#A0A0A0" />
    </mesh>
  );
}

// Expo Router を使わない場合、App.tsx のデフォルトエクスポートがアプリのエントリーポイントです
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Three.js on Expo (No Router)!</Text>

      <Canvas style={styles.canvas} shadows>
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow intensity={1.5} />
        <pointLight position={[-10, -10, -10]} castShadow intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        <Box position={[0, -1.0, 0]} />
        <Ground />
      </Canvas>

      <Text style={styles.instructions}>
        上に回転する立方体が表示されます。タップでサイズが変わります。
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },
  canvas: {
    //flex: 1,
    height: 400,
    width: '90%',
    backgroundColor: 'lightblue',
    borderRadius: 10,
  },
  instructions: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 50,
  },
});