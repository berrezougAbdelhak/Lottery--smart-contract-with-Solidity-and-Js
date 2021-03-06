pragma solidity ^0.4.17;

contract Lottery {

    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager=msg.sender;
    }

    function enter() public  payable   {
        players.push(msg.sender);
    }

    function random() public view restricted returns(uint) {
       
       return uint(keccak256(block.difficulty,now,players));
    
    }
    function pickWinner() public restricted{
        
        uint index=random() % players.length;
        players[index].transfer(this.balance);
        players=new address[](0);
    }

    modifier restricted() {
        require(msg.sender==manager);
        _;
    }
    function getPlayers() public view restricted returns (address []) {
         return players ;
         
    }
} 