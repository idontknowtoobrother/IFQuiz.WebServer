import { ADD_MINUTES_DIFF_SEND_QUIZ_ANSWER } from "src/config/constraints";
import { Duration } from "src/quizzes/dto/duration.dto";

export function isExpired(expiredDate: Date, isAddDiff: boolean): boolean {
   if (!isAddDiff) {
      return new Date() > expiredDate;
   }

   const newExpiredDate = new Date(expiredDate.getTime());
   newExpiredDate.setMinutes(newExpiredDate.getMinutes() + ADD_MINUTES_DIFF_SEND_QUIZ_ANSWER); // Add 5 minutes to expiredDate
   return new Date() > newExpiredDate;
}

export function getDateWithDuration(duration: Duration, addDiffMinutes?: number): Date {

   const durationMilliseconds = ((duration.hours * 60 * 60 * 1000) + (duration.minutes * 60 * 1000)) + ((addDiffMinutes || 0) * 60 * 1000);

   return new Date(Date.now() + durationMilliseconds)
}