module.exports = function(rsRepository, logger) {
    return function AppointmentEventHandler() {
        logger.info('AppointmentEventHandler started up');

        async function appointmentScheduled(event) {
                        
            var sql = `INSERT INTO "appointment" (
            "id", 
            "date",
            "trainer",
            "document"
            ) VALUES ('
            ${ event.id }',
            ${ event.localDate }',
            ${ event.trainer }',
            '${JSON.stringify(event)}')`;
            return await rsRepository.saveQuery(sql);
        }

        return {
            handlerName: 'AppointmentEventHandler',
            appointmentScheduled
        }
    };
};
