/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(eventHandler, rsRepository, logger) {
    return class TrainerLoggedInEventHandler extends eventHandler {
        constructor() {
            super();
            this.handlesEvents = ['trainerLoggedIn'];
            this.handlerName = 'TrainerLoggedInEventHandler';
            logger.info('TrainerLoggedInEventHandler started up');
        }

        *trainerLoggedIn(event) {
            var trainerLoggedIn = {
                userName: event.userName,
                id      : event.id,
                token   : event.token,
                date    : event.date
            };
            return yield rsRepository.save('trainerLoggedIn', trainerLoggedIn);
        }
    };
};