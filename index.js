/**
 * Created by rharik on 10/1/15.
 */
var extend = require('extend');
var config = require('config');

module.exports = function(_options) {
    var options = {
        //dagon:{
        //    application:'projections'
        //}
    };
    extend(options, config.get('configs') || {}, _options || {});
    var container = require('./registry')(options);

    var dispatcher = container.getInstanceOf('eventdispatcher');
    var handlers = container.getArrayOfGroup('EventHandlers');
    dispatcher.startDispatching(handlers);
    return container;
};

