import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import BookingCard from '../../assets/components/BookingCard';
import { listenToClassesByDate, reserveSpot } from '../services/firebaseFunctions';

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [classes, setClasses] = useState([]);
  const [weekStart, setWeekStart] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  useEffect(() => {
    if (!selectedDate) return;

    const unsubscribe = listenToClassesByDate(selectedDate, (classList) => {
      setClasses(classList);
    });

    return () => unsubscribe();
  }, [selectedDate]);

  const handleReserve = async (classId) => {
    await reserveSpot(classId);
  };

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const shiftWeek = (direction) => {
    const newStart = new Date(weekStart);
    newStart.setDate(weekStart.getDate() + direction * 7);
    if (newStart >= today) setWeekStart(newStart);
  };

  const spanishDays = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.weekNav}>
          <TouchableOpacity onPress={() => shiftWeek(-1)} disabled={weekStart <= today} style={styles.orangeButton}>
            <Text style={styles.whiteText}>← Prev</Text>
          </TouchableOpacity>
          <Text style={[styles.orangeButton, styles.whiteText]}>{weekDates[0]} - {weekDates[6]}</Text>
          <TouchableOpacity onPress={() => shiftWeek(1)} style={styles.orangeButton}>
            <Text style={styles.whiteText}>Next →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendarContainer}>
          {weekDates.map((date) => {
            const dayOfWeek = new Date(date).getDay();
            const isSelected = date === selectedDate;
            return (
              <TouchableOpacity key={date} onPress={() => onDayPress({ dateString: date })} style={isSelected ? styles.orangeButton : null}>
                <Text style={isSelected ? styles.whiteText : null}>{spanishDays[dayOfWeek]}</Text>
                <Text style={isSelected ? styles.whiteText : null}>{new Date(date).getDate()}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.leftTitle}>Clases Disponibles</Text>
        <FlatList
          data={classes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookingCard
              title={item.title}
              subtitle={`${item.time} - Lugares: ${item.availableSpots}`}
              onPress={() => handleReserve(item.id)}
              disabled={item.availableSpots === 0}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  weekNav: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  calendarContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  leftTitle: { fontSize: 18, marginBottom: 20, marginTop:20 },
  orangeButton: { backgroundColor: '#f96a02',padding: 7, borderRadius: 8 },
  whiteText: { color: 'white' },
});

export default App;
