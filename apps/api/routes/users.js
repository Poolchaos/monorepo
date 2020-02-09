var express = require('express');
var router = express.Router();

var fs = require('fs');
var csv = require('csv-parser');

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
            res.send(data);
          });
      })
    } catch(error) {
      console.log(error);
      res.sendStatus(400);
    }
});

module.exports = router;
