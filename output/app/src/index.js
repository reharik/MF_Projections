/**
 * Created by parallels on 7/21/15.
 */

module.exports = function(gesDispatcher, eventHandlers, logger){
    return function(){
        logger.debug('dispatcher waiting for connection');
        setTimeout(function(){
            logger.debug('instantiating dispatcher');
            var dispatcher =  new gesDispatcher({
                handlers:eventHandlers.map(x=>new x())
            });

            dispatcher.startDispatching();
        },3000);
    }
};