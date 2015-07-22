/**
 * Created by parallels on 7/16/15.
 */
module.exports = function(gesEventHandlerBase, readModelRepository, logger) {
    return class TrainerEventHandler extends gesEventHandlerBase {
        constructor() {
            super();
            this.handlesEvents = ['trainerHired', 'trainerArchived', 'trainerUnarchived'];
            this.eventHandlerName = 'TrainerEventHandler';
            logger.info('TrainerEventHandler started up');
        };

        async trainerHired(event) {
            var trainer = {
                id: event.id,
                userName: event.userName,
                contact: event.contact,
                address: event.address,
                dob: event.dob
            };
            await readModelRepository.save('trainer', trainer)
        };

        async trainerArchived(event) {
            var trainer = await readModelRepository.getById(event.id, 'trainer');
            trainer.archived = true;
            trainer.archivedDate = new Date.now();
            await readModelRepository.save('trainer', trainer, event.id);
        };

        async trainerUnarchived(event) {
            var trainer = await readModelRepository.getById(event.id, 'trainer');
            trainer.archived = false;
            trainer.archivedDate = new Date.now();
            await readModelRepository.save('trainer', trainer, event.id);
        };
    };
};
