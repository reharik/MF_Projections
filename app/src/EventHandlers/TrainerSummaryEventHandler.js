/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(rsRepository, logger) {
    return function TrainerSummaryEventHandler() {
        logger.info('TrainerSummaryEventHandler started up');

        async function trainerHired(event) {
            var trainer = {
                id          : event.id,
                firstName   : event.contact.firstName,
                lastName    : event.contact.lastName,
                emailAddress: event.contact.emailAddress,
                phoneMobile : event.contact.phoneMobile
            };
            return await rsRepository.save('trainerSummary', trainer);
        }

        async function trainerArchived(event) {
            var trainer          = await rsRepository.getById(event.id, 'trainerSummary');
            trainer.archived     = true;
            trainer.archivedDate = new Date.now();
            return await rsRepository.save('trainerSummary', trainer, event.id);
        }

        async function trainerUnarchived(event) {
            var trainer          = await rsRepository.getById(event.id, 'trainerSummary');
            trainer.archived     = false;
            trainer.archivedDate = new Date.now();
            return await rsRepository.save('trainerSummary', trainer, event.id);
        }
        
        return {
            handlerName: 'TrainerSummaryEventHandler',
            trainerHired,
            trainerArchived,
            trainerUnarchived
        }
    };
};
