/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(eventhandlerbase, readstorerepository, logger,co) {
    return class TrainerLoggedInEventHandler extends eventhandlerbase {
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
            yield readstorerepository.save('trainerLoggedIn', trainerLoggedIn);
            return 'success';
        }
    };
};