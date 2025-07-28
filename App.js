import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);

  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
    // setLocation({ latitude, longitude });
    setCity(location[0].city); // 예시로 직접 지정
  };

  useEffect(() => {
    ask();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={{ color: 'white' }}>날씨 정보</Text>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    color: 'white',
    fontSize: 36,
    fontWeight: '500',
  },
  weather: {
    // 원하는 스타일 추가
  },
  day: {
    width: 300,
    alignItems: 'center',
  },
});
