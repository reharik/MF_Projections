/**
 * Created by reharik on 2/20/16.
 */
"use strict";

module.exports = function(eventdispatcher, EventHandlers_array){
    return function(){

        eventdispatcher(EventHandlers_array.map(x=>new x())).startDispatching('event');
    };
};