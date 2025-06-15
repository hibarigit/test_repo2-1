import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// このPageコンポーネントがこのルートパス（/）のコンテンツになります
export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, world!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 画面全体を占める
    backgroundColor: '#fff', // 背景色を白に
    alignItems: 'center', // 子要素を水平方向の中央に配置
    justifyContent: 'center', // 子要素を垂直方向の中央に配置
  },
  text: {
    fontSize: 28, // 文字のサイズを大きく
    fontWeight: 'bold', // 文字を太く
    color: '#333', // 文字の色を濃い灰色に
  },
});