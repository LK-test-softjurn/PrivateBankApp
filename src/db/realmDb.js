// imports external
const Realm = require('realm');

// imports internal
import { CurrencySchema, CurrencySchemaName} from './models/currency';
import { errorLog } from '../common/errorHelper';
import { currencyTable } from '../common/config';

var base64js = require('base64-js');
// the secreet should be in separet file not stored in repo, but this is not commercial project ;-)
const b64 = 'mxEfOX1HNhh0Yv1AIggk7HcdoNU3hcJBOGMN5TXf6xtSUgAQySAlQuNLXtQNmh27RVmwXbhaFuO8lvg8hsr5GQ==';
const key = base64js.toByteArray(b64);
var realm = new Realm({schema: [CurrencySchema], encryptionKey: key}); 

export async function storeDataRealmDb(day, month, year, data) {

    try {
        const maxIndex = data?.length;
        for(let i = 0; i < maxIndex; i++) {
            realm.write(() => {
                let currency = realm.create(CurrencySchemaName, {
                    currency: data[i]?.currency,
                    date: new Date(`${month}/${day}/${year}`),
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
    }
}

export async function getCurrencyMonthDataRealmDb(month, year) {
 
    currenciesSverages = [];
    const maxIndex = currencyTable.length;
    for(let i = 0; i < maxIndex; i++) {

        const saleRate = realm.objects(CurrencySchemaName).filtered('currency == $0 AND month == $1 AND year == $2', currencyTable[i], month, year).avg('saleRate');
        const purchaseRate = realm.objects(CurrencySchemaName).filtered('currency == $0 AND month == $1 AND year == $2', currencyTable[i], month, year).avg('purchaseRate');

        if(saleRate === undefined || purchaseRate === undefined) {
            return [];
        }

        currenciesSverages.push({currency: currencyTable[i], 
            averageSaleRate: roundAverages(saleRate), 
            averagePurchaseRate: roundAverages(purchaseRate)
        });
    }

    return currenciesSverages;
}

export async function getCurrenciesAveragesMonthDataRealmDb(currencies, month) {
    // TODO
}

function roughScale(str) {
    const parsed = parseInt(str, 10);
    if (isNaN(parsed)) { return 0; }
    return parsed;
}

function roundAverages(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100
}