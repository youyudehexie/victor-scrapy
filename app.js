var Production = require('./models').Production;
var Victor = require('./lib/victor');
var Category = require('./lib/category');
var barSizeFilter = require('./filter').barSizeFilter;
var customPriceFilter = require('./filter').customPriceFilter;
var wearSizeFilter= require('./filter').wearSizeFilter;
var swimPriceFilter = require('./filter').swimPriceFilter;

var victor = new Victor();

var categories = [];
categories.push(new Category({type: 'bras', url: '/sale/bras', sizeFilter: barSizeFilter, priceFilter: customPriceFilter}));
categories.push(new Category({type: 'panties', url: '/sale/sleepwear', sizeFilter: wearSizeFilter, priceFilter: customPriceFilter}));
categories.push(new Category({type: 'beauty', url: '/sale/beauty', sizeFilter: barSizeFilter, priceFilter: customPriceFilter}));
categories.push(new Category({type: 'swim', url: '/sale/swim', sizeFilter: barSizeFilter, priceFilter: swimPriceFilter}));
categories.push(new Category({type: 'vsx-sport', url: '/sale/vsx-sport', sizeFilter: wearSizeFilter, priceFilter: customPriceFilter}));
categories.push(new Category({type: 'shoes', url: '/sale/shoes', sizeFilter: wearSizeFilter, priceFilter: customPriceFilter}));
categories.push(new Category({type: 'pink', url: '/sale/pink', sizeFilter: wearSizeFilter, priceFilter: customPriceFilter}));

victor.all(categories);

