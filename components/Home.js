import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'

// Component imports
import Event from './Event'

const Home = ({ navigation }) => {
  const [ events, setEvents ] = useState([])

  useEffect(() => {
    async function getEvents() {
      const eventbrite = await fetch(`https://thedistance.co.uk/wp-content/uploads/2020/01/eventbrite.json`)
      const response = await eventbrite.json()
      setEvents(response.events)
    }
    getEvents();
  }, [])

  const eventHandler = (selectedEvent) => {
    navigation.push('Detail', {
      event: selectedEvent
    })
  }

  return (
    <View style={ styles.container }>
      <ScrollView style={ styles.eventsScroll }>
        <Text style={ styles.sectionTitle }>Upcoming events</Text>
        <View style={ styles.eventsList }>
          { events.map((event, index) => {
            return (
              <TouchableOpacity key={ index } onPress={ () => eventHandler(event) }>
                <Event name={ event.name.text } date={ event.start.utc } image={ event.logo.url } />
              </TouchableOpacity>
            )
          }) }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },

  eventsScroll: {
    paddingTop: 70,
    paddingHorizontal: 20,
    marginBottom: 30
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  eventsList: {
    marginTop: 16,
    marginBottom: 50
  }
})

export default Home
