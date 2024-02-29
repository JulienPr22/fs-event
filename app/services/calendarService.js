import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

class calendarService {

  static getCalendar = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCa(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
        return calendars;
      }
  }

  static getCalendars = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
        return calendars;
      }
  }

  static getDefaultCalendarSource = async () => {
    console.log("getDefaultCalendarSource");
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.id;
  }

  static addEvent = async(eventData) => {

    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {

        const calendarId =
      Platform.OS === 'ios'
        ? await this.getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };

        console.log("calendarId", calendarId);
        const eventId = await Calendar.createEventAsync(calendarId, eventData);
        console.log('Événement ajouté au calendrier avec succès. ID:', eventId);
      } else {
        console.log('Permission refusée pour accéder au calendrier');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement au calendrier:', error);
    }
  }
}

export default calendarService;
