pragma solidity >=0.4.24;


contract Election {

    //model
    struct Candidate {
        uint uid;
        string name;
        uint voteCount;
        //TODO: ADD AVATAR IMAGE USING IPFS
    }

    uint public candidatesCount;

    mapping(uint => Candidate) public candidates;

    constructor () public {
        //TODO: READ EXTERNAL DATA TO INITIAL DATA
        addCandidate("Calon 1");
        addCandidate("Calon 2");
    }
    function addCandidate (string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}