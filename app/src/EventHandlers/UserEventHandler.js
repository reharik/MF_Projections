/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(rsRepository, logger) {
    return function UserEventHandler() {
        logger.info('UserEventHandler started up');

        async function trainerHired(event) {
            var user = {
                id      : event.id,
                userName: event.contact.email,
                password: event.credentials.password,
                role    : event.credentials.role,
                active  : true
            };

            return await rsRepository.save('user', user);
        }

        async function trainerArchived(event) {
            var user    = await rsRepository.getById(event.id, 'user');
            user.active = false;
            return await rsRepository.save('user', user, event.id);
        }

        async function trainerUnarchived(event) {
            var user    = await rsRepository.getById(event.id, 'user');
            user.active = true;
            return await rsRepository.save('user', user, event.id);
        }

        async function trainerContactUpdated(event) {
            var user    = await rsRepository.getById(event.id, 'user');
            user.userName = event.contact.email;
            return await rsRepository.save('user', user, event.id);
        }

        async function trainerPasswordUpdated(event) {
            var user    = await rsRepository.getById(event.id, 'user');
            user.password = event.credentials.password;
            return await rsRepository.save('user', user, event.id);
        }

        return {
            handlerName: 'UserEventHandler',
            trainerHired,
            trainerArchived,
            trainerUnarchived,
            trainerContactUpdated,
            trainerPasswordUpdated
        }
    };
};
