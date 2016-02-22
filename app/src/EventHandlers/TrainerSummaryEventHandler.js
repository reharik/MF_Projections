/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(eventhandlerbase, readstorerepository, logger, co) {
    return class TrainerSummaryEventHandler extends eventhandlerbase {
        constructor() {
            super();
            this.handlesEvents = ['trainerHired', 'trainerArchived', 'trainerUnarchived'];
            this.handlesEvents = [];
            this.handlerName   = 'TrainerSummaryEventHandler';
            logger.info('TrainerSummaryEventHandler started up');
        }

        *trainerHired(event) {
            var trainer = {
                id          : event.id,
                firstName   : event.contact.firstName,
                lastName    : event.contact.lastName,
                emailAddress: event.contact.emailAddress,
                phoneMobile : event.contact.phoneMobile
            };
            yield readstorerepository.save('trainerSummary', trainer);
            return 'success';
        }

        *trainerArchived(event) {
            var trainer          = yield readstorerepository.getById(event.id, 'trainerSummary');
            trainer.archived     = true;
            trainer.archivedDate = new Date.now();
            yield readstorerepository.save('trainerSummary', trainer, event.id);
            return 'success';
        }

        *trainerUnarchived(event) {
            var trainer          = yield readstorerepository.getById(event.id, 'trainerSummary');
            trainer.archived     = false;
            trainer.archivedDate = new Date.now();
            yield readstorerepository.save('trainerSummary', trainer, event.id);
            return 'success';
        }
    };
};
