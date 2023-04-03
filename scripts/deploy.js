const hre = require("hardhat");

async function getBalances(address){
        const balanceBigInt = await hre.ethers.provider.getBalance(address);
        return hre.ethers.utils.formatEther(balanceBigInt);
    };

async function consoleBalances(addresses){
        let counter = 0;
        for(const address of addresses){
            console.log(`Address ${counter} balance:`, await getBalances(address));
            counter++;
        }
    };

async function consoleMemos(memos){
        for(const memo of memos){
            const timestamp = memo.timestamp;
            const name = memo.name;
            const from = memo.from;
            const message = memo.message;
         console.log(`At ${timestamp},name ${name}, address ${from}, message ${message}`)
        }
    };

 async function main(){
        const[owner,from1,from2,from3] = await hre.ethers.getSigners()
            const chai = await hre.ethers.getContractFactory("chai");
            const contract = await chai.deploy();
        
            await contract.deployed();
            console.log("contract address:",contract.address);
        

        const addresses = [owner.address, from1.address, from2.address, from3.address];
        console.log("Before Buying Chai");
        await consoleBalances(addresses)

        const amount = {value: hre.ethers.utils.parseEther("1")};
        await contract.connect(from1).buyChai("from1","Very nice chai", amount);
        await contract.connect(from2).buyChai("from2","Very nice course", amount);
        await contract.connect(from3).buyChai("from3","Very nice information", amount);

        console.log("After Buying Chai");
        await consoleBalances(addresses);

        const memos = await contract.getMemos();
        consoleMemos(memos);
    }


 main()
    .then(() => process.exit(0))
    .catch((error) =>{
        console.error(error);
        process.exit(1);
    });
