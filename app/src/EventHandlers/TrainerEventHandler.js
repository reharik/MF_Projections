/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(eventhandlerbase, readstorerepository, logger) {
    return class TrainerEventHandler extends eventhandlerbase {
        constructor() {
            super();
            this.handlesEvents = ['trainerHired', 'trainerArchived', 'trainerUnarchived'];
            this.eventHandlerName = 'TrainerEventHandler';
            logger.info('TrainerEventHandler started up');
        };

        async trainerHired(event) {
            var trainer = {
                id: event.id,
                credentials: event.credentials,
                contact: event.contact,
                address: event.address,
                dob: event.dob
            };
            await readstorerepository.save('trainer', trainer)
        };

        async trainerArchived(event) {
            var trainer = await readstorerepository.getById(event.id, 'trainer');
            trainer.archived = true;
            trainer.archivedDate = new Date.now();
            await readstorerepository.save('trainer', trainer, event.id);
        };

        async trainerUnarchived(event) {
            var trainer = await readstorerepository.getById(event.id, 'trainer');
            trainer.archived = false;
            trainer.archivedDate = new Date.now();
            await readstorerepository.save('trainer', trainer, event.id);
        };
    };
};
