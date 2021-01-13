// imports external

// imports internal
import { getCurencyDataByMonthApiService } from '../services/apiService';
import { monthDays } from '../common/consts';
import { getCurrencyMonthDataDbService, 
    getCurrenciesAveragesMonthDataDbService } from '../services/dbService';

// import { removeDuplicates } from '../db/realmDb';

export async function getCurenciesAveragesByMonthDataService(value) {

    const averages = getCurrenciesAveragesMonthDataDbService(value.month + 1, value.year);

    if(averages?.length > 0) {
        return averages;
    }

    return [];
}


export async function getCurencyDataByMonthDataService(params) {
    const currencyData = getCurrencyMonthDataDbService(params.currency, params.month + 1, params.year, params.sortByField, params.asc);

    if(currencyData?.length > 0) {
        return currencyData;
    }

    return [];
}


export function getDataFromApi(value) {

    const daysOfMonth = getMonthDays(value.month, value.year);
    
    const currentDate = Date.now();
    const currentYear = new Date(currentDate).getFullYear();
    const currentMonth = new Date(currentDate).getMonth();
    const currentDayOfTheMonth = new Date(currentDate).getDate();

    let maxDay = daysOfMonth;
    if(currentYear === value.year && currentMonth === value.month) {
        if(daysOfMonth > currentDayOfTheMonth) {
            maxDay = currentDayOfTheMonth;
        }
    }

    const month = formatLeadingZero(value.month + 1);
    const dates=[];
    for(let i = 0; i < maxDay; i++) {
        const day = formatLeadingZero(i + 1);
        dates.push(`${day}.${month}.${value.year}`)
    }

    return dates;
}

function isYearLap(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0) ? true : false;
}

function getMonthDays(month, year) {
    if(month === 1) {  
        if(isYearLap(year) === true) {
            return 29;
        } else {
            return 28;
        }
    } else {
        return monthDays[month];
    }
}

function formatLeadingZero(val) {
    return val < 10 ? `0${val}` : `${val}`;  
}
