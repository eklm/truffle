<img src="http://truffleframework.com/docs/img/logo.png" width="200">

[![npm](https://img.shields.io/npm/v/truffle.svg)]()
[![npm](https://img.shields.io/npm/dm/truffle.svg)]()
[![Join the chat at https://gitter.im/consensys/truffle](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/consensys/truffle?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

-----------------------


Truffle is a development environment, testing framework and asset pipeline for Ethereum, aiming to make life as an Ethereum developer easier. With Truffle, you get:

* Built-in smart contract compilation, linking, deployment and binary management.
* Automated contract testing with Mocha and Chai.
* Configurable build pipeline with support for custom build processes.
* Scriptable deployment & migrations framework.
* Network management for deploying to many public & private networks.
* Interactive console for direct contract communication.
* Instant rebuilding of assets during development.
* External script runner that executes scripts within a Truffle environment.

### Install

```
$ npm install -g truffle
```

### Quick Usage

For a default set of contracts and tests, run the following within an empty project directory:

```
$ truffle init
```

From there, you can run `truffle compile`, `truffle migrate` and `truffle test` to compile your contracts, deploy those contracts to the network, and run their associated unit tests.

Truffle comes bundled with a local development blockchain server that launches automatically when you invoke the commands above. If you're interested in configuring the blockchain server or would like a user-friendly UI for it, check out:

+  [ganache-cli](https://github.com/trufflesuite/ganache-cli): a command-line version of Truffle's blockchain server.
+  [ganache](http://truffleframework.com/ganache/): A GUI for the server that displays your transaction history and chain state.

See [the documentation](http://truffleframework.com/docs/) for more details.

### Documentation

Please see the [Official Truffle Documentation](http://truffleframework.com/docs/) for guides, tips, and examples.

### Contributing

This package is a distribution package of the Truffle command line tool. Please see [truffle-core](https://github.com/trufflesuite/truffle-core) to contribute to the main core code.

### License

MIT
