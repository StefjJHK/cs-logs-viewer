import dateFormat from 'dateformat';

export class DateUtils {
  static format(date: Date) {
    return dateFormat(date, 'dd mm yyyy, h:MM:ss.l');
  }
}
