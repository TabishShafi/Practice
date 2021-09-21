const express = require('express')
var cors = require('cors')

// const pinataSDK = require('@pinata/sdk');
// const fs = require('fs');
// const pinata = pinataSDK('43fcbf66fab7995d6353', 'bfc0b9b762de9022f9ab4355f29d58f1a714e3f8192267033ac60ecc30443b89');
const app = express()
app.use(cors())
const PORT = process.env.PORT || 8080;
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);
  
// const readableStreamForFile = fs.createReadStream('./nft.jpg');

// const options = {
//     pinataMetadata: {
//         name: 'nft_image2',
//         keyvalues: {
//             customKey: 'value-2'
//         }
//     },
//     pinataOptions: {
//         cidVersion: 0
//     }
// };

// app.get('/', (req, res) => {
  
//     // pinata.testAuthentication().then((result) => {
//     //     //handle successful authentication here
//     //     console.log(result);
//     // }).catch((err) => {
//     //     //handle error here
//     //     console.log(err);
//     // });
  
//     // pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
//     //     //handle results here
//     //     console.log(result.IpfsHash);
//     //     const body = {
//     //         "description": "Description of your NFT", 
//     //         "image": `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`, 
//     //         "name": "NFT"
//     //       };

//     //       const options = {
//     //         pinataMetadata: {
//     //             name: 'nft Json',
//     //             keyvalues: {
//     //                 customKey: 'customValue'
//     //             }
//     //         },
//     //         pinataOptions: {
//     //             cidVersion: 0
//     //         }
//     //         };

//     //         pinata.pinJSONToIPFS(body, options).then((result) => {
//     //             //handle results here
//     //             console.log(result);
//     //         }).catch((err) => {
//     //             //handle error here
//     //             console.log(err);
//     //         });

//     // }).catch((err) => {
//     //     //handle error here
//     //     console.log(err);
//     // });
//   res.send('Hello World!')

  
// })


app.post("/post", (req, res) => {
   console.log("done")
    res.redirect("/");
  });

app.listen(PORT, console.log(`Server started on port ${PORT}`));