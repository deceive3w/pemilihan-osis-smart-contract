pragma solidity >=0.4.24;


contract Election {

    //model
    struct Candidate {
        uint uid;
        string name;
        uint voteCount;
        //TODO: ADD AVATAR IMAGE USING IPFS
    }

    struct Voter{
        uint uid;
        string name;
        uint balance;
    }

    uint public candidatesCount;
    uint public votersCount;

    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;

    event VoteEvent(uint candidateId, uint voteCount);

    constructor () public {
        addCandidate("Calon 1");
        addCandidate("Calon 2");
        addCandidate("Calon 3");
        addCandidate("Calon 4");
        addCandidate("Calon 5");
    }
    function addCandidate (string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function registerVoter(string memory _name) public returns (address){
        votersCount++;
        if(voters[msg.sender].uid != 0){
            revert();
        }
        voters[msg.sender] = Voter(votersCount, _name, 1);
        return msg.sender;
    }

    function vote(address from, uint candidateId) public {
        require(voters[from].uid != 0, "Anda belum registrasi.");
        require(voters[from].balance > 0, "Transaksi Anda gagal. Anda sudah pernah melakukan voting.");
        require(candidates[candidateId].uid != 0, "Candidate tidak valid.");
        candidates[candidateId].voteCount++;
        voters[from].balance = 0;
        emit VoteEvent(candidateId, candidates[candidateId].voteCount);
    }
}