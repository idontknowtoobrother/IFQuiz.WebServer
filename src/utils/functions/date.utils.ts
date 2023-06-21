import { Duration } from "src/quizzes/dto/duration.dto";

export function isExpired(expiredDate: Date): boolean {
   return new Date() > expiredDate
}

export function getDateWithDuration(duration: Duration, addDiffMinutes?: number): Date {

   const durationMilliseconds = ((duration.hours * 60 * 60 * 1000) + (duration.minutes * 60 * 1000)) + ((addDiffMinutes || 0) * 60 * 1000);

   return new Date(Date.now() + durationMilliseconds)
}