import React,{Component} from 'react'
import './styles.css'

const Header = () =>(
    <div className="header">
        <div className="row header-container">
            <div className="col">
                <h2 className="header-title">Election Example using Ethereum</h2>
            </div>
        </div>
    </div>
)

const Candidates = () => {
    return(
        <div className="candidates">
            <div className="row candidates-row">
                <div className="candidate border">
                    <img src="http://scorecard.enga.ge/assets/images/candidates/clinton.jpg" className="candidate-img"/>
                    <h6>Candidate name</h6>
                </div>
                <div className="candidate border ">
                    <img src="http://scorecard.enga.ge/assets/images/candidates/clinton.jpg" className="candidate-img"/>
                    <h6>Candidate name</h6>
                </div>
                <div className="candidate border">
                    <img src="http://scorecard.enga.ge/assets/images/candidates/clinton.jpg" className="candidate-img"/>
                    <h6>Candidate name</h6>
                </div>
                <div className="candidate border">
                    <img src="http://scorecard.enga.ge/assets/images/candidates/clinton.jpg" className="candidate-img"/>
                    <h6>Candidate name</h6>
                </div>
            </div>
        </div>
    )
}
class Vote extends Component {
    render(){
        return(
            <div className="container">
                <Header/>
                <Candidates/>
            </div>
        )
    }
}

export default Vote