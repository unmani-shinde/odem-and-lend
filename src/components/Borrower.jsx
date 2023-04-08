import React, { useState, useEffect } from 'react';
import "./stylesheets/Borrower.css";
import Web3 from "web3";

function Borrower() {

    const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);

  const [accountNumber, setAccountNumber] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [loanDetails, setLoanDetails] = useState([]);
  const [showNewLoanForm, setShowNewLoanForm] = useState(false);
  const [mortgageOptions, setMortgageOptions] = useState([]);

  const handleNewLoanFormSubmit = (event) => {
    event.preventDefault(); // prevent the form from submitting and refreshing the page
    
    const amount = document.getElementById('newloan-amount').value;
    const dueDate = document.getElementById('newloan-date').value;
    const mortgage = document.getElementById('newloan-mortgage').value;
    console.log(amount);
    // handle the loan request logic here...
  };

  useEffect(() => {
    async function getAccount() {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const balance = await web3.eth.getBalance(accounts[0]);
      setBalance(web3.utils.fromWei(balance, "ether"));
    }

    if (window.ethereum) {
      getAccount();
    }
  }, []);

  const handleLoanDetailsClick = (event) => {
    event.preventDefault();
  }
  
  return (
    <div>
        <div>
      <h3>Account: {account}</h3>
      <h3>Balance: {balance} ETH</h3>
    </div>

<form onSubmit={handleNewLoanFormSubmit}>
  <div className="form-group">
    <label htmlFor="amount">Amount:</label>
    <input type="number" className="form-control" id="newloan-amount" name="amount" placeholder="Loan Amount" />
  </div>
  <div className="form-group">
    <label htmlFor="date">Due Date:</label>
    <input type="date" className="form-control" id="newloan-date" name="date" />
  </div>
  <div className="form-group">
    <label htmlFor="mortgage">Mortgage:</label>
    <input type="text" className="form-control" id="newloan-mortgage" name="mortgage" placeholder="Mortgage" />
  </div>
  <button type="submit" className="btn btn-primary btn-lg btn-block">Apply for Loan</button>
</form>

<div className="row">
  <div className="col-sm-12">
    <h3>Past Loan Details</h3>
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Loan ID</th>
          <th>Loan Status</th>
          <th>Due Date</th>
          <th>Amount Asked</th>
          <th>Mortgage Given</th>
          <th>Amount Collected</th>
          <th>Other Details</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
    
        {/* {pastLoanDetails.map((loan, index) => (
          <tr key={index}>
            <td>{loan.id}</td>
            <td>{loan.status}</td>
            <td>{loan.dueDate}</td>
            <td>{loan.amountAsked}</td>
            <td>{loan.mortgageGiven}</td>
            <td>{loan.amountCollected}</td>
            <td>{loan.otherDetails}</td>
            <td><button className="btn btn-primary" onClick={() => handlePastLoanDetailsClick(loan.id)}>View Details</button></td>
          </tr>
        ))} */}
      </tbody>
    </table>
  </div>
</div>


      
   </div>
);
}

export default Borrower;





