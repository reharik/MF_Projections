module.exports = function(rsRepository, logger) {
    return function AppointmentEventHandler() {
        logger.info('AppointmentEventHandler started up');

        async function appointmentScheduled(event) {

            var sql = `INSERT INTO "appointment" (
            "id", 
            "date",
            "trainer",
            "document"
            ) VALUES (
            '${ event.id }',
            '${ event.localDate }',
            '${ event.trainer }',
            '${JSON.stringify(event)}')`;
            return await rsRepository.saveQuery(sql);
        }

        async function appointmentCanceled(event) {

            var sql = `DELETE FROM "appointment" (
            "id", 
            "date",
            "trainer",
            "document"
            ) VALUES (
            '${ event.id }',
            '${ event.localDate }',
            '${ event.trainer }',
            '${JSON.stringify(event)}')`;
            return await rsRepository.saveQuery(sql);
        }

        async function appointmentMovedFromDifferentDay(event) {
            return appointmentUpdated(event);
        }

        async function appointmentTypeChanged(event) {
            return appointmentUpdated(event);
        }

        async function clientsChangedForAppointment(event) {
            return appointmentUpdated(event);
        }

        async function timeChangedForAppointment(event) {
            return appointmentUpdated(event);
        }

        async function appointmentUpdated(event) {

            var sql = `update "appointment" (
            "id", 
            "date",
            "trainer",
            "document"
            ) VALUES (
            '${ event.id }',
            '${ event.localDate }',
            '${ event.trainer }',
            '${JSON.stringify(event)}')`;
            return await rsRepository.saveQuery(sql);
        }

        return {
            handlerName: 'AppointmentEventHandler',
            appointmentScheduled
        }
    };
};
