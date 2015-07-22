/**
 * Created by parallels on 7/16/15.
 */

module.exports = function(gesEventHandlerBase, gesRepository, Trainer, logger) {
    return class LoginTrainerWorkflow extends gesEventHandlerBase {
        constructor() {
            super();
            this.handlesEvents = ['loginTrainer'];
            this.eventHandlerName = 'LoginTrainerWorkflow';
            logger.info('LoginTrainerWorkflow started up');
        }

        loginTrainer(vnt) {
            this.createNotification(vnt);
            var trainer = this.repository.getById(Trainer, vnt.Id);
            trainer.loginTrainer(vnt);
            gesRepository(trainer);
        }
    }
};