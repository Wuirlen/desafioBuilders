import React, { useState, useEffect } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import Loading from './components/Loading';

export default function App() {
  const [location, setLocation] = useState(null);
  const [dados, setDados] = useState(null);
  const [visible, setVisible] = useState(false);


  async function buscarDados() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    setVisible(true)
    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location?.coords?.latitude,
      longitude: location?.coords?.longitude,
      latitudeDelta: 0.0522,
      longitudeDelta: 0.0421,
    });


    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location?.coords?.latitude}&lon=${location?.coords?.longitude}&appid=9027d2fc7ed281a5d6cd657fcdaa21ca&lang=pt_br`)
      .then((response) => response.json())
    setDados(dados);
    setVisible(false);
  }


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: Number(location?.latitude) ? Number(location?.latitude) : 37.78825,
          longitude: Number(location?.longitude) ? Number(location?.longitude) : -122.4324,
          latitudeDelta: 0.0822,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: Number(location?.latitude) ? Number(location?.latitude) : 37.78825, longitude: Number(location?.longitude) ? Number(location?.longitude) : -122.4324 }}
        >
          <Callout>
            <Text>{dados?.name}</Text>
          </Callout>
        </Marker>
      </MapView>
      <Loading visible={visible} />
      <View style={styles.header}>
        <Text style={styles.textHeader}>País: {dados?.sys?.country}</Text>
        <Text style={styles.textHeader}>Cidade: {dados?.name}</Text>
        <Text style={styles.textHeader}>Clima: {dados?.weather[0].description}</Text>
        <Text style={styles.textHeader}>Vento: {dados?.wind?.speed}</Text>
        <Text style={styles.textHeader}>Fuso Horário: {dados?.timezone}</Text>
        <Text style={styles.textHeader}>Umidade: {dados?.main?.humidity}</Text>
        <Text style={styles.textHeader}>Pressão: {dados?.main?.pressure}</Text>
        <Text style={styles.textHeader}>Temperatura Máxima: {dados?.main?.temp_max}</Text>
        <Text style={styles.textHeader}>Temperatura Minima: {dados?.main?.temp_min}</Text>

      </View>

      <Button
        style={styles.button}
        title="Pesquisar"
        color="#37a132"
        onPress={() => buscarDados()}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 200,
    marginBottom: 50
  },
  button: {
    marginTop: 200
  },
  textHeader: {
    fontWeight: 'bold'
  },
  header: {
    marginBottom: 80,
    justifyContent: 'center',
  }
});