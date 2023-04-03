import {useState,useEffect} from 'react';
import abi from "./contract/chai.json"
import{ethers} from 'ethers';
import Buy from './components/Buy';
import Memos from './components/Memos';


function App() {
  const [state, setState]= useState({
    provider:null,
    signer:null,
    contract:null
  });
  const [account,setAccount] = useState("None")
  useEffect(()=>{
    const connectWallet = async()=>{
      const contractAddress = "0x24c5a42BF6e9967163bFb2BCcC21f9cD25889A25";
      const contractABI = abi.abi;
      try{
        const{ethereum} = window;

        if(ethereum){
          const account = await ethereum.request({method:"eth_requestAccounts",});

          window.ethereum.on("chainChanged",()=>{
            window.location.reload();
          })

          window.ethereum.on("accountChanged",()=>{
            window.location.reload();
          })

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress,contractABI,signer);
          setAccount(account)
          setState({provider,signer,contract});
        }
        else{
          alert("Please install metamask")
        }
       
      }
      catch(error){
        console.log(error)
      }
    };
    connectWallet();
  },[])

  // console.log(state)
  return (
    <div className="App">
      <p>Connected Account -{account}</p>
      <Buy state={state}/>
      <Memos state={state}/>
    </div>
  );
}

export default App;

