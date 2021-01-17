"use strict";

import UserInterface from './UserInterface.js';
import Date from './Date.js';

export default class Calendar
{
    calendarContainer;
    ui;
    startCalendarFrom = 1900;
    endCalendarAt = 2300;
    dateTable = [];
    dayNames = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
    monthNames = [
        'januari', 
        'februari', 
        'maart', 
        'april', 
        'mei', 
        'juni', 
        'juli', 
        'augustus', 
        'september', 
        'oktober', 
        'november'
    ];

    constructor(container) {
        this.calendarContainer = container;
        this.createDateTable();
        this.createCalendar();
        this.ui = new UserInterface(this);
    }

    /**
     * Creates an array of Date objects
     */
    createDateTable() {
        let dayNumber = 0;
        // years
        for (let y = this.startCalendarFrom; y < this.endCalendarAt; y++) {
            // months
            for (let m = 1; m <= 11; m++) {
                // days
                const evenOrOdd = m % 2 ? 0 : 1;
                for (let d = 1; d <= (31 + evenOrOdd); d++) {
                    const mn = this.monthNames[(m - 1) % 11];
                    const dn = this.dayNames[dayNumber % 7];
                    const date = new Date(y, m, mn, d, dn, dayNumber);
                    this.dateTable.push(date);
                    dayNumber++;
                }
            }
        }
        console.log(this.dateTable);
    }

    /**
     * Get the index of a particular date in the dateTable
     * 
     * @param {number} day 
     * @param {number} month 
     * @param {number} year 
     * @return {number} dayNumber
     */
    getDayNumber(day, month, year) {
        let dayNumber = 0;
        // years
        for (let y = this.startCalendarFrom; y <= year; y++) {
            // months
            for (let m = 1; m <= 11; m++) {
                // days
                const evenOrOdd = m % 2 ? 0 : 1;
                for (let d = 1; d <= (31 + evenOrOdd); d++) {
                    if (d == day && m == month && y == year) {
                        return dayNumber;
                    }
                    dayNumber++;
                }
            }
        }
    }

    /**
     * Draw the calendar HTML
     */
    createCalendar() {
        const calendarElement = document.createElement('div');
        calendarElement.setAttribute('id', 'calendar');
        calendarElement.innerHTML += `<h1 class="site-title"><span>Kalender</span></h1>
        <section id="topbar" class="calendar-section topbar">
            <div class="date-select subsection">
                <h2 class="date-heading">Ingangsdatum</h2>
                <span class="date">
                    <input type="number" min="1" max="32" step="1" value="23" name="day" class="day"> –
                    <input type="number" min="1" max="11" step="1" value="2" name="day" class="month"> –
                    <input type="number" min="1" max="2200" step="1" value="2021" name="day" class="year">
                </span>
            </div>
            <div class="toggle-contents-button subsection">
                <span class="material-icons icon">date_range</span>
            </div>
        </section>
        <section id="contents" class="calendar-section contents collapsed">
            <div class="date-select subsection">
                <h3 class="date-heading">Ingangsdatum</h3>
                <div class="date-selectors">
                    <span class="month date">
                        <button class="previous">◄</button>
                        <span class="text">februari</span>
                        <button class="next">►</button>
                    </span>
                    <span class="year date">
                        <button class="previous">◄</button>
                        <span class="text">2021</span>
                        <button class="next">►</button>
                    </span>
                </div>
            </div>
            <table class="date-table subsection">
                <thead>
                    <tr>
                        <th>Zo</th>
                        <th>Ma</th>
                        <th>Di</th>
                        <th>Wo</th>
                        <th>Do</th>
                        <th>Vr</th>
                        <th>Za</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </section>`;
        this.calendarContainer.appendChild(calendarElement);
        const day = document.querySelector('.topbar .date .day');
        const month = document.querySelector('.topbar .date .month');
        const year = document.querySelector('.topbar .date .year');
        setTimeout(() => {
            this.updateCalendar(day.value, month.value, year.value);
        }, 100);
    }

    /**
     * Update the calendar contents
     * 
     * @param {number} day 
     * @param {number} month 
     * @param {number} year 
     */
    updateCalendar(day, month, year) {
        // elements
        const monthElement = document.querySelector('.contents .date-selectors .month .text');
        const yearElement = document.querySelector('.contents .date-selectors .year .text');
        const lastRow = document.querySelector('.date-table tbody tr:last-of-type');
        const cells = document.querySelectorAll('.date-table td');
        // dates
        let dayNumber = this.getDayNumber(day, month, year);
        let selectedDate = this.dateTable[dayNumber];
        // get offset from 1st of the month
        let offsetFirstDay = () => {
            let offset = 0;
            while(this.dateTable[dayNumber + offset].day > 1) {
                offset--;
            }
            return offset;
        }
        // get offset from first sunday
        let offsetWeekdays = () => {
            let offset = 0;
            while(this.dateTable[dayNumber + offsetFirstDay() + offset].dayName != 'zo') {
                offset--;
            }
            return offset;
        }
        // hide last row if not needed
        if (offsetWeekdays() >= -3) {
            lastRow.classList.add('hidden');
        } else {
            lastRow.classList.remove('hidden');
        }
        // update month and year
        monthElement.innerText = selectedDate.monthName;
        yearElement.innerText = selectedDate.year;
        // update table
        let counter = 0;
        cells.forEach(cell => {
            let currentDate = this.dateTable[dayNumber + offsetFirstDay() + offsetWeekdays() + counter];
            cell.innerText = currentDate.day;
            if (currentDate.month != selectedDate.month) {
                cell.classList.add('other-month');
            } else {
                cell.classList.remove('other-month');
            }
            if (currentDate.month == selectedDate.month && currentDate.day == selectedDate.day) {
                cell.classList.add('selected-date');
            } else {
                cell.classList.remove('selected-date');
            }
            counter++;
        });
    }
}