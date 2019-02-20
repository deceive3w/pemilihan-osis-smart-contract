
var Election = artifacts.require("./Election.sol");

contract('Election', function(accounts){

    it('initialize candidate with to candidates', function(){
        return Election.deployed().then(async (i)=>{
            totalCandidate = await i.candidatesCount()
            assert.equal(totalCandidate, 2)
        })
    })


    it('initialize candidate with correct value', ()=>{
        return Election.deployed().then(async (i)=>{
            let candidate1 = await i.candidates(1)
            assert.equal(candidate1.uid, 1)
            assert.equal(candidate1.name, "Calon 1")
            assert.equal(candidate1.voteCount, 0)

            let candidate2 = await i.candidates(2)
            assert.equal(candidate2.uid, 2)
            assert.equal(candidate2.name, "Calon 2")
            assert.equal(candidate2.voteCount, 0)
        })
    })
})