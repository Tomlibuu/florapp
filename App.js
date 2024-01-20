import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from '@rneui/base';
import { Ionicons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
      <MapView
      provider={PROVIDER_GOOGLE} // Specify Google Maps as the provider
      style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    ><Marker
    coordinate={{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }}
    title="Oma sijainti"
    description="Tässä olet nyt"
  /></MapView>
    
    )}
      <TouchableOpacity
        //onPress={buttonClickedHandler}
        style={styles.roundButton1}>
        <Ionicons name="add" size={40} color="white" />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    position: "absolute",
    bottom: "5%",
    zIndex: 999,

  },
  roundButton1: {
    left: '35%',
    top: '40%',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "85%",
    position: "absolute"
  },
});
