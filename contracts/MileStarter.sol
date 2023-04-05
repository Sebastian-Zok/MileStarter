// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.20;

contract MileStarter {
    event Launch(address creator, uint256 goal, uint256 startAt, uint256 endAt);
    event Pledge(address backer, uint256 amount, uint256 time);

    struct Campaign {
        address payable creator;
        uint256 goal;
        uint256 endAt;
    }

    Campaign public campaign;

    mapping(address => bool) backers;
    address payable[] backersIndex;
    address payable[] earlyBirdBackersIndex;
    uint public earlyBirdBackersCount;

    mapping(address => bool) vetoBackers;
    address payable[] vetoBackersIndex;
    bool public isVeto;

    function launchCampaign(uint256 _goal) external {
        require(
            campaign.creator ==
                address(0x0000000000000000000000000000000000000000),
            "Already created"
        );

        campaign = Campaign({
            creator: payable(msg.sender),
            goal: _goal,
            endAt: block.timestamp + 2419200
        });

        emit Launch(msg.sender, _goal, block.timestamp, campaign.endAt);
    }

    function pledge() external payable {
        require(block.timestamp <= campaign.endAt, "Campaign has ended");
        require(msg.value >= 1500000000000000000, "Insufficent ether");
        require(!backers[msg.sender], "Already pledged");

        backers[msg.sender] = true;
        backersIndex.push(payable(msg.sender));

        emit Pledge(msg.sender, msg.value, block.timestamp);
    }

    function pledgeEarlyBird() external payable {
        require(earlyBirdBackersCount < 2, "Early bird discount unavailable");
        require(block.timestamp <= campaign.endAt, "Campaign has ended");
        require(msg.value >= 1000000000000000000, "Insufficent ether");
        require(!backers[msg.sender], "Already pledged");

        backers[msg.sender] = true;
        earlyBirdBackersIndex.push(payable(msg.sender));
        earlyBirdBackersCount++;

        emit Pledge(msg.sender, msg.value, block.timestamp);

        checkIfFundingDone();
    }

    function veto() external payable {
        require(
            block.timestamp <= campaign.endAt + 2419200,
            "Veto time is over"
        );
        require(isVeto, "Veto is over");
        require(!vetoBackers[msg.sender], "Already voted for veto");

        vetoBackers[msg.sender] = true;
        vetoBackersIndex.push(payable(msg.sender));

        checkIfVetoIsOver();
    }

    function getBackers() public view returns (address payable[] memory) {
        return backersIndex;
    }

    function getEarlyBirdBackers()
        public
        view
        returns (address payable[] memory)
    {
        return earlyBirdBackersIndex;
    }

    function getVetoBackers() public view returns (address payable[] memory) {
        return vetoBackersIndex;
    }

    function getCampaign()
        public
        view
        returns (address payable, uint256, uint256)
    {
        return (campaign.creator, campaign.goal, campaign.endAt);
    }

    function getIsVeto() public view returns (bool) {
        return isVeto;
    }

    function getPledged() public view returns (uint256) {
        return address(this).balance;
    }

    function cancelCampaign() public {
        require(
            campaign.creator == msg.sender,
            "Not Authorized to cancel campaign"
        );
        for (uint i = 0; i < earlyBirdBackersIndex.length; i++) {
            earlyBirdBackersIndex[i].transfer(1000000000000000000);
        }
        for (uint i = 0; i < backersIndex.length; i++) {
            backersIndex[i].transfer(1500000000000000000);
        }

        delete backersIndex;
        delete earlyBirdBackersIndex;
        earlyBirdBackersCount = 0;

        campaign.creator = payable(
            address(0x0000000000000000000000000000000000000000)
        );
    }

    function checkIfFundingDone() public {
        if (address(this).balance >= campaign.goal) {
            campaign.creator.transfer(address(this).balance / 2);
            isVeto = true;
        } else if (block.timestamp > campaign.endAt) {
            for (uint i = 0; i < earlyBirdBackersIndex.length; i++) {
                earlyBirdBackersIndex[i].transfer(1000000000000000000);
            }
            for (uint i = 0; i < backersIndex.length; i++) {
                backersIndex[i].transfer(1500000000000000000);
            }

            delete backersIndex;
            delete earlyBirdBackersIndex;
            earlyBirdBackersCount = 0;

            campaign.creator = payable(
                address(0x0000000000000000000000000000000000000000)
            );
        }
    }

    function checkIfVetoIsOver() public {
        if (
            vetoBackersIndex.length >=
            (backersIndex.length + earlyBirdBackersCount) / 2
        ) {
            for (uint i = 0; i < vetoBackersIndex.length; i++) {
                vetoBackersIndex[i].transfer(500000000000000000);
            }
        }
        isVeto = false;
    }

    function claimAfterVeto() public {
        require(
            campaign.creator == msg.sender,
            "Not Authorized to cancel campaign"
        );
        require(
            block.timestamp > campaign.endAt + 2419200,
            "Veto time not over"
        );
        campaign.creator.transfer(address(this).balance);
    }
}
