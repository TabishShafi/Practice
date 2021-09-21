import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name,setName]=useState('Tabish');
  const [password,setPassword]=useState('Tabish');
  const postData=()=>{

    const url = 'http://localhost:8080/post';

        const user = {

            username: name, 
            password: password
        }

        axios.post(url,'fdshfkdsj').then((res) => {

            console.log("sent");

        }).catch((e) => {

            //handle your errors
        });
  }
  return (
    <div>
      <button onClick={postData}>Click me</button>
    </div>
  );
}

export default App;
