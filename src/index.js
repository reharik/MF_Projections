/**
 * Created by parallels on 7/21/15.
 */

module.exports = function(gesDispatcher, eventHandlers){
    return function(){
        var dispatcher =  new gesDispatcher({
            targetTypeName:'eventTypeName',
            handlers:eventHandlers.map(x=>new x())
        });

        dispatcher.startDispatching();
    }
};