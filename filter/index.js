exports.barSizeFilter = function($){
    var sizes = []
    $('.size').find('.scroll').first().children().children().slice(1).each(function(i, elem){
        sizes.push(elem.children[1].children[1].children[0].data)
    })
    return sizes;
}



exports.customPriceFilter = function($){ 
    if(!$('.price').first().children().children()[0].prev){ 
        var price = $('.price').first().children().children()[0].children[0].data; 
    } else { 
        var price = $('.price').first().children().children()[0].prev.data + $('.price').first().children().children()[0].children[0].data
    }
    return price;
}


exports.wearSizeFilter = function($){
    var sizes = [];
    $('.size').first().children().last().children().children().splice(1).forEach(function(elem){
        sizes.push(elem.children[1].children[1].children[0].data) 
    })
    return sizes;

}

exports.swimPriceFilter = function($){
    var price = $('.price').first().children().children()[0].children[0].data; 
    return price;
}

