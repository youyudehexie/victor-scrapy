var util = require('util');
var event = require('events').EventEmitter;
var async = require('async');
var cheerio = require('cheerio');
var qs = require('querystring');
var path = require('path');
var request = require('request');

var Victor = function(){
    event.call(this);
    this.host = 'http://www.victoriassecret.com/'
    this.db = {};
    this.categories = [];
    this.__name__ = 'Victor';
}

module.exports = Victor

util.inherits(Victor, event);

Victor.prototype.addCategory = function(category){
    this.categories.push(category);
}

Victor.prototype.request = function(url, cb){

    var option = {
        url: url,
        method: 'GET',
        headers: {
            'User-Agent':'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:26.0) Gecko/20100101 Firefox/26.0'
        }
    }

    request(option, cb);
}


Victor.prototype.scrapy = function(cb){
    cb();
    return;
}

Victor.prototype.analyse = function(cb){
    cb(null);
    return;
}


Victor.prototype.filter = function(cb){
    cb(null);
    return;
}

Victor.prototype.save = function(cb){
    cb(null);
    return;
}


Victor.prototype.next = function(cb){
    cb();
    return;
}


Victor.prototype.all = function(categories){
    categories.forEach(function(category){
        async.waterfall([
            function(cb){ 
                console.log(category.__name__ + ' scrapy');
                category.scrapy(cb); 
            },
            function(request,body,cb){
                console.log(category.__name__ + ' analyse');
                category.analyse(body, cb); 
            },
            function(cb){ 
                console.log(category.__name__ + ' filter');
                category.filter(cb); 
            },
            function(cb){ 
                console.log(category.__name__ + ' save');
                category.save(cb); 
            },
            function(cb){
                console.log(category.__name__ + ' next');
                category.next(cb); 
            }
        ],function(err){
            if(err){
                console.log(err) 
            }
        })
    });
}
