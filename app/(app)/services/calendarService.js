import { Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

class calendarService {

  static getDefaultCalendarSource = async () => {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.id;
  }

  static addEvent = async (eventData) => {

    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendarId =
          Platform.OS === 'ios'
            ? await this.getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Expo Calendar' };

        await Calendar.createEventAsync(calendarId, eventData);
      } else {
        console.log('Permission refusée pour accéder au calendrier');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement au calendrier:', error);
    }
  }
}

export default calendarService;
