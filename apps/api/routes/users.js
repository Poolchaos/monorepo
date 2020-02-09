var express = require('express');
var router = express.Router();

var fs = require('fs');
var csv = require('csv-parser');
var moment = require('moment');

var inputFile='mock/mock_data.csv';

/* GET users listing. */
router.get('/', async function(req, res, next) {
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
          .on('end', () => {
            console.log('CSV file successfully processed');

            const classifiedPayments = classifyPayments(data);
            const sortedData = sortOldestToLatest(classifiedPayments);
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

function classifyPayments(data) {

  try {
    data.map((item => {
      let itemDate = moment(item.last_payment_date);
      let diff = moment().diff(moment(itemDate), 'days');

      item['days_passed'] = diff;
      return item;
    }));

    return data;
  } catch(e) {
    console.error('Failed classify payments due to cause:', e);
    return data;
  }
}
