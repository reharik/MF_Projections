
module.exports = function(eventDispatcher, EventHandlers_array, eventReceiver){
    return function(){
        var source = eventDispatcher().startDispatching('event');
        EventHandlers_array.map(x => eventReceiver(source, x()));
    };
};