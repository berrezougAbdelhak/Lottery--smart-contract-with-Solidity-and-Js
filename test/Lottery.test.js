const assert=require("assert")
const ganache=require("ganache-cli")
const Web3=require("web3")

const web3=new Web3(ganache.provider())

const {interface,bytecode}=require("../compile") 

let lottery;
let accounts;

beforeEach(async()=>{
    accounts=await web3.eth.getAccounts();
    lottery=await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode})
    .send({from:accounts[0],gas:"5000000"});
})

describe("Lottery contract",async()=>{

    it("Deploys a contract ",()=>{
        assert.ok(lottery.options.address)
    })

    it("Allows one account to enter ",async()=>{
        await lottery.methods.enter().send({
            from:accounts[0],
            value:web3.utils.toWei("0.2","ether")

        })
        const players=await lottery.methods.getPlayers().call({
            from:accounts[0]
        })

        assert.equal(accounts[0],players[0])
        assert.equal(1,players.length);
    })
    
    it("Allows multiple to enter ",async()=>{
        await lottery.methods.enter().send({
            from:accounts[0],
            value:web3.utils.toWei("0.2","ether")

        })
        

        await lottery.methods.enter().send({
            from:accounts[1],
            value:web3.utils.toWei("0.2","ether")

        })
        await lottery.methods.enter().send({
            from:accounts[2],
            value:web3.utils.toWei("0.2","ether")

        })

        const players=await lottery.methods.getPlayers().call({
            from:accounts[0]
        })

        assert.equal(accounts[0],players[0])
        assert.equal(accounts[1],players[1])
        assert.equal(accounts[2],players[2])
        assert.equal(3,players.length);
    })

    it("Requires a minimum of ether to enter ",async()=>{
        try{
        await lottery.methods.enter().send({
            from:accounts[0],
            value:0
        })
        assert(false)
    }
    catch(err){
        assert(err)
    }

    })

    it("only manager can call pickWinner",async()=>{
        try{
            await lottery.methods.pickWinner().send({
                from:accounts[1]
            })
            
            assert(false)

        }catch(err){
            assert(err)
        }

    })

})