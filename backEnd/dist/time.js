"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateMoreThanAWeekOld = isDateMoreThanAWeekOld;
function isDateMoreThanAWeekOld(dateString) {
    // Parse the input date string into a Date object
    const inputDate = new Date(dateString);
    // Get the current date
    const currentDate = new Date();
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentDate - inputDate;
    // Calculate the number of milliseconds in a week (7 days)
    const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
    // Check if the difference is greater than or equal to a week
    return differenceInMilliseconds >= millisecondsInAWeek;
}
