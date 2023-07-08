const hre = require("hardhat");

async function main(){
    const Assessment = await hre.ethers.getContractFactory("BankApp");
    const assessment = await Assessment.deploy();
    await assessment.deployed();

    console.log('A contract deployed to ' + assessment.address );
}
main().catch((error) => { 
    console.error(error);
    process.exitCode=1;
});