module.exports = function(rsRepository, logger) {
    return function AppointmentEventHandler() {
        logger.info('AppointmentEventHandler started up');

        async function appointmentScheduled(event) {
            logger.info('handling appointmentScheduled event');

            var sql = `INSERT INTO "appointment" (
            "id", 
            "date",
            "trainer",
            "document"
            ) VALUES (
            '${ event.id }',
            '${ event.entityName }',
            '${ event.trainer }',
            '${JSON.stringify(event)}')`;
            return await rsRepository.saveQuery(sql);
        }

        async function appointmentCanceled(event) {
            logger.info('handling appointmentCanceled event');

            var sql = `DELETE FROM "appointment" where "id" = '${event.id}'`;
            return await rsRepository.saveQuery(sql);
        }

        async function appointmentMovedFromDifferentDay(event) {
            logger.info('handling appointmentMovedFromDifferentDay event');
            return appointmentUpdated(event);
        }

        async function appointmentTypeChanged(event) {
            logger.info('handling appointmentTypeChanged event');
            return appointmentUpdated(event);
        }

        async function notesForAppointmentUpdated(event) {
            logger.info('handling notesForAppointmentUpdated event');
            return appointmentUpdated(event);
        }

        async function trainerChangedForAppointment(event) {
            logger.info('handling trainerChangedForAppointment event');
            return appointmentUpdated(event);
        }

        async function clientsChangedForAppointment(event) {
            logger.info('handling clientsChangedForAppointment event');
            return appointmentUpdated(event);
        }

        async function timeChangedForAppointment(event) {
            logger.info('handling timeChangedForAppointment event');
            return appointmentUpdated(event);
        }

        async function appointmentUpdated(event) {
            var sql = `update "appointment" set
            "date" = '${event.entityName}',
            "trainer" = '${event.trainer }',
            "document" = '${JSON.stringify(event)}'
            where "id" = '${event.id}'`;
            return await rsRepository.saveQuery(sql);
        }

        return {
            handlerName: 'AppointmentEventHandler',
            appointmentScheduled,
            timeChangedForAppointment,
            clientsChangedForAppointment,
            trainerChangedForAppointment,
            appointmentTypeChanged,
            appointmentMovedFromDifferentDay,
            appointmentCanceled,
            notesForAppointmentUpdated
        }
    };
};
