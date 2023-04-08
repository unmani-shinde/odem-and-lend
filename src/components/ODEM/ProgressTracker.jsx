import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ProgressTrackerABI from '../ABI/ProgressTracker.json';
import "../stylesheets/ProgressTracker.css";

const ProgressTracker = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [participantMilestones, setParticipantMilestones] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [participant, setParticipant] = useState('');
  const [milestone, setMilestone] = useState(0);

  useEffect(() => {
    const init = async () => {
      // Connect to Metamask or other Web3 provider
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3);
        } catch (error) {
          console.error(error);
        }
      } else if (window.web3) {
        setWeb3(window.web3);
      } else {
        console.error('No Web3 provider detected');
      }

      // Load the ProgressTracker contract
      const contractAddress = "0xEcaA696FC70d4c0a5ef86571F8ce9b75811d7732"
      const contract = new web3.eth.Contract(ProgressTrackerABI, contractAddress);
      setContract(contract);
      
      // Load the list of milestones from the contract
      const milestones = [];
      const milestonesCount = await contract.methods.getMilestonesCount().call();
      for (let i = 0; i < milestonesCount; i++) {
        const milestone = await contract.methods.getMilestone(i).call();
        milestones.push(milestone);
      }
      setMilestones(milestones);

      // Load the list of participants from the contract
      const participants = [];
      const participantsCount = await contract.methods.getParticipantsCount().call();
      for (let i = 0; i < participantsCount; i++) {
        const participant = await contract.methods.getParticipant(i).call();
        participants.push(participant);
      }
      setParticipants(participants);
      
      // Load the completion status of milestones for the current participant
      const participant = accounts[0];
      const participantMilestones = [];
      for (let i = 0; i < milestonesCount; i++) {
        const milestoneComplete = await contract.methods.getParticipantMilestoneStatus(participant, i).call();
        participantMilestones.push(milestoneComplete);
      }
      setParticipantMilestones(participantMilestones);
    };
    init();
  }, [web3, accounts, contract]);

  const addParticipant = async () => {
    await contract.methods.addParticipant(accounts[0]).send({ from: accounts[0] });
  };

  const removeParticipant = async () => {
    await contract.methods.removeParticipant(accounts[0]).send({ from: accounts[0] });
  };

  const addMilestone = async () => {
    await contract.methods.addMilestone('New Milestone').send({ from: accounts[0] });
  };

  const removeMilestone = async () => {
    await contract.methods.removeMilestone(0).send({ from
        : accounts[0] });
    };
    
    const updateMilestoneStatus = async () => {
    await contract.methods.updateParticipantMilestoneStatus(participant, milestone).send({ from: accounts[0] });
    };
    
    const handleParticipantChange = (event) => {
    setParticipant(event.target.value);
    };
    
    const handleMilestoneChange = (event) => {
    setMilestone(event.target.value);
    };
    
    return (
    <div className='progress-tracker'>
    <h1>Progress Tracker</h1>
    <h2>Milestones</h2>
    <ul>
    {milestones.map((milestone, index) => (
    <li key={index}>{milestone}</li>
    ))}
    </ul>
    <button onClick={addMilestone}>Add Milestone</button>
    <button onClick={removeMilestone}>Remove Milestone</button>
    <h2>Participants</h2>
  <ul>
    {participants.map((participant, index) => (
      <li key={index}>{participant}</li>
    ))}
  </ul>
  <button onClick={addParticipant}>Add Participant</button>
  <button onClick={removeParticipant}>Remove Participant</button>

  <h2>Participant Milestones</h2>
  <label>
    Participant:
    <select value={participant} onChange={handleParticipantChange}>
      {participants.map((participant, index) => (
        <option key={index} value={participant}>{participant}</option>
      ))}
    </select>
  </label>
  <br />
  <label>
    Milestone:
    <select value={milestone} onChange={handleMilestoneChange}>
      {milestones.map((milestone, index) => (
        <option key={index} value={index}>{milestone}</option>
      ))}
    </select>
  </label>
  <br />
  <button onClick={updateMilestoneStatus}>Update Milestone Status</button>
  <ul>
    {participantMilestones.map((milestoneComplete, index) => (
      <li key={index}>{milestoneComplete ? 'Complete' : 'Incomplete'}</li>
    ))}
  </ul>
</div>
);
};

export default ProgressTracker;