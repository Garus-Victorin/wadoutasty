import { useState, useEffect } from 'react';

interface OpeningHours {
  [key: string]: { open: string; close: string };
}

const openingHours: OpeningHours = {
  Monday: { open: '10:00', close: '12:00' },
  Tuesday: { open: '10:00', close: '12:00' },
  Wednesday: { open: '10:00', close: '12:00' },
  Thursday: { open: '10:00', close: '12:00' },
  Friday: { open: '10:00', close: '12:00' },
  Saturday: { open: '12:00', close: '12:00' },
  Sunday: { open: '12:00', close: '12:00' },
};

type Status = 'Ouvert' | 'Fermé' | 'Ouvre bientot' | 'Ferme bientot';

function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return { hours, minutes };
}

function timeToMinutes(timeStr: string): number {
  const { hours, minutes } = parseTime(timeStr);
  return hours * 60 + minutes;
}

function getCurrentTimeMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function isOpenNow(dayName: string): boolean {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  if (dayName !== today) return false;
  
  const hours = openingHours[dayName];
  if (!hours) return false;
  
  const currentMinutes = getCurrentTimeMinutes();
  const openMinutes = timeToMinutes(hours.open);
  const closeMinutes = timeToMinutes(hours.close);
  
  // Special case for midnight (00:00 = 0 minutes, but 12:00 = 720 minutes)
  if (closeMinutes === 0) {
    // Open until midnight
    return currentMinutes >= openMinutes;
  }
  
  // Special case: if open time is after close time (like Saturday 12:00 - 12:00)
  if (openMinutes >= closeMinutes) {
    // Open throughout the day
    return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
  }
  
  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
 }

function getOpeningStatus(dayName: string): Status {
  const hours = openingHours[dayName];
  if (!hours) return 'Fermé';
  
  const currentMinutes = getCurrentTimeMinutes();
  const openMinutes = timeToMinutes(hours.open);
  const closeMinutes = timeToMinutes(hours.close);
  
  // Check if we're within opening hours
  let isOpen = false;
  
  if (closeMinutes === 0) {
    isOpen = currentMinutes >= openMinutes;
  } else if (openMinutes >= closeMinutes) {
    isOpen = currentMinutes >= openMinutes || currentMinutes < closeMinutes;
  } else {
    isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }
  
  if (isOpen) {
    // Check if closing soon (within 30 minutes)
    if (closeMinutes > 0) {
      const minutesUntilClose = closeMinutes - currentMinutes;
      if (minutesUntilClose > 0 && minutesUntilClose <= 30) {
        return 'Ferme bientot';
      }
    }
    return 'Ouvert';
  } else {
    // Check if opening soon (within 30 minutes)
    if (openMinutes > currentMinutes) {
      const minutesUntilOpen = openMinutes - currentMinutes;
      if (minutesUntilOpen <= 30) {
        return 'Ouvre bientot';
      }
    }
    return 'Fermé';
  }
}

export function useOpeningStatus() {
  const [status, setStatus] = useState<Status>('Fermé');
  const [currentDay, setCurrentDay] = useState<string>('');
  const [nextOpenTime, setNextOpenTime] = useState<string>('');

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
      const todayStatus = getOpeningStatus(dayName);
      
      setStatus(todayStatus);
      setCurrentDay(dayName);
      
      // Find next opening time if closed
      if (todayStatus === 'Fermé') {
        const days: (keyof typeof openingHours)[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const todayIndex = days.indexOf(dayName as keyof typeof openingHours);
        
        for (let i = 1; i <= 7; i++) {
          const nextDayIndex = (todayIndex + i) % 7;
          const nextDay = days[nextDayIndex];
          const nextDayHours = openingHours[nextDay];
          
          if (nextDayHours) {
            const dayNameFr = nextDay === 'Monday' ? 'Lundi' :
                             nextDay === 'Tuesday' ? 'Mardi' :
                             nextDay === 'Wednesday' ? 'Mercredi' :
                             nextDay === 'Thursday' ? 'Jeudi' :
                             nextDay === 'Friday' ? 'Vendredi' :
                             nextDay === 'Saturday' ? 'Samedi' : 'Dimanche';
            setNextOpenTime(`${dayNameFr} ${nextDayHours.open}`);
            break;
          }
        }
      }
    };

    updateStatus();
    // Update every minute
    const interval = setInterval(updateStatus, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return { status, currentDay, nextOpenTime, isOpen: status === 'Ouvert' };
}

export { openingHours };
