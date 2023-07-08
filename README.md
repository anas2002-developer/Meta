# MoneyVerse

MoneyVerse is a decentralized banking application that empowers your financial journey. It allows you to create an account, check account status, deposit and withdraw money, calculate loan payments, and convert currency. The application is built on the Ethereum blockchain and requires a connected Ethereum wallet (such as MetaMask) to interact with the blockchain.

## Features

- Create Account: Click on the "Create Account" button to create a new bank account.
- Check Account Status: Click on the "Account Status?" button to check if your account exists.
- Deposit Money: Enter the amount you want to deposit and click the "Deposit" button.
- Withdraw Money: Enter the amount you want to withdraw and click the "Withdraw" button.
- Loan Calculator: Enter the loan amount, duration in years, and interest percentage to calculate the monthly payment.
- Currency Converter: Enter the amount in Rupees to convert it to Dollars.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`

## Usage

1. Start the application: `npm start`
2. Connect your Ethereum wallet (such as MetaMask).
3. Click on the different buttons to perform the desired actions.

## Configuration

1. Deploy the Simple Token contract and copy the deployed contract address.
2. Replace the `contractAddress` variable in the `BankApp.js` file with the deployed contract address.
3. Update the ABI in the `simple_token_abi.json` file with the correct ABI of your deployed contract.

## Built With

- React: A JavaScript library for building user interfaces.
- ethers.js: A library for interacting with Ethereum.
- Web3.js: A library for connecting to the Ethereum blockchain.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or enhancements you'd like to make.

## License

This project is licensed under the [MIT License](LICENSE).
