import React, { Component } from 'react'
import './styles.css'
import PropTypes from 'prop-types';
import { drizzleConnect } from 'drizzle-react';

class Login extends Component{
    state = {
        address: null,
        name: '',
        key: null
    }
    constructor(props, context){
        super(props)
        this.contracts = context.drizzle.contracts
        context.drizzle.web3.eth.getAccounts().then(async (res)=>{
            const address = res[0]
            this.setState({
                address
            })

            // this.contracts.Election.methods.registerVoter.cacheSend("asdasd", {from: address})
            // let key = this.contracts.Election.methods.candidatesCount.cacheCall()
            let keyVoter = await this.contracts.Election.methods.voters.cacheCall(address)
            this.setState({
                key: keyVoter
            })
            console.log('voter', this.props.Election)
        })
    }
    handleInput(event){
        this.setState({
            name: event.target.value
        })
    }

    handleSignUp(){
        // alert('oke')
        // alert(this.state.name)
        // this.contracts.Election.methods.registerVoter.cacheCall(this.state.name)
        try{
            this.contracts.Election.methods.registerVoter.cacheSend(this.state.name, {from: this.state.address})
            localStorage.setItem({
                voteAuth:{
                    address: this.state.address,
                    isLoggedIn: true
                }
            })
        }catch(e){
            console.log(e)
        }
        // this.setState({
        //     key
        // })
        // console.log(this.contracts.Election.methods.registerVoter(this.state.name).call())
    }
    render(){
        const isLoggedIn = this.state.key ? this.props.Election.voters[this.state.key] ? this.props.Election.voters[this.state.key].value.uid > 0 : false : false
        if(!this.state.address){
            return 'Fetching your address.'
        }
        if(isLoggedIn){
            return(
                <div>

                <h2>You are Logged In!</h2>
                <p onClick={()=>this.props.history.push('/')}>Goto to vote</p>
                </div>
            )
        }
        console.log('voter', this.state.key)
        console.log('current voter', this.props.Election.voters[this.state.key])
        return(
            <div className="container">
                <div className="row">
                    <div className="login-container">
                        <div className="col-sm-12 col-md-12">
                            <h3>Login</h3>
                            <p>{`Welcome, ${this.state.address}`}</p>
                            <p>{`Please sign up first before you vote candidate`}</p>
                            <p>{this.props.Election.voters[this.state.address]}</p>
                            <form action=""id="login-form">
                                <div className="form-group input-group">
                                    <input onChange={this.handleInput.bind(this)} className="form-control" type="text" name='username' placeholder="Name"/>   
                                </div>
                                <button onClick={this.handleSignUp.bind(this)}  type="button">Sign up</button>
                                {/* <div className="form-group input-group">
                                    <input className="form-control" type="text" name='username' placeholder="username"/>   
                                </div> */}
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextTypes = {
    drizzle: PropTypes.object
}
const mapStateToProps = state => {
    return {
        drizzleStatus: state.drizzleStatus,
        Election: state.contracts.Election
    }
}

export default drizzleConnect(Login, mapStateToProps)
