/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(eventhandlerbase, readstorerepository, logger) {
    return class UserEventHandler extends eventhandlerbase {
        constructor() {
            super();
            this.handlesEvents = ['trainerHired', 'trainerArchived', 'trainerUnarchived'];
            this.handlerName   = 'UserEventHandler';
            logger.info('UserEventHandler started up');
        }

        *trainerHired(event) {
            var user = {
                id      : event.id,
                userName: event.credentials.userName,
                password: event.credentials.password,
                active  : true
            };

            yield readstorerepository.save('user', user);
        }

        *trainerArchived(event) {
            var user    = yield readstorerepository.getById(event.id, 'user');
            user.active = false;
            yield readstorerepository.save('user', user, event.id);
        }

        *trainerUnarchived(event) {
            var user    = yield readstorerepository.getById(event.id, 'user');
            user.active = true;
            yield readstorerepository.save('user', user, event.id);
        }
    };
};
