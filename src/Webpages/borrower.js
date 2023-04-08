import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ODEMLendABI from "../ABI/ODEMLendABI.json"; // import the ABI of the smart contract
import "../assets/ODEM.css";
import { useNavigate } from 'react-router-dom';
const web3 = new Web3(Web3.givenProvider); // initialize web3 using the browser's provider
 
const ODEMLendAddress = '0x0B9A0709Bd1fDE424Edfe81dA7cDc780aCd2CF90'; // replace with the address of the deployed contract
const ODEMLendContract = new web3.eth.Contract(ODEMLendABI, ODEMLendAddress); // initialize the contract instance
const StatusKey= {
  1:"Pending",
  2:"Approved",
  3:"Rejected",
  4:"Repaid"
}
function LoanRequestForm() {
  let navigate=useNavigate()
  const [LoanRequests, setLoanRequests] = useState([]);
  const [MyLoanRequests, setMyLoanRequests] = useState([]);
  const [Accounts,setAccounts]= useState('');
  const [dueDate, setDueDate] = useState('');
  const [amountAsked, setAmountAsked] = useState('');
  const [mortgageGiven, setMortgageGiven] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [balance, setBalance] = useState(0);
 
  useEffect(() => {
    const initialize = async () => {
      // Check if web3 is injected by the browser (Mist/MetaMask)
      if (typeof window.ethereum !== "undefined") {
        // Use Mist/MetaMask's provider
        // Get the user's accounts
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
 
        const loanRequests = [];
 
        const numLoans = await ODEMLendContract.methods.getNumLoans().call();
        const pendingLoans = [];
        for (let i = 1; i <= numLoans; i++) {
 
          const pendingLoan = await ODEMLendContract.methods.getLoanDetails(i).call();
          if(pendingLoan[2]==1 && pendingLoan[1]==accounts[0])          
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
        setMyLoanRequests(pendingLoans);}
        else {
        console.log("Please install MetaMask!");
      }
    };
    initialize();
  }, []);
 
  async function CreateLoanRequest() {
 
    try{
      const numLoans = await ODEMLendContract.methods.getNumLoans().call();
      const loanBorrower = prompt("Enter the name of the Borrower:");
      const loanAmount = prompt("Enter the amount to be Borrowed:");
      const loanDuration = prompt("Enter the duration in months for Loan Repayment:");
      const loanMortgage = prompt("Enter the Mortgage:");
      const accounts = await web3.eth.getAccounts();
      const loanBorrowerAccount = accounts[0];
 
      await ODEMLendContract.methods.createLoanRequest(loanAmount, loanBorrower, loanDuration, loanMortgage).send({ from: accounts[0] });
 
        // Refresh the learning experiences list
 
        const loanRequests = [];
 
        for (let i = 1; i <= numLoans; i++) { 
          const loan = await ODEMLendContract.methods.getLoanDetails(i).call();
          loanRequests.push({
            id: i,
            LoanBorrowerName: loan[0],
            LoanBorrower: loan[1],
            LoanStatus: loan[2],
            LoanDuration: loan[3],
            LoanMortgage: loan[4],
            LoanAmount: loan[5],
          });
        }
        setLoanRequests(loanRequests);
 
      }
     catch (error) {
        console.log(error);
      }
  };
 
 
 
  return (
        <div className='container4'>
        <h1>My Loan Requests</h1>
        <br></br>
        <button className='LowerButton' onClick={CreateLoanRequest}>Create Loan Request</button>
        <table className='my-loan-requests-table'>
        <thead>
        <tr>
        <th>ID</th>
        <th>Borrower's Name</th>
        <th>Borrower's Account Address</th>
        <th>Loan Amount</th>
        <th>Loan Duration (months)</th>
        <th>Loan Status</th>
        <th>Mortgage</th>
        <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {MyLoanRequests.map((LoanRequest) => (
        <tr key={LoanRequest.id}>
        <td>{LoanRequest.id}</td>
        <td>{LoanRequest.LoanBorrowerName}</td>
        <td>{LoanRequest.LoanBorrower}</td>
        <td>{web3.utils.fromWei(LoanRequest.LoanAmount, "ether")}ETH</td>
        <td>{LoanRequest.LoanDuration}</td>
        <td>{StatusKey[LoanRequest.LoanStatus]}</td>
        <td>{LoanRequest.LoanMortgage}</td>        
        <td>To Be Taken</td>
        </tr>
        ))}
        </tbody>
        </table>
        <br></br><br></br>
        <button style={{marginTop:"200px"}} onClick={() => navigate('/lender')} className='LowerButton'>View Other Loan Requests</button>
        </div>
        );
      }
 
export default LoanRequestForm;