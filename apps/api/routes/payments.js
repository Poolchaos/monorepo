var express = require('express');
var router = express.Router();

var fs = require('fs');
var csv = require('csv-parser');
var moment = require('moment');

var inputFile='mock/mock_data.csv';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let cid = req.query.cid;

  try {
    Promise
      .resolve()
      .then(() => {
        let data = [];

        fs.createReadStream(inputFile)
          .pipe(csv())
          .on('data', (row) => {
            data.push(row);
          })
          .on('end', async () => {
            console.log('CSV file successfully processed');

            const classifiedPayments = classifyPayments(data);
            const sortedData = cid ? 
              await find(classifiedPayments, cid) :
              await sortOldestToLatest(classifiedPayments);
            res.send(sortedData);
          });
      })
    } catch(error) {
      console.log(error);
      res.sendStatus(400);
    }
});

module.exports = router;

function sortOldestToLatest(data) {
  try {
    return data.sort((a, b) => 
      new Date(a.last_payment_date) - new Date(b.last_payment_date));
  } catch(e) {
    console.error('Failed to sort data due to cause', e);
  }
}

function find(data, cid) {
  return data.filter(item => item.client_id === cid);
}

function classifyPayments(data) {

  try {
    data.map((item => {
      let itemDate = moment(item.last_payment_date);
      let diff = JSON.parse(moment().diff(moment(itemDate), 'days'));

      item['days_to_sespension'] = 90 - diff < 0 ? 0 : 90 - diff;
      return item;
    }));

    return data;
  } catch(e) {
    console.error('Failed classify payments due to cause:', e);
    return data;
  }
}
