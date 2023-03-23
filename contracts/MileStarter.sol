// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MileStarter {
    struct Campaign {
        address creator;
        uint goal;
        uint pledged;
        uint endAt;
    }

    event Launch(
        address indexed creator,
        uint goal,
        uint32 startAt,
        uint32 endAt
    );

    Campaign public campaign;
    address[2] public earlyBirdBackers;
    address[8] public backers;

    function pledge(uint _id, uint _amount) external {
        require(block.timestamp <= campaign.endAt, "Campaign has ended");
        require(condition);
    }

    function pledgeEarlyBird() public returns (uint) {}

    // Retrieving the backers
    function getBackers() public view returns (address[19] memory) {
        return backers + earlyBirdBackers;
    }
}
