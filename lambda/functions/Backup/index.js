"use strict";

const AWS = require('aws-sdk');
const Backup = require('../../services/backup');

AWS.config.update({
    region: 'us-east-1'
});

const route53 = new AWS.Route53();
const s3 = new AWS.S3();

const backup = new Backup(process.env.BUCKET, s3);

exports.runSchedule = async function (event, context, callback) {
    const res = await route53.listHostedZones().promise();

    const date = new Date();
    const dateString = date.toISOString().split('T')[0];

    for (const zone of res.HostedZones) {
        let recordSet = await route53.listResourceRecordSets({
            HostedZoneId: zone.Id
        }).promise();

        // Getting CSV version
        let csv = backup.convertToCSV(recordSet.ResourceRecordSets);
        let domain = zone.Name.substring(0, zone.Name.length - 1);

        // Domain + Date
        let title = `${domain}-${dateString}`;

        // Storing in domain.com/domain.com-ISODATE.json
        let jsonKey = `${domain}/${title + '.json'}`;
        let csvKey = `${domain}/${title + '.csv'}`;

        // Backup
        console.log(`Backing up ${domain}`)
        await backup.storeJSON(jsonKey, JSON.stringify(recordSet.ResourceRecordSets));
        await backup.storeCSV(csvKey, csv);
    }
}