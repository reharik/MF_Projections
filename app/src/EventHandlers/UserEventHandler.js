/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(eventHandler, rsRepository, logger) {
    return class UserEventHandler extends eventHandler {
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

            return yield rsRepository.save('user', user);
        }

        *trainerArchived(event) {
            var user    = yield rsRepository.getById(event.id, 'user');
            user.active = false;
            return yield rsRepository.save('user', user, event.id);
        }

        *trainerUnarchived(event) {
            var user    = yield rsRepository.getById(event.id, 'user');
            user.active = true;
            return yield rsRepository.save('user', user, event.id);
        }
    };
};
