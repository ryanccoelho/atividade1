import { View, Text, Image } from 'react-native';

export default function App() {
  return (
    <View style={{ padding: 40, alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Compras da semana</Text>
      
      {/* Puxando a sua imagem aidento.jpg da pasta assets */}
      <Image 
        source={require('./src/assets/aidento.jpg')}
        style={{ width: 100, height: 100, marginBottom: 20, borderRadius: 10 }} 
      />

      <Text>Arroz</Text>
      <Text>Feijão</Text>
      <Text>Café</Text>
    </View>
  );
}