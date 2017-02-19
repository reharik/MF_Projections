/**
 * Created by parallels on 7/16/15.
 */
"use strict";

module.exports = function(rsRepository, logger) {
    return function ClientEventHandler() {
        logger.info('ClientEventHandler started up');

        async function clientAdded(event) {
            var client = {
                id         : event.id,
                source      : event.source,
                sourceNotes : event.sourceNotes,
                startDate   : event.startDate,
                birthate   : event.birthDate,
                contact    : event.contact
            };

            return await rsRepository.save('client', client);
        }

        async function clientContactUpdated(event) {
            var client          = await rsRepository.getById(event.id, 'client');
            client.contact.email = event.contact.email;
            client.contact.secondaryPhone = event.contact.secondaryPhone;
            client.contact.mobilePhone = event.contact.mobilePhone;
            return await rsRepository.save('client', client, event.id);
        }

        async function clientAddressUpdated(event) {
            var client          = await rsRepository.getById(event.id, 'client');
            client.contact.address = event.address;
            return await rsRepository.save('client', client, event.id);
        }

        async function clientInfoUpdated(event) {
            var client          = await rsRepository.getById(event.id, 'client');
            client.contact.firstName     = event.firstName;
            client.contact.lastName     = event.lastName;
            client.birthDate     = event.birthDate;
            return await rsRepository.save('client', client, event.id);
        }

        async function clientSourceUpdated(event) {
            var client = await rsRepository.getById(event.id, 'client');
            client.source = event.source;
            client.sourceNotes = event.sourceNotes;
            client.startDate = event.startDate;
            return await rsRepository.save('client', client, event.id);
        }

        async function clientArchived(event) {
            var client          = await rsRepository.getById(event.id, 'client');
            client.archived     = true;
            client.archivedDate = new Date.now();
            var sql = `UPDATE "client" SET "archived" = 'true', document = '${JSON.stringify(client)}' where id = '${event.id}'`;
            return await rsRepository.saveQuery(sql);
        }

        async function clientUnArchived(event) {
            var client          = await rsRepository.getById(event.id, 'client');
            client.archived     = false;
            client.archivedDate = new Date.now();
            var sql = `UPDATE "client" SET "archived" = 'false', document = '${JSON.stringify(client)}' where id = '${event.id}'`;
            return await rsRepository.saveQuery(sql);
        }

        return {
            handlerName: 'ClientEventHandler',
            clientAdded,
            clientArchived,
            clientUnArchived,
            clientContactUpdated,
            clientAddressUpdated,
            clientInfoUpdated,
            clientSourceUpdated
        }
    };
};
