import { React, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from './Bank.module.css';
import simple_token_abi from './Contracts/bank_app_abi.json';
import Interactions from './Interactions';

const BankApp = () => {
  // deploy simple token contract and paste deployed contract address here. This value is local ganache chain
  let contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const [transferHash, setTransferHash] = useState(null);
  const [checkAcc, setCheckAcc] = useState('false');
  const [accStatus, setAccStatus] = useState('');
  const [accbalance, setAccBalance] = useState('');

  const [loanAmount, setLoanAmount] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [interestPercentage, setInterestPercentage] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');

  const [rupeesAmount, setRupeesAmount] = useState('');
  const [dollarAmount, setDollarAmount] = useState('');

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner);
    setContract(tempContract);
  };

  const createAccount = async () => {
    let txt = await contract.createAcc();
    console.log(txt);
    setAccStatus('Your Account is created');
  };

  const checkAccountExists = async () => {
    let txt = await contract.accountExists();
    if (txt == true) {
      setCheckAcc('true');
    }
  };

  const AccountBalance = async () => {
    let txt = await contract.accountBalance();
    let balanceNumber = txt.toNumber();
    console.log(balanceNumber);
    setAccBalance('' + balanceNumber);
  };

  const DepositBalance = async (e) => {
    e.preventDefault();
    let depositAmount = e.target.depositAmount.value;
    let txt = await contract.deposit({
      value: depositAmount,
    });
  };

  const WithdrawBalance = async (e) => {
    e.preventDefault();
    let withdrawAmount = e.target.withdrawAmount.value;
    let txt = await contract.withdraw(withdrawAmount);
    console.log(txt);
  };

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount);
    const interestRate = parseFloat(interestPercentage) / 100;
    const duration = parseFloat(loanDuration);

    const monthlyInterestRate = interestRate / 12;
    const numPayments = duration * 12;

    const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numPayments) - 1;

    const monthlyPayment = (principal * (numerator / denominator)).toFixed(2);
    setMonthlyPayment(monthlyPayment);
  };

  const convertToDollar = () => {
    const rupees = parseFloat(rupeesAmount);
    const dollar = rupees / 75; // Assuming 1 dollar is equal to 75 rupees
    setDollarAmount(dollar.toFixed(2));
  };

  return (
    <div>
      <h2>Bank Dapp- Create Account, Check Account, Check Balance, Deposit, and Loan Calculator</h2>
      <button className={styles.button6} onClick={connectWalletHandler}>
        {connButtonText}
      </button>

      <div className={styles.walletCard}>
        <div>
          <h3>Address: {defaultAccount}</h3>
        </div>

        <div>
          <button onClick={AccountBalance}>Account Balance</button>{' '}
          <h3>Balance in the Bank: {accbalance} </h3>
        </div>

        {errorMessage}
      </div>
      <div className={styles.interactionsCard}>
        <div>
          <h4>Click here to Create your account. Make sure you are connected to Wallet</h4>
          <button onClick={createAccount}>Create Account</button>
          <h4>Click here to check if your account Exists or not</h4>
          <button onClick={checkAccountExists}>Check Account Exists</button>
          <h4>Your Account Status</h4> <h5> {checkAcc}</h5>
        </div>
        <form onSubmit={DepositBalance}>
          <h3> Deposit Money </h3>
          <p> Deposit Amount </p>
          <input type="number" id="depositAmount" min="0" step="1" />
          <button type="submit" className={styles.button6}>
            Deposit
          </button>
        </form>
        <form onSubmit={WithdrawBalance}>
          <h3> Withdraw Money </h3>
          <p>Withdraw Amount </p>
          <input type="number" id="withdrawAmount" min="0" step="1" />
          <button type="submit" className={styles.button6}>
            Withdraw
          </button>
        </form>
        <div>
          <h3>Loan Calculator</h3>
          <form>
            <p>Loan Amount</p>
            <input type="number" id="loanAmount" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
            <p>Duration (in years)</p>
            <input
              type="number"
              id="loanDuration"
              value={loanDuration}
              onChange={(e) => setLoanDuration(e.target.value)}
            />
            <p>Interest Percentage</p>
            <input
              type="number"
              id="interestPercentage"
              value={interestPercentage}
              onChange={(e) => setInterestPercentage(e.target.value)}
            />
            <button type="button" onClick={calculateMonthlyPayment} className={styles.button6}>
              Calculate
            </button>
          </form>
          <div>
            {monthlyPayment && <h4>Monthly Payment: {monthlyPayment}</h4>}
          </div>
        </div>
        <div>
          <h3>Convert Rupees to Dollar</h3>
          <form>
            <p>Rupees Amount</p>
            <input type="number" id="rupeesAmount" value={rupeesAmount} onChange={(e) => setRupeesAmount(e.target.value)} />
            <button type="button" onClick={convertToDollar} className={styles.button6}>
              Convert
            </button>
          </form>
          <div>
            {dollarAmount && <h4>Dollar Amount: {dollarAmount}</h4>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankApp;
