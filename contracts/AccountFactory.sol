// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Account.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

// Factory for Smart Contract Account
contract AccountFactory {
    function createAccount(address _owner) external returns(address) {
        bytes32 salt = bytes32(uint256(uint160(_owner)));
        bytes memory bytecode = abi.encodePacked(type(Account).creationCode, abi.encode(_owner));

        address addr = Create2.computeAddress(salt, keccak256(bytecode));

        if (addr.code.length > 0) {
            return addr;
        }
        return Create2.deploy(0, salt, bytecode);
    }
}