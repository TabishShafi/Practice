import axios from "axios";
import { useEffect , useState} from "react";
import stringToStream from "string-to-stream";
const { Readable } = require('stream');
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('43fcbf66fab7995d6353', 'bfc0b9b762de9022f9ab4355f29d58f1a714e3f8192267033ac60ecc30443b89');
var myBuffer= new Buffer('./nft.jpg', 'base64');
const readableStreamForFile = Readable.from(myBuffer.toString());
const options = {
  pinataMetadata: {
      name: 'Second Nft'
  }
};

function App() {

  const [nftImageUrl, setNftImageUrl] = useState('');
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');



  const getJson =async ()=>{
   await axios.get('https://gateway.pinata.cloud/ipfs/QmUPCREXt4JWPHU2XTKyfhwSLeg88qNBbRJ1RoJUKTTzwn')
    .then((response) => {
      setNftDescription(response.data.description);
      setNftImageUrl(response.data.image);
      setNftName(response.data.name);
    });
  }
 

  
useEffect(() => { 
  getJson();
  // pinata.testAuthentication().then((result) => {
  //   //handle successful authentication here
  //   console.log(result);
  // }).catch((err) => {
  //   //handle error here
  //   console.log(err);
  // });

  pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    //handle results here
    console.log(result);
  }).catch((err) => {
    //handle error here
    console.log(err);
  });
  
  },[]);

  return (
    <div>
      <h2>App component</h2>
      <h3>{nftName}</h3>
      <h3>{nftDescription}</h3>
      <img style={{width:'200px', height:'200px'}} src={nftImageUrl} alt="Nft Url" />
    </div>
  );
}

export default App;
