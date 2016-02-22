/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(eventhandlerbase, readstorerepository, logger) {
    return class TrainerEventHandler extends eventhandlerbase {
        constructor() {
            super();
            this.handlesEvents = ['trainerHired', 'trainerArchived', 'trainerUnarchived'];
            this.handlerName   = 'TrainerEventHandler';
            logger.info('TrainerEventHandler started up');
        }

        *trainerHired(event) {
            var trainer = {
                id         : event.id,
                contact    : event.contact,
                address    : event.address,
                dob        : event.dob
            };

            yield readstorerepository.save('trainer', trainer);
        }

        *trainerArchived(event) {
            var trainer          = yield readstorerepository.getById(event.id, 'trainer');
            trainer.archived     = true;
            trainer.archivedDate = new Date.now();
            yield readstorerepository.save('trainer', trainer, event.id);
        }

        *trainerUnarchived(event) {
            var trainer          = yield readstorerepository.getById(event.id, 'trainer');
            trainer.archived     = false;
            trainer.archivedDate = new Date.now();
            yield readstorerepository.save('trainer', trainer, event.id);
        }
    };
};
