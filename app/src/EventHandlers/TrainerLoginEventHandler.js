/**
 * Created by parallels on 7/16/15.
 */
module.exports = function(eventhandlerbase, readstorerepository, logger) {
    return class TrainerLoggedInEventHandler extends eventhandlerbase {
        constructor() {
            super();
            this.handlesEvents = ['trainerLoggedIn'];
            this.eventHandlerName = 'TrainerLoggedInEventHandler';
            logger.info('TrainerLoggedInEventHandler started up');
        }

        async trainerLoggedIn(event) {
            var trainerLoggedIn = {
                userName: event.userName,
                id: event.id,
                token: event.token,
                date: event.date
            };
            await readstorerepository.save('trainerLoggedIn', trainerLoggedIn);
        }
    };
};