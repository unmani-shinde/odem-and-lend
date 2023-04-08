import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ODEMLendABI from "../ABI/ODEMLendABI.json"; // import the ABI of the smart contract
import "../assets/ODEM.css"
const web3 = new Web3(Web3.givenProvider); // initialize web3 using the browser's provider
 
const ODEMLendAddress = '0x0B9A0709Bd1fDE424Edfe81dA7cDc780aCd2CF90'; // replace with the address of the deployed contract
const ODEMLendContract = new web3.eth.Contract(ODEMLendABI, ODEMLendAddress); // initialize the contract instance
const StatusKey= {
  1:"Pending",
  2:"Approved",
  3:"Rejected",
  4:"Repaid"
}
const myLoansNum =0;
function ProvideForm() {
  const [PendingLoanRequests, setPendingLoanRequests] = useState([]);
  const [OtherLoanRequests, setOtherLoanRequests] = useState([]);
  const [Accounts,setAccounts]= useState('');
  const [dueDate, setDueDate] = useState('');
  const [amountAsked, setAmountAsked] = useState('');
  const [mortgageGiven, setMortgageGiven] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
 
  useEffect(() => {
    const initialize = async () => {
      // Check if web3 is injected by the browser (Mist/MetaMask)
      if (typeof window.ethereum !== "undefined") {
        // Use Mist/MetaMask's provider
        // Get the user's accounts
        const numLoans = await ODEMLendContract.methods.getNumLoans().call();
        const pendingLoans = [];
        const accounts = await web3.eth.getAccounts();
        for (let i = 1; i <= numLoans; i++) {
 
          const pendingLoan = await ODEMLendContract.methods.getLoanDetails(i).call();
          if(pendingLoan[2]==1 && pendingLoan[1]!=accounts[0])          
          pendingLoans.push({
            id: i,
            LoanBorrowerName: pendingLoan[0],
            LoanBorrower: pendingLoan[1],
            LoanStatus: pendingLoan[2],
            LoanDuration: pendingLoan[3],
            LoanMortgage: pendingLoan[4],
            LoanAmount: pendingLoan[5],
          });
        }
        setPendingLoanRequests(pendingLoans);
 
      } else {
        console.log("Please install MetaMask!");
      }
    };
    initialize();
 
  }, []);
 
 
 
async function FundALoan(){
    try{
        const accounts = await web3.eth.getAccounts();
        const loanFundID = prompt("Enter the ID of the Loan you wish to Fund:");
        const prior = 0.0001;
        const amount = web3.utils.toWei(prior.toString(), 'ether');
        await ODEMLendContract.methods.approveLoan(loanFundID).send({
            from: accounts[0],
        value: amount,
        gas: 3000000
        });
 
        //Update the Pending Loans List
        const numLoans = await ODEMLendContract.methods.getNumLoans().call();
        const pendingLoans = [];
        for (let i = 1; i <= numLoans; i++) {
 
          const pendingLoan = await ODEMLendContract.methods.getLoanDetails(i).call();
          if(pendingLoan[2]==1)          
          pendingLoans.push({
            id: i,
            LoanBorrowerName: pendingLoan[0],
            LoanBorrower: pendingLoan[1],
            LoanStatus: pendingLoan[2],
            LoanDuration: pendingLoan[3],
            LoanMortgage: pendingLoan[4],
            LoanAmount: pendingLoan[5],
          });
        }
        setPendingLoanRequests(pendingLoans);
        console.log(`Loan Request with ID ${loanFundID} has been approved for address ${accounts[0]}`);
 
 
    }
    catch (error) {
        console.log(error);
      }
  };
 
  return (
        <div className='container4'>
        <h1>Network's Loan Requests</h1>
 
        <br></br>
        <button className="LowerButton" onClick={FundALoan}>Fund A Loan Request</button>
        <table className='my-loan-requests-table'>
        <thead>
        <tr>
        <th>ID</th>
        <th>Borrower's Name</th>
        <th>Borrower's Account Address</th>
        <th>Loan Amount</th>
        <th>Loan Duration (in months)</th>
        <th>Loan Status</th>
        <th>Mortgage</th>
        <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {PendingLoanRequests.map((LoanRequest) => (
        <tr key={LoanRequest.id}>
        <td>{LoanRequest.id}</td>
        <td>{LoanRequest.LoanBorrowerName}</td>
        <td>{LoanRequest.LoanBorrower}</td>
        <td>{web3.utils.fromWei(LoanRequest.LoanAmount, "ether")}ETH</td>
        <td>{LoanRequest.LoanDuration}</td>
        <td>{StatusKey[LoanRequest.LoanStatus]}</td>
        <td>{LoanRequest.LoanMortgage}</td>        
        <td><button className="LowerButton" onClick={FundALoan}>Accept</button><br></br><button className='LowerButton'>Reject</button></td>
        </tr>
        ))}
        </tbody>
        </table>
        <br></br><br></br>
        <button style={{marginTop:'200px'}}className="LowerButton">View My Loan Requests</button>
        </div>
        );
      }
 
export default ProvideForm;