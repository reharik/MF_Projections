/**
 * Created by rharik on 10/1/15.
 */

require('must');
var config = require('config');
var extend = require('extend');
var fs = require('fs');

describe('appendToStreamPromiseTester', function() {
    var handlers;
    var eventdispatcher;
    var options = {
        //dagon:{
        //    logger: {
        //        moduleName: 'EventHandlerBase'
        //        }
        //}
    };
    var container;


    before(function(){
        extend(options, config.get('configs') || {});
        container = require('../../registry')(options);
        handlers = container.getArrayOfGroup('EventHandlers');
        eventdispatcher = container.getInstanceOf('eventdispatcher');

        });

        context('append to stream', ()=> {
            it('should resolve with success', async ()=> {
                var result = await eventdispatcher.startDispatching(handlers);
            })
        });
    });

