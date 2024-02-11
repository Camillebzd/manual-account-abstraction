// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Account.sol";

// Factory for Smart Contract Account
contract AccountFactory {
    function createAccount(address _owner) external returns(address) {
        Account newAccount = new Account(_owner);
        return address(newAccount);
    }
}