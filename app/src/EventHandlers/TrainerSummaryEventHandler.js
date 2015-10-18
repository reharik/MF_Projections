/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(eventhandlerbase, readstorerepository, logger) {
    return class TrainerSummaryEventHandler extends eventhandlerbase {
        constructor() {
            super();
            this.handlesEvents = ['trainerHired', 'trainerArchived', 'trainerUnarchived'];
            this.eventHandlerName = 'TrainerSummaryEventHandler';
            logger.info('TrainerSummaryEventHandler started up');
        };

        async trainerHired(event) {
            var trainer = {
                id: event.id,
                firstName: event.contact.firstName,
                lastName: event.contact.lastName,
                emailAddress: event.contact.emailAddress,
                phoneMobile: event.contact.phoneMobile
            };
            await readstorerepository.save('trainerSummary', trainer)
        };

        async trainerArchived(event) {
            var trainer = await readstorerepository.getById(event.id, 'trainerSummary');
            trainer.archived = true;
            trainer.archivedDate = new Date.now();
            await readstorerepository.save('trainerSummary', trainer, event.id);
        };

        async trainerUnarchived(event) {
            var trainer = await readstorerepository.getById(event.id, 'trainerSummary');
            trainer.archived = false;
            trainer.archivedDate = new Date.now();
            await readstorerepository.save('trainerSummary', trainer, event.id);
        };
    };
};
