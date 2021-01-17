"use strict";

// data class for storing date information
export default class Date
{
    year;
    month;
    monthName;
    day;
    dayName;
    dayNumber;

    constructor(year, month, monthName, day, dayName, dayNumber) {
        this.year = year;
        this.month = month;
        this.monthName = monthName;
        this.day = day;
        this.dayName = dayName;
        this.dayNumber = dayNumber;
    }
}