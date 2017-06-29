import Complaint from '../db/mongo/models/complaint';

export const createNewLead = async (email) => {
  const results = await Promise.all([
    Complaint.find({}
    .exec())
    .then((dbComplaints))
  ])
}

export const x = '';
