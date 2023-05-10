# What is this about?

The app fundamentally demonstrates how a decentralized crowdfunding platform can be implemented through a Web3 Tech-Stack. The backend is based on a smart contract, which means that no middleman is needed. While normal crowdfunding platforms charge around 5% commission and an additional 2% is incurred by the payment service providers, with this dApp setup there will only be the gas fees that need to be paid. The well-known crowdfunding -platforms normally do not help when there are scams, so the classic argument ''we want trust through control'' does not count.

In addition, there is the possibility of vetoing the funding as a supporter, whereby a part of the pledged amount can be refunded. Thus, users can limit their damage in case of a scam.

## Prerequisites:

- Install Node.js
- Install Ganache
- Install Truffle
- Install a Web3 Browser or the Web3-Plugin

### Step 1: Ganache Setup

Inside of Ganache you need to create a new Ethereum Workspace.

### Step 2: Web3 Browser Setup

Connect your Web3 Browser to the Ethereum Blockchain that is hosted by your Ganache instance.
After that, you can add the account addresses that are provided by Ganache to your wallet inside the Web3-Browser.

### Step 3: Website Setup

Inside the root directory of this project, enter `npm i`.
After the download is completed, enter `npm start`. Open the link that is provided in the CLI inside your Web3-Browser, you are now on the MileStarter Webpage.

### Step 4: Truffle Setup

Also inside the root directory, enter `truffle compile`. After the compilation, enter `truffle migrate` to migrate the compiled Smart Contract to the Ethereum Blockchain. Inside the CLI you find an entry that says contract address. Copy that address and paste it into the variable contract address inside the App.js file.

### Step 5: Done!

You can now interact with the dApp. Switch to different accounts to test all the functionalities, that are described within the App.
