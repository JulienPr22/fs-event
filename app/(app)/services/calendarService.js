import { Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

/**
 * classe de service pour gérer l'ajout d'événements au calendrier
 */
class calendarService {

  static getDefaultCalendarSource = async () => {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }



  static addEvent = async (eventData) => {

    await this.getCalendars()

    console.log("addEvent", eventData);
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      console.log("status", status);
      if (status === 'granted') {


        const calendarId =
          Platform.OS === 'ios'
            ? (await this.getDefaultCalendarSource()).id
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
