import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/borrower.css';


function Borrower(){
    return(
        <header className="intro-header">
            <div className="container">
                <div className="intro-message">
                    <h1>Hi! Borrower</h1>
                    <h4>Welcome to Crowd Bank</h4>
                    <hr className="intro-divider"/>
                    <h5>Your Account Address : <span id="account-number"></span></h5>
                    <h5>Your Account Balance : <span id="account-balance"></span> ETH</h5>
                    <hr className="intro-divider"/>
                    <div className="row">
                      {/* <!-- New Loan Form : Default Style Hidden --> */}
                      <div className="col-sm-12">
                        <div className="alert alert-danger" id="newloan-form" style={{display:'none'}}>
                          <h4 className="alert-heading text-center"><b>No Currently Active Loan! Ask for one here.</b></h4>
                          <form>
                            <div className="form-group">
                                <label htmlFor="amount">Amount:</label>
                                <input type="number" className="form-control" id="newloan-amount" name="amount" placeholder="Loan Amount"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Due Date:</label>
                                <input type="date" className="form-control" id="newloan-date" name="date"/>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Choose Mortgage</label>
                                <div className="selectContainer">
                                    <select name="mortgage" id="newloan-mortgage" className="form-control">
                                        {/* <!--<option value=""></option> --> */}
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-default">Ask for Money</button>
                        </form>
                    </div>
                    </div>

                    {/* <!-- Past Loan Details Table --> */}
                    <div className="col-sm-12">
                    <h4><b>Your Past Loan Details</b></h4>
                    <table id="loan-rows" className="table table-striped table-hover">
                        <thead>
                        <tr className="info">
                            <th>Loan Id</th>
                            <th>Loan State</th>
                            <th>Due Date</th>
                            <th>Amount Asked</th>
                            <th>Mortgage Given</th>
                            <th>Amount Collected</th>
                            <th>Details</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
      
            {/* <!-- SHOW LOAN DETAILS MODAL --> */}
            <div className="modal fade" id="loanDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="loanDetailsModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" style={{display:'inline-block'}}><b>Proposal Details</b></h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Proposal Count : <span id="loan-proposal-count"></span></p>
                    <table id="loan-proposal-details" className="table table-bordered">
                        <thead>
                            <tr>
                                <td>Amount</td>
                                <td>Rate of Interest</td>
                                <td>Take Action</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <p>Repay Amount : <span id="loan-repay-amount"></span></p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
      
    </header>


        


    )
}

export default Borrower;