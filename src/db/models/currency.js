// imports external
const Realm = require('realm');

// imports internal

export const CurrencySchemaName = 'Currency';

export const CurrencySchema = {
    name: CurrencySchemaName,
    properties: {
      currency: 'string',
      date: 'date', // faster sorting with separate fields for day/month/year
      day: {type: 'int', default: 0},
      month: {type: 'int', default: 0},
      year: {type: 'int', default: 0},
      saleRateNB: {type: 'float', default: 0},
      purchaseRateNB: {type: 'float', default: 0},
      saleRate: {type: 'float', default: 0},
      purchaseRate: {type: 'float', default: 0},
    }
  };