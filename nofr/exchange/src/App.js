import React,{Component} from "react";
import Web3 from "web3";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const dexAddress = "0xC504F970f0e5A546Ec71ffe0cFe2d6B7C4c28D5d";
const myTokenAddress= "0x814d0b56bDe9a86407E90F0B46a7A8cC0cB0f533";
const exchangeAddress= "0xFF72d11180977dF00Bd96c38EFE3B31182e22207";



const dexABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Bought",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "buy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const myTokenABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const exchangeABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Info",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_data",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "shareInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const dexContract = new web3.eth.Contract(dexABI, dexAddress);
const myTokenContract = new web3.eth.Contract(myTokenABI, myTokenAddress);
const exchangeContract = new web3.eth.Contract(exchangeABI, exchangeAddress);



class App extends Component {

  state = {balance: 0, account: '', amount: 0, data: '', address: '', recivedData: ''}

  componentDidMount()
  {
    this.loadWeb3();
  }

  loadWeb3 = async () => {
    Web3.givenProvider.enable();
  }
  getCurrentAccount = async () =>
  {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
  }
  fetchBalance =async()=> {

    const account = await this.getCurrentAccount();

    this.setState({account: account});

    var balance = await myTokenContract.methods.balanceOf(account).call({from: account});

    this.setState({balance:balance})
  }


  buyToken =async(event) =>{

    event.preventDefault();

    const account = await this.getCurrentAccount();

    await dexContract.methods.buy(Number(this.state.amount)).send({from: account});
    
    await this.fetchBalance();
  }

  shareInfo=async(event)=>{
    event.preventDefault();



    const account = await this.getCurrentAccount();

    
    this.setState({account: account});

    // await myTokenContract.methods.approve(exchangeAddress, this.state.amount).send({from: account});

    // await exchangeContract.methods.shareInfo(this.state.data,this.state.address, this.state.amount).send({from:account});

    // await this.fetchBalance();
	const { data, amount, address } = this.state;
	const Data = {
		data,
		amount,
		address,
		account
	}

	await axios.post("http://localhost:8080/post",Data).then((response)=> {
		console.log(response.data.success);
	  }).catch(err => {
        console.error(err);
	});
    
  }

  checkInfo=async(event)=>{
    event.preventDefault();

    const account = await this.getCurrentAccount();

    
    this.setState({account: account});

    const data = await exchangeContract.methods.getData(this.state.address).call({from: account});
    
    this.setState({recivedData: data})
    await this.fetchBalance();
    
  }




render(){

  return (
    <div className='container'>
          <div className="card" style={{width: '50rem'}}>
            <div className="card-body">
              <h5 className="card-title">Exchange Info</h5>

                  <p>{this.state.balance}</p>
                  <button className="btn btn-info" onClick={this.fetchBalance}>
                     Get Your Balance
                  </button>
                
                  <form onSubmit={this.buyToken}>
                    <input className="form-control form-control-sm" type='number' placeholder='Enter amount' 
                      onChange={(event)=>this.setState({amount: event.target.value})} />
                    <button className="btn btn-info" type='submit'>Buy Token</button>
                  </form>

                  <form onSubmit={this.shareInfo}>
                    <input className="form-control form-control-sm" type='text' placeholder="Input Your String Data" 
                     onChange={(event)=>this.setState({data:event.target.value})}/>
                    <input className="form-control form-control-sm" type='number' placeholder='Enter amount in My Token'
                      onChange={(event)=>this.setState({amount: event.target.value})}/>
                    <input className="form-control form-control-sm" type='text' placeholder='Enter Reciever Address'
                      onChange={(event)=>this.setState({address: event.target.value})}/>
                    <button className="btn btn-info" type='submit'>
                      Share Info
                    </button>
                  </form>


                  <form onSubmit={this.checkInfo}>
                    <p>{this.state.recivedData}</p>
                    <input className="form-control form-control-sm" type='text' placeholder='Enter Address to check against'
                      onChange={(event)=>this.setState({address: event.target.value})}/>
                      <button className="btn btn-info" type='submit'>
                        Check Info
                      </button>
                  </form>
            </div>
          </div>
		  
    </div>
  ) 

  }
}

export default App;