const HDWalletProvider=require("truffle-hdwallet-provider")

const Web3=require('web3')

const {interface,bytecode}=require('./compile');

const provider=new HDWalletProvider("december crush human heavy liquid similar wrestle rhythm volcano wife feed cinnamon",
"https://rinkeby.infura.io/v3/ab29d4184d7849dc89633628395187f7"
)

const web3=new Web3(provider)

const deploy=async()=>{
    try {
        
     const accounts=await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0])

    const result=await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode})
    .send({gas:"1000000",gasPrice:'2000000000',from:accounts[0]})
    console.log(interface)
    console.log("Contract deployed to ",result.options.address);
} catch (error) {
 console.log(error)       
}


}
deploy()

 
