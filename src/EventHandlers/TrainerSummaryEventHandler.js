/**
 * Created by parallels on 7/16/15.
 */

module.exports = function(gesEventHandlerBase, readModelRepository, logger) {
    return class TrainerSummaryEventHandler extends gesEventHandlerBase {
        constructor() {
            super();
            this.handlesEvents = ['trainerHired', 'trainerArchived', 'trainerUnarchived'];
            this.eventHandlerName = 'TrainerSummaryEventHandler';
            logger.info('TrainerSummaryEventHandler started up');
        };

        async trainerHired(event) {
            var trainer = {
                id: event.id,
                firstName: event.firstName,
                lastName: event.lastName,
                emailAddress: event.emailAddress,
                phoneMobile: event.phoneMobile
            };
            await readModelRepository.save('trainerSummary', trainer)
        };

        async trainerArchived(event) {
            var trainer = await readModelRepository.getById(event.id, 'trainerSummary');
            trainer.archived = true;
            trainer.archivedDate = new Date.now();
            await readModelRepository.save('trainerSummary', trainer, event.id);
        };

        async trainerUnarchived(event) {
            var trainer = await readModelRepository.getById(event.id, 'trainerSummary');
            trainer.archived = false;
            trainer.archivedDate = new Date.now();
            await readModelRepository.save('trainerSummary', trainer, event.id);
        };
    };
};
