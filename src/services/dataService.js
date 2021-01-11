// imports external

// imports internal
import { getCurencyDataByMonthApiService } from '../services/apiService';
import { currencyTable } from '../common/config';

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export async function getCurenciesAveragesByMonthDataService(value) {

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

    if(dates.length > 0) {
        await getCurencyDataByMonthApiService(dates);
    } else {
        return []
    }

    return [{currency: 'USD', saleRateNBAverage: 28.4028000, purchaseRateNBAverage: 27.4028000},
    {currency: 'EUR', saleRateNBAverage: 34.8460000, purchaseRateNBAverage: 27.4028000},
    {currency: 'PLZ', saleRateNBAverage: 34.8460000, purchaseRateNBAverage: 27.4028000}]
}


export async function getCurencyDataByMonthDataService(params) {
    
    // params = {month: 'sth', currency: 'sth'}
    // check Realm

    // if no data fetch and store to the db

    // if fetch finished get data from realm

    const dates = ['10.10.2020', '11.10.2020', '12.10.2020', '13.10.2020', '14.10.2020', '15.10.2020'];

    await getCurencyDataByMonthApiService(dates);


    return [{date: '10.11.2020', saleRateNB: 28.4028000, purchaseRateNB: 27.4028000},
    {date: '11.11.2020', saleRateNB: 29.4028000, purchaseRateNB: 26.4028000},
    {date: '12.11.2020', saleRateNB: 24.4028000, purchaseRateNB: 23.4028000}]
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
