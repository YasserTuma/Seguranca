import {format,parseISO} from 'date-fns';
//import { zonedTimeToUtc } from 'date-fns-tz';

export function data_hora(data) {
  try {
    const parsedDate = parseISO(data);
    return format(
        new Date(parsedDate),
        'dd/MM/yyyy HH:mm',
      ); 
  } catch (error) {
    
  }
}