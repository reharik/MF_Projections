module.exports = function(rsRepository, moment, logger) {
    return function SessionsPurchasedEventHandler() {
        logger.info('SessionsPurchasedEventHandler started up');

        async function sessionsPurchased(event) {
          logger.info('handling sessionsPurchased event');
          var sql = `INSERT INTO "session_purchases" (
            "id", 
            "client",
            "document"
            ) VALUES (
            '${ event.id }',
            '${ event.clientId }',
            '${ event.sessionType }',
            '${JSON.stringify(event)}')`;
          return await rsRepository.saveQuery(sql);
        }

        return {
            handlerName: 'SessionsPurchasedEventHandler',
            sessionsPurchased
        }
    };
};
