import { View, Text, StyleSheet, StatusBar, Pressable, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { cores } from './src/constants/tema';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [pending, setPending] = useState(0);
  const [remove, setremove] = useState(0);

  const [itens, setItens] = useState([
    { id: '1', nome: 'Arroz', quantidade: '5 kg', comprado: false },
    { id: '2', nome: 'Feijão', quantidade: '2 kg', comprado: false }
  ]);
  const [novoItem, setNovoItem] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [unidade, setUnidade] = useState('un');

  const adicionarItem = () => {
    if (novoItem.trim() === '') return;
    setItens([...itens, { 
      id: Date.now().toString(), 
      nome: novoItem, 
      quantidade: `${quantidade} ${unidade}`,
      comprado: false
    }]);
    setNovoItem('');
    setQuantidade(1);
    setUnidade('un');
  };

  const removerItem = (id: string) => {
    setItens(itens.filter(item => item.id !== id));
  };

  const alternarComprado = (id: string) => {
    setItens(itens.map(item => 
      item.id === id ? { ...item, comprado: !item.comprado } : item
    ));
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: cores.fundo }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor={cores.fundo} />

          <View style={styles.header}>
            <Text style={styles.list}>Minhas Lista</Text>
            <Text style={styles.title}>Compras da semana</Text>

            <View style={styles.progressBarWrapper}>
              <View style={styles.infoWrapper}>
                <View style={styles.infoWrapperLeft}>
                  <Text style={styles.pendingNumber}>{itens.filter(i => !i.comprado).length}</Text>
                  <Text style={styles.pending}>Pendetes</Text>
                </View>

                <Text style={styles.quantity}>{itens.filter(i => i.comprado).length} de {itens.length} no carrinho</Text>
              </View>
              <View style={styles.progressBsar}>
                <View style={[styles.progress, { width: itens.length > 0 ? `${(itens.filter(i => i.comprado).length / itens.length) * 100}%` : '0%' }]} />
              </View>
            </View>
          </View>

          <FlatList
            data={itens}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 160 }}
            renderItem={({ item }) => (
              <View style={[styles.linhaItem, item.comprado && styles.linhaComprada]}>
                <Pressable 
                  style={[styles.checkbox, item.comprado && styles.checkboxAtivo]} 
                  onPress={() => alternarComprado(item.id)}
                >
                  {item.comprado && <Text style={styles.checkTexto}>✓</Text>}
                </Pressable>

                <Text style={[styles.textoItem, item.comprado && styles.textoRiscado]}>
                  {item.nome}
                </Text>
                
                <View style={styles.badgeQuantidade}>
                  <Text style={styles.textoQuantidade}>{item.quantidade}</Text>
                </View>
                
                <Pressable style={styles.botaoRemoverFundo} onPress={() => removerItem(item.id)}>
                  <Text style={styles.botaoRemover}>✕</Text>
                </Pressable>
              </View>
            )}
          />

          <View style={styles.areaAdicionar}>
            <View style={styles.barraAdicionar}>
              <TextInput
                style={styles.input}
                placeholder='Novo item...'
                placeholderTextColor={cores.texto2}
                value={novoItem}
                onChangeText={setNovoItem}
              />
              <Pressable style={styles.botaoAdicionar} onPress={adicionarItem}>
                <Text style={styles.textoBotaoAdicionar}>+</Text>
              </Pressable>
            </View>

            <View style={styles.linhaControles}>
              <View style={styles.contador}>
                <Pressable onPress={() => setQuantidade(Math.max(1, quantidade - 1))}>
                  <Text style={styles.textoBotaoContador}>-</Text>
                </Pressable>
                <Text style={styles.textoQuantidadeValor}>{quantidade}</Text>
                <Pressable onPress={() => setQuantidade(quantidade + 1)}>
                  <Text style={styles.textoBotaoContador}>+</Text>
                </Pressable>
              </View>

              <View style={styles.unidades}>
                {['un', 'kg', 'cx', 'pct'].map((sigla) => (
                  <Pressable 
                    key={sigla} 
                    style={[styles.botaoUnidade, unidade === sigla && styles.botaoUnidadeAtivo]}
                    onPress={() => setUnidade(sigla)}
                  >
                    <Text style={[styles.textoUnidade, unidade === sigla && styles.textoUnidadeAtivo]}>
                      {sigla}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lista: {},
  mini: { color: cores.acento, },
  titulo: { color: cores.texto, },
  
  container: { flex: 1, paddingHorizontal: 24 },
  
  header: { marginTop: 20, marginBottom: 24 },
  list: { color: cores.acento, fontSize: 12, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 4 },
  title: { color: cores.texto, fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  
  progressBarWrapper: { backgroundColor: cores.superficie, padding: 16, borderRadius: 12, marginBottom: 24 },
  infoWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
  infoWrapperLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  
  pendingNumber: { color: cores.texto, fontSize: 16, fontWeight: 'bold' },
  quantity: { color: cores.texto2, fontSize: 12 },
  pending: { color: cores.texto2, fontSize: 14 },
  
  progressBsar: { height: 4, backgroundColor: cores.superficie2, borderRadius: 2, overflow: 'hidden' }, 
  progress: { height: '100%', backgroundColor: cores.acento, borderRadius: 2 },

  linhaItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: cores.superficie, marginBottom: 8, borderRadius: 12 },
  linhaComprada: { opacity: 0.5 }, 
  
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, borderColor: cores.texto2, marginRight: 16, justifyContent: 'center', alignItems: 'center' },
  checkboxAtivo: { backgroundColor: cores.acento, borderColor: cores.acento },
  checkTexto: { color: cores.fundo, fontWeight: 'bold', fontSize: 14 },
  
  textoItem: { color: cores.texto, fontSize: 16, flex: 1, fontWeight: '500' },
  textoRiscado: { textDecorationLine: 'line-through', color: cores.texto2 }, 
  
  badgeQuantidade: { backgroundColor: cores.superficie2, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 12 },
  textoQuantidade: { color: cores.texto2, fontSize: 12, fontWeight: 'bold' },
  
  botaoRemoverFundo: { backgroundColor: cores.removerFundo, padding: 6, borderRadius: 6 },
  botaoRemover: { color: cores.remover, fontWeight: 'bold', fontSize: 12 },
  
  areaAdicionar: { position: 'absolute', bottom: 20, left: 24, right: 24, backgroundColor: cores.superficie, padding: 16, borderRadius: 16 },
  barraAdicionar: { flexDirection: 'row', marginBottom: 12 },
  input: { flex: 1, backgroundColor: cores.fundo, color: cores.texto, padding: 14, borderRadius: 8, marginRight: 8 },
  botaoAdicionar: { backgroundColor: cores.superficie2, justifyContent: 'center', alignItems: 'center', width: 50, borderRadius: 8 },
  textoBotaoAdicionar: { color: cores.texto, fontSize: 20 },
  
  linhaControles: { flexDirection: 'row', justifyContent: 'space-between' },
  contador: { flexDirection: 'row', backgroundColor: cores.fundo, borderRadius: 8, alignItems: 'center', paddingHorizontal: 4 },
  textoBotaoContador: { color: cores.texto2, fontSize: 18, paddingHorizontal: 16, paddingVertical: 8, fontWeight: 'bold' },
  textoQuantidadeValor: { color: cores.texto, fontSize: 16, fontWeight: 'bold', minWidth: 20, textAlign: 'center' },
  
  unidades: { flexDirection: 'row', gap: 6 },
  botaoUnidade: { backgroundColor: cores.fundo, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, justifyContent: 'center' },
  botaoUnidadeAtivo: { backgroundColor: cores.acento },
  textoUnidade: { color: cores.texto2, fontWeight: 'bold', fontSize: 12 },
  textoUnidadeAtivo: { color: cores.fundo }
});