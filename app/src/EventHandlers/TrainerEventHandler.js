/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(eventHandler, rsRepository, logger) {
    return class TrainerEventHandler extends eventHandler {
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

            return yield rsRepository.save('trainer', trainer);
        }

        *trainerArchived(event) {
            var trainer          = yield rsRepository.getById(event.id, 'trainer');
            trainer.archived     = true;
            trainer.archivedDate = new Date.now();
            return yield rsRepository.save('trainer', trainer, event.id);
        }

        *trainerUnarchived(event) {
            var trainer          = yield rsRepository.getById(event.id, 'trainer');
            trainer.archived     = false;
            trainer.archivedDate = new Date.now();
            return yield rsRepository.save('trainer', trainer, event.id);
        }
    };
};
