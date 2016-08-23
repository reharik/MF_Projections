/**
 * Created by reharik on 2/20/16.
 */
"use strict";

module.exports = function(eventDispatcher, EventHandlers_array){
    return function(){

        eventDispatcher(EventHandlers_array.map(x=>new x())).startDispatching('event');
    };
};