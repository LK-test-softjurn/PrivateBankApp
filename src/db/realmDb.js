// imports external
const Realm = require('realm');

// imports internal
import { CurrencySchema, CurrencySchemaName} from './models/currency';
import { errorLog } from '../common/errorHelper';
import { currencyTable } from '../common/config';
import { SORT_FIELD_TYPE } from '../common/consts';

var base64js = require('base64-js');
// the secreet should be in separet file not stored in repo, but this is not commercial project ;-)
const b64 = 'mxEfOX1HNhh0Yv1AIggk7HcdoNU3hcJBOGMN5TXf6xtSUgAQySAlQuNLXtQNmh27RVmwXbhaFuO8lvg8hsr5GQ==';
const key = base64js.toByteArray(b64);
var realm;// = new Realm({schema: [CurrencySchema], encryptionKey: key}); 

export function storeDataRealmDb(day, month, year, data) {

    try {      
        const date = new Date(`${month}/${day}/${year}`);
        removeDuplicates(date);

        openRealm();
        const maxIndex = data?.length;
        
        for(let i = 0; i < maxIndex; i++) {
            realm.write(() => {  
                let currency = realm.create(CurrencySchemaName, {
                    currency: data[i]?.currency,
                    date: date,
                    day: roughScale(day),
                    month: roughScale(month),
                    year: roughScale(year),
                    saleRateNB: data[i]?.saleRateNB,
                    purchaseRateNB: data[i]?.purchaseRateNB,
                    saleRate: data[i]?.saleRate,
                    purchaseRate: data[i]?.purchaseRate,
                });   
                
            });
        }
        
        return true;

    } catch(err) {
        errorLog('realmDb / storeDataRealmDb', err);
        return false;
    }finally {
        closeRealm();
        return false;
    }
}

export function getCurrenciesAveragesMonthDataRealmDb(month, year) {

    openRealm();
    const currenciesAverages = [];
    const maxIndex = currencyTable.length;
    for(let i = 0; i < maxIndex; i++) {

        const saleRate = realm.objects(CurrencySchemaName).filtered('currency == $0 AND month == $1 AND year == $2', currencyTable[i], month, year).avg('saleRate');
        const purchaseRate = realm.objects(CurrencySchemaName).filtered('currency == $0 AND month == $1 AND year == $2', currencyTable[i], month, year).avg('purchaseRate');

        if(saleRate === undefined || purchaseRate === undefined) {
            return [];
        }

        currenciesAverages.push({currency: currencyTable[i], 
            averagePurchaseRate: roundFloat(purchaseRate),
            averageSaleRate: roundFloat(saleRate), 
        });
    }
    closeRealm();
    return currenciesAverages;
}

export function getCurrencyMonthDataRealmDb(currency, month, year, sortByField, asc) {
    openRealm();

    let sortedRate = [];
    const realData = realm.objects(CurrencySchemaName).filtered('currency == $0 AND month == $1 AND year == $2', currency, month, year);

    if (sortByField === SORT_FIELD_TYPE.DATE) {
        sortedRate = realData.sorted('date', asc);
    } else if (sortByField === SORT_FIELD_TYPE.BUY){
        sortedRate = realData.sorted('purchaseRate', asc);
    } else if (sortByField === SORT_FIELD_TYPE.SELL){
        sortedRate = realData.sorted('saleRate', asc);
    } else {
        sortedRate = realData.sorted('date', asc);
    }

    const data = JSON.parse(JSON.stringify(sortedRate.map(item => {
        return { date: item['date'].toLocaleDateString(), purchaseRate: roundFloat(item['purchaseRate']), saleRate: roundFloat(item['saleRate'])}})));

    closeRealm();
    return data;
}

function roughScale(str) {
    const parsed = parseInt(str, 10);
    if (isNaN(parsed)) { return 0; }
    return parsed;
}

function roundFloat(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100
}

function removeDuplicates (date) { 
    try {
        openRealm();
        realm.beginTransaction();
        const filteredData = realm.objects(CurrencySchemaName).filtered('date == $0', date);
        realm.delete(filteredData);
        realm.commitTransaction();

    } catch (err) {
        errorLog('realmDb / removeDuplicates', err);
    } finally {
        closeRealm();
    }
}

function closeRealm() {
    if (realm !== null && !realm.isClosed) {
        realm.close();
    }
}

function openRealm() {
    realm = new Realm({schema: [CurrencySchema], encryptionKey: key})
}