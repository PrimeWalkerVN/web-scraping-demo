const Crawler = require('crawler');
const crawlerInstance = new Crawler({
    maxConnections: 10,
    rateLimit: 200,
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            const statsTable = 
            $('.table.table-bordered.table-hover.downloads > tbody > tr');
            statsTable.each(function() {
                let title = $(this).find('td').text();
                console.log(title);
            });
        }
        done();
    }
});

// crawlerInstance.queue([{
//     uri: 'http://www.facebook.com',

//     callback: (error, res, done) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log(res.body);
//         }
//         done();
//     }
// }]);

crawlerInstance.queue('https://www.iban.com/exchange-rates');

