class Backup {
    constructor(bucket, s3) {
        this.bucket = bucket; // Bucket files should be stored in
        this.s3 = s3;
    }

    convertToCSV(results) {
        let content = 'Name,Type,TTL,Record\n';
        for (const result of results) {
            for (const record of result.ResourceRecords) {
                content = content + `${result.Name},${result.Type},${result.TTL},${record.Value}\n`
            }
        }
        return content;
    }

    storeJSON(key, content) {
        var params = {
            Body: content,
            ContentType: 'application/json',
            Bucket: this.bucket,
            Key: key
        };

        return this.s3.putObject(params).promise();
    }

    storeCSV(key, content) {
        var params = {
            Body: content,
            ContentType: 'text/csv',
            Bucket: this.bucket,
            Key: key
        };

        return this.s3.putObject(params).promise();
    }
}

module.exports = Backup;