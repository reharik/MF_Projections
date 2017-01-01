/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(rsRepository, logger) {
    return function TrainerEventHandler() {
        logger.info('TrainerEventHandler started up');

        async function trainerHired(event) {
            var trainer = {
                id         : event.id,
                contact    : event.contact,
                dob        : event.dob,
                color        : event.color
            };

            return await rsRepository.save('trainer', trainer);
        }

        async function trainerContactUpdated(event) {
            var trainer          = await rsRepository.getById(event.id, 'trainer');
            trainer.contact.email = event.contact.email;
            trainer.contact.secondaryPhone = event.contact.secondaryPhone;
            trainer.contact.mobilePhone = event.contact.mobilePhone;
            return await rsRepository.save('trainer', trainer, event.id);
        }

        async function trainerAddressUpdated(event) {
            var trainer          = await rsRepository.getById(event.id, 'trainer');
            trainer.contact.address = event.address;
            return await rsRepository.save('trainer', trainer, event.id);
        }

        async function trainerInfoUpdated(event) {
            var trainer          = await rsRepository.getById(event.id, 'trainer');
            trainer.contact.firstName     = event.firstName;
            trainer.contact.lastName     = event.lastName;
            trainer.dob     = event.dob;
            trainer.color     = event.color;
            return await rsRepository.save('trainer', trainer, event.id);
        }

        async function trainerArchived(event) {
            var trainer          = await rsRepository.getById(event.id, 'trainer');
            trainer.archived     = true;
            trainer.archivedDate = new Date.now();
            return await rsRepository.save('trainer', trainer, event.id);
        }

        async function trainerUnarchived(event) {
            var trainer          = await rsRepository.getById(event.id, 'trainer');
            trainer.archived     = false;
            trainer.archivedDate = new Date.now();
            return await rsRepository.save('trainer', trainer, event.id);
        }
        
        return {
            handlerName: 'TrainerEventHandler',
            trainerHired,
            trainerArchived,
            trainerUnarchived,
            trainerContactUpdated,
            trainerAddressUpdated,
            trainerInfoUpdated
        }
    };
};
