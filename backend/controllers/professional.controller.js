

import JoinForm from '../model/joinform.model.js';

export const getWaitingProfessionals = async (req, res) => {
	try {
		const joinForms = await JoinForm.find();
		res.json(joinForms);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};


export const getJoinFormById = async (req, res) => {
	try {
		const joinForm = await JoinForm.findOne({Phone:req.params.id});
		if (!joinForm) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.json(joinForm);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const updateUserStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		if (!['Basic', 'Professional', 'Premium', 'Suspended', 'Offline'].includes(status)) {
			return res.status(400).json({ error: 'Invalid status value' });
		}
		const updatedUser = await JoinForm.findByIdAndUpdate(id, { status }, { new: true });
		if (!updatedUser) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.json(updatedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};