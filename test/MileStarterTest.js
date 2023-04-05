const MileStarter = artifacts.require("MileStarter");

contract("MetaCoin", (accounts) => {
    it("should put 10000 MetaCoin in the first account", async () => {
        const mileStarterInstance = await MileStarter.deployed();
        const balance = await mileStarterInstance.getBalance.call(accounts[0]);

        assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });

});