var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;
mongoose.connect('mongodb://localhost/victor');



/**
 * Load component
 *
 * @param  {Object} product    (optional) name of the component
 *  - {String} title
 *  - {String} describe
 *  - {Int} productId
 *  - {String} catelogue
 *  - {Array} product img
 *  - {Array} color 
 *     - {String} url
 *     - {String}: name
 *  - {Array} sizes
 *  - {Array} qty
 *  - {Array} price 
 *      - {Object}
 */

exports.Production = mongoose.model('Production', {
    title: String,
    type: String,
    describe: String,
    productId: String,
    catelogue: String,
    url: String,
    brand: String,
    picture: {
        alt: String,
        src: String,
        pid: String 
    },
    price: String,
    colors: [{
        src: String,
        alt: String,
        name: String
    }],
    sizes: [String],
    qties: [String]
})
