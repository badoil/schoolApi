module.exports = {
    database: {
        host: 'database-1.czirhn72iubo.ap-northeast-2.rds.amazonaws.com',
        user: "admin",
        password: "admin12345",
        database: "innodb",
        port: "3306",
        connectionLimit: "10",
        timezone: "utc",
        debug: ['ComQueryPacket', 'RowDataPacket']
    },
    aws: {
      accessKeyId: 'AKIAR4KJFQNZPCDDTE7H',
      secretAccessKey: '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',
      s3: {
        host: 'https://s3-ap-northeast-2.amazonaws.com',
        bucket: 'studentapi',
        frontPath: 'https://s3.ap-northeast-2.amazonaws.com/studentapi',
        originUserImage: 'original',
        thumbnailUserImage: 'thumbnails'
      }
    }
}
// weekend
//dbinstance : nodeDBInstance2
//user : admin
//pwd : admin1234
