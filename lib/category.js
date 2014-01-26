var _ = require('underscore');
var Victor = require('./victor');
var Product = require('./product');
var cheerio = require('cheerio');

var qs = require('querystring');
var path = require('path');
var util = require('util');


var Category = function(options){
    Victor.call(this);
    this.url = options.url;
    this.type = options.type;
    this.nextUrls = [];
    this.__name__ = 'Category'
    this.sizeFilter = options.sizeFilter;
    this.priceFilter = options.priceFilter;
}

module.exports = Category;
util.inherits(Category, Victor);


Category.prototype.scrapy = function(cb){
    var url = this.host + this.url;
    this.request(url, cb);
}


Category.prototype.analyse = function(body, cb){
    var $ = cheerio.load(body);
    var urls = []
    $('.ssf3').each(function(i, elem){
        urls.push(elem.attribs.href);
    })

    this.nextUrls = _.uniq(urls)
    cb(null);
}


Category.prototype.next = function(cb){
    var products = [];
    
    var self = this;

    this.nextUrls.forEach(function(url){

        var vals = _.values(qs.parse(url)); 
        products.push(new Product({
            url: url,
            productId: vals[0],
            catalogueType: vals[1],
            category: self 
        }));
    
    })

    this.all(products);
    cb();
}

