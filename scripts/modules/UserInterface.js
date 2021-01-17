"use strict";

// this class handles the GUI interactions
export default class UserInterface
{
    callbackTarget;

    constructor(callbackTarget) {
        this.callbackTarget = callbackTarget;
        this.setEventListeners();
    }

    /**
     * Set the event listeners used in the GUI
     */
    setEventListeners() {
        // interactable elements
        const contents = document.querySelector('#contents');
        const toggleContentsButton = document.querySelector('.toggle-contents-button');
        const startDateDay = document.querySelector('.topbar .date-select .day');
        const startDateMonth = document.querySelector('.topbar .date-select .month');
        const startDateYear = document.querySelector('.topbar .date-select .year');
        const monthPrev = document.querySelector('.contents .date-select .month .previous');
        const monthNext = document.querySelector('.contents .date-select .month .next');
        const yearPrev = document.querySelector('.contents .date-select .year .previous');
        const yearNext = document.querySelector('.contents .date-select .year .next');
        const cells = document.querySelectorAll('.date-table td');
        // listeners
        document.addEventListener('keyup', () => {
            this.validateStartDate();
        });
        toggleContentsButton.addEventListener('click', () => {
            contents.classList.toggle('collapsed');
        });
        startDateDay.addEventListener('change', () => {
            this.validateStartDate(startDateDay.value, startDateMonth.value, startDateYear.value);
        });
        startDateMonth.addEventListener('change', () => {
            this.validateStartDate(startDateDay.value, startDateMonth.value, startDateYear.value);
        });
        startDateYear.addEventListener('change', () => {
            this.validateStartDate(startDateDay.value, startDateMonth.value, startDateYear.value);
        });
        monthPrev.addEventListener('click', () => {
            this.changeMonth(-1);
        });
        monthNext.addEventListener('click', () => {
            this.changeMonth(1);
        });
        yearPrev.addEventListener('click', () => {
            this.changeYear(-1);
        });
        yearNext.addEventListener('click', () => {
            this.changeYear(1);
        });
        cells.forEach(cell => {
            cell.addEventListener('click', (event) => {
                let element = event.target;
                if (element.classList.contains('other-month')) {
                    if (parseInt(element.innerText) > 16) {
                        // previous month
                        if (startDateMonth.value == 1) {
                            startDateMonth.value = 11;
                        } else {
                            startDateMonth.value--;
                        }
                    } else {
                        // next month
                        if (startDateMonth.value == 11) {
                            startDateMonth.value = 1;
                        } else {
                            startDateMonth.value++;
                        }
                    }
                }
                startDateDay.value = parseInt(element.innerText);
                this.validateStartDate(startDateDay.value, startDateMonth.value, startDateYear.value);
            });
        });
    }

    /**
     * Change the month
     * @param {number} direction -1 for previous, 1 for next
     */
    changeMonth(direction) {
        const month = document.querySelector('.contents .date-select .month .text');
        const startDateDay = document.querySelector('.topbar .date-select .day');
        const startDateMonth = document.querySelector('.topbar .date-select .month');
        const startDateYear = document.querySelector('.topbar .date-select .year');
        let index = this.callbackTarget.monthNames.indexOf(month.innerText);
        if (index == 0 && direction == -1) {
            month.innerText = this.callbackTarget.monthNames[10];
            startDateMonth.value = 11;
            this.changeYear(-1);
        }
        else if (index == 10 && direction == 1)  {
            month.innerText = this.callbackTarget.monthNames[0];
            startDateMonth.value = 1;
            this.changeYear(1);
        }
        else {
            month.innerText = this.callbackTarget.monthNames[index + direction];
            startDateMonth.value = parseInt(startDateMonth.value) + direction;
            this.validateStartDate(startDateDay.value, startDateMonth.value, startDateYear.value);
        }
    }

    changeYear(direction) {
        const startDateDay = document.querySelector('.topbar .date-select .day');
        const startDateMonth = document.querySelector('.topbar .date-select .month');
        const startDateYear = document.querySelector('.topbar .date-select .year');
        const year = document.querySelector('.contents .date-select .year .text');
        startDateYear.value = parseInt(startDateYear.value) + direction;
        year.innerText = parseInt(year.innerText) + direction;
        this.validateStartDate(startDateDay.value, startDateMonth.value, startDateYear.value);
    }

    validateStartDate(day, month, year) {
        if (
            day != NaN && 
            day != undefined && 
            day <= 32 &&
            month != NaN && 
            month != undefined && 
            month <= 11 &&
            year != NaN && 
            year != undefined
        ) {
            // console.log(this.callbackTarget.getDayNumber(day, month, year));
            this.callbackTarget.updateCalendar(day, month, year);
        }
    }
}