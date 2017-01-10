module.exports = function(rsRepository, logger) {
    return function AppointmentEventHandler() {
        logger.info('AppointmentEventHandler started up');

        async function appointmentScheduled(event) {
            var appointment = {...event};

            return await rsRepository.save('appointment', appointment);
        }

        return {
            handlerName: 'AppointmentEventHandler',
            appointmentScheduled
        }
    };
};
