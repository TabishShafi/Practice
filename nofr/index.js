const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const pinataSDK = require('@pinata/sdk');

const app = express();
const pinata = pinataSDK('43fcbf66fab7995d6353', 'bfc0b9b762de9022f9ab4355f29d58f1a714e3f8192267033ac60ecc30443b89');
//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;


app.post('/post', async (req, res)=> {

  const body = {
    data: req.body.data,
    amount: req.body.amount,
    address: req.body.address,
    account: req.body.account
  };

  const options = {
    pinataMetadata: {
        name: "Data_File"
    },
    pinataOptions: {
        cidVersion: 0
    }
  };

 await  pinata.pinJSONToIPFS(body, options).then((result) => {
    //handle results here
    console.log(result);
  }).catch((err) => {
    //handle error here
    console.log(err);
  });
  res.json({success: true});

  


});
app.listen(PORT, console.log(`Server started on port ${PORT}`));