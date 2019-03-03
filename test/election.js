
var Election = artifacts.require("./Election.sol");

contract('Election', function(accounts){

    it('initialize candidate with 5 candidates', function(){
        return Election.deployed().then(async (i)=>{
            totalCandidate = await i.candidatesCount()
            assert.equal(totalCandidate, 5)
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

    it('it should can register', ()=>{
        return Election.deployed().then(async (i)=>{
            let voterAddress = await i.registerVoter("defri")
            let myAddress = accounts[0]
            let voter = await i.voters(myAddress);
            assert.equal(voter.uid, 1);
            assert.equal(voter.name, "defri");
            assert.equal(voter.balance, 1);
        })
    })

    it('it should success vote', ()=>{
        return Election.deployed().then(async (i)=>{
            let myAddress = accounts[0]
            try{
                let voterAddress = await i.vote(myAddress, 1)
            }catch(e){
                console.log(e)
            }
            let candidate = await i.candidates(1)
            assert.equal(candidate.voteCount, 1);
        })
    })

    it('it should cannot vote twice', ()=>{
        return Election.deployed().then(async (i)=>{
            let myAddress = accounts[0]
            
            return i.vote(myAddress, 1)
        })
        .then(assert.fail)
        .catch((err)=>{
            assert.include(err.message, 'Transaksi Anda gagal', 'Anda sudah pernah melakukan voting')
        })
    })
})