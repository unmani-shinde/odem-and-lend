import React, { useState, useEffect } from "react";
import Web3 from "web3";
import ODEMLendABI from "./ABI/ODEMLendABI.json";
import "./stylesheets/LoanRequestForm.css";

const web3 = new Web3(Web3.givenProvider); // initialize web3 using the browser's provider

const ODEMLendAddress = '0x376111aBe4f8C5784979589aDa2Df3EDAEcE733C'; // replace with the address of the deployed contract
const ODEMLendContract = new web3.eth.Contract(ODEMLendABI, ODEMLendAddress); // initialize the contract instance


function Lender() {
  const [pendingLoans, setPendingLoans] = useState([]);
  

  useEffect(() => {
    const loadPendingLoans = async () => {
        const accounts = await web3.eth.getAccounts();

        const allLoans = await ODEMLendContract.methods.displayAllPendingLoans().send({ from: accounts[0] });
        const loansArray = Object.values(allLoans);
        setPendingLoans(loansArray);
    
    };
    loadPendingLoans();
  }, []);

  const approveLoan = async (loanID) => {
    const accounts = await web3.eth.getAccounts();
    await ODEMLendContract.methods.approveLoan(loanID).send({ from: accounts[0] });
    const updatedLoans = await ODEMLendContract.methods.displayAllPendingLoans().send({ from: accounts[0] });
    const loansArray = Object.values(updatedLoans);
    setPendingLoans(loansArray);
  };

  const rejectLoan = async (loanID) => {
    const accounts = await web3.eth.getAccounts();
    await ODEMLendContract.methods.rejectLoan(loanID).send({ from: accounts[0] });
    const updatedLoans = await ODEMLendContract.methods.displayAllPendingLoans().send({ from: accounts[0] });
    const loansArray = Object.values(updatedLoans);
    setPendingLoans(loansArray);
  };

  return (
    <div>
      <h1>ODEM Lend</h1>
      <h2>My Account:</h2>
      <table>
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Due Date</th>
            <th>Amount Asked</th>
            <th>Borrower</th>
            <th>Mortgage Given</th>
            <th>Other Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {pendingLoans.map((loan) => (
  loan && // Add this line to check if "loan" is not null or undefined
  <tr key={loan.loanID}>
    <td>{loan.loanID}</td>
    <td>{loan.dueDate}</td>
    <td>{loan.amountAsked}</td>
    <td>{loan.borrower}</td>
    <td>{loan.mortgageGiven}</td>
    <td>{loan.otherDetails}</td>
    <td>
      <button onClick={() => approveLoan(loan.loanID)}>Approve</button>
      <button onClick={() => rejectLoan(loan.loanID)}>Reject</button>
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
}

export default Lender;
