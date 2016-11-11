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
                dob        : event.dob
            };

            return await rsRepository.save('trainer', trainer);
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
            trainerUnarchived
        }
    };
};
