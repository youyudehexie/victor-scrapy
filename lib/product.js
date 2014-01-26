var Victor = require('./victor');
var util = require('util');
var cheerio = require('cheerio');

var Production = require('../models').Production;

var Product = function(options){
    Victor.call(this);
    this.url = options.url;
    this.productId = options.productId;
    this.category = options.category;
    this.catalogueType = options.catalogueType;
    this.__name__ = 'Product'
}

module.exports = Product;

util.inherits(Product, Victor);

Product.prototype.scrapy = function(cb){

    var url = this.host + this.url;
    this.request(url, cb);
}

Product.prototype.analyse = function(body, cb){

    var product = {};
    product.productId = this.productId;
    product.url = this.host + this.url; 
    product.catalogueType = this.catalogueType;
    product.type =  this.category.type;

    var $ = cheerio.load(body);

    try {

        product.title = $('.name h1').text()
        product.brand = $('.brandname').text()
        product.describe = $('.trunc-on')[0].children[0].data
    
    } catch(e){
         
    }

    var picture = {};
    picture.alt = $('#vsImage')[0].attribs.alt;
    picture.src = $('#vsImage')[0].attribs.src;
    picture.pid = picture.src.split('/').splice(-1)[0].split('.')[0] 

    product.picture = picture;

    var colors = [];

    console.log(this.url);


    if($('.swatches .swap')[0]){ 
        var colorsDoms = $('.swatches .swap')[0].children[0].next.children;

        colorsDoms.forEach(function(elem){
            if(elem.children){
                var color = {}
                try{

                    color.name = elem.children[0].children[2].next.children[0].data;
                    color.src = elem.children[0].children[1].attribs.src;
                    color.alt = elem.children[0].children[2].next.attribs['data-alt-image'];
                
                } catch(e){
                    //异常捕捉 
                }

                colors.push(color);
            }
        })
    } else {

        try {

            var color = {}
            var colorDom = $('.color').first().children()[1].children[1].children[3].children[2]
            color.name = colorDom.children[3].children[0].data;
            color.src = colorDom.children[1].attribs.src
            
            colors.push(color);
        
        } catch(err){
            //没有颜色选择 
        }
        
    }

    product.colors = colors;

    var sizes = [];
    var qties = [];

    try {
    
        sizes = this.category.sizeFilter($);
        if(sizes.length === 0){
            sizes =  wearSizeFilter($)
        }
    } catch(err){
        //没有大小选择 
    } 
    

    $('.qty').first().children().children().last().children().slice(1).each(function(i, elem){
        qties.push(elem.children[1].children[1].children[0].data)
    })


    product.sizes = sizes; 
    product.qties = qties; 

    try{ 
        product.price = this.category.priceFilter($)
    } catch(err){
         
    }

    this.product = product;
    cb();
}

Product.prototype.save = function(cb){
    var production = new Production(this.product)
    production.save(function(err){
        cb(err); 
    }); 
}
