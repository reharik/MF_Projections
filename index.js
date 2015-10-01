/**
 * Created by rharik on 10/1/15.
 */
var extend = require('extend');
var config = require('config');

module.exports = function(_options) {
    var options = {};
    extend(options, config.get('configs') || {}, _options || {});
    var container = require('./registry')(options);

    var dispatcher = container.getInstanceOf('eventdispatcher');
    var instantiatedDispatcher = dispatcher(options.eventdispatcher);
    var handlers = container.getArrayOfGroup('EventHandlers');
    instantiatedDispatcher.startDispatching(handlers)
};

