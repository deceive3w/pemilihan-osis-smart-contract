import React,{Component, useEffect,useState, useContext} from 'react'
import './styles.css'
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';

const Header = () =>(
    <div className="header">
        <div className="row header-container">
            <div className="col">
                <h2 className="header-title">Election Example using Ethereum</h2>
            </div>
        </div>
    </div>
)


class Candidates extends Component{
    state ={
        initialized: false
    }
    constructor(props, context){
        super(props)
        console.log('candidates', context)
        this.contracts = context.drizzle.contracts
    }
    componentDidMount = () => {

    }
    
    render(){
        if(this.props.drizzleStatus.initialized){

            if(!this.state.initialized){
              
                let key = this.contracts.Election.methods.candidatesCount.cacheCall()
                const candidatesCount = this.props.Election.candidatesCount[key]
                if(candidatesCount){
                    const total = candidatesCount.value
                    for(let i = 1 ; i <= total; i++){
                        this.contracts.Election.methods.candidates.cacheCall(i)
                    }
                    this.setState({
                        initialized: true
                    })
                }
                // console.log('key', this.props.Election)
            }

            let renderCandidates = []
            if(this.props.Election.candidates){
                Object.keys(this.props.Election.candidates).forEach((key)=>{
                    const candidate =  this.props.Election.candidates[key].value
                    renderCandidates.push(
                        <div className="col-12 col-lg-3 col-sm-6 candidate border">
                            <img src="http://scorecard.enga.ge/assets/images/candidates/clinton.jpg" className="candidate-img"/>
                            <h6>{candidate.name}</h6>
                        </div>
                    )
                })
            }

            return(
                <div className="candidates">
                    <div className="row candidates-row">
                        {renderCandidates}
                    </div>
                </div>
            )
        }else{
            return 'Loading...'
        }
        
    }
}

const mapStateToProps = state => {
    return {
        drizzleStatus: state.drizzleStatus,
        Election: state.contracts.Election
    }
}
Candidates.contextTypes = {
    drizzle: PropTypes.object
}
const CandidatesContainer = drizzleConnect(Candidates, mapStateToProps)

class Vote extends Component {
    componentDidMount = () => {
      console.log('vote', this)
    }
    
    render(){
        return(
            <div className="container">
                <Header/>
                <CandidatesContainer/>
            </div>
        )
    }
}

export default Vote