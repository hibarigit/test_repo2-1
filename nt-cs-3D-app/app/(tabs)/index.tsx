// app/(tabs)/index.tsx
import { Canvas, useFrame } from '@react-three/fiber/native';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as THREE from 'three';
// StatusBar は _layout.tsx で既に設定されている可能性が高いですが、ここでもインポートしておいても問題ありません
import { StatusBar } from 'expo-status-bar';

// (以前のBoxとGroundコンポーネントはそのまま貼り付けます)
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
      scale={active ? 2 : 1.5}
      onClick={() => setActive(!active)}
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

// Expo Router のタブ内のルートコンポーネント
// デフォルトのテンプレートでは TabOneScreen のような名前になっているかもしれませんが、Pageでも問題ありません
export default function TabOneScreen() { // または export default function Page()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Three.js on Expo!</Text>

      <Canvas style={styles.canvas} shadows>
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow intensity={1.5} />
        <pointLight position={[-10, -10, -10]} castShadow intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        <Box position={[0, 0, 0]} />
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
    flex: 1,
    width: '100%',
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