export function isExpired(expiredDate: Date): boolean {
   return new Date() > expiredDate
}