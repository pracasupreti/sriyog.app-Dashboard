

import JoinForm from '../model/joinform.model.js';
import Profession from '../model/profession.model.js';

export const getWaitingProfessionals = async (req, res) => {
	try {
		// Extract pagination parameters from query
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const search = req.query.search || '';
		
		// Calculate skip value for pagination
		const skip = (page - 1) * limit;
		
		// Build search query
		let searchQuery = {};
		if (search) {
			// Split search term into words for better matching
			const searchWords = search.trim().split(/\s+/);
			
			// Create regex patterns that match from beginning of words
			const createWordBoundaryRegex = (term) => `\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`;
			
			// Create search conditions for individual fields - matching from start of words
			const fieldSearchConditions = [
				{ "First Name": { $regex: createWordBoundaryRegex(search), $options: 'i' } },
				{ "Last Name": { $regex: createWordBoundaryRegex(search), $options: 'i' } },
				{ "Middle Name": { $regex: createWordBoundaryRegex(search), $options: 'i' } },
				{ City: { $regex: createWordBoundaryRegex(search), $options: 'i' } },
				{ Profession: { $regex: createWordBoundaryRegex(search), $options: 'i' } },
				{ Phone: { $regex: search, $options: 'i' } }, // Phone can match anywhere
				{ Gender: { $regex: createWordBoundaryRegex(search), $options: 'i' } }
			];

			// Add full name search using $expr to concatenate fields
			const fullNameSearch = {
				$expr: {
					$regexMatch: {
						input: {
							$concat: [
								{ $ifNull: ["$First Name", ""] },
								" ",
								{ $ifNull: ["$Middle Name", ""] },
								" ",
								{ $ifNull: ["$Last Name", ""] }
							]
						},
						regex: createWordBoundaryRegex(search),
						options: "i"
					}
				}
			};

			// Add conditions for each word in the search term
			const wordSearchConditions = [];
			searchWords.forEach(word => {
				if (word.length > 0) {
					wordSearchConditions.push({
						$or: [
							{ "First Name": { $regex: createWordBoundaryRegex(word), $options: 'i' } },
							{ "Last Name": { $regex: createWordBoundaryRegex(word), $options: 'i' } },
							{ "Middle Name": { $regex: createWordBoundaryRegex(word), $options: 'i' } },
							{ City: { $regex: createWordBoundaryRegex(word), $options: 'i' } },
							{ Profession: { $regex: createWordBoundaryRegex(word), $options: 'i' } }
						]
					});
				}
			});

			// Combine all search conditions
			searchQuery = {
				$or: [
					...fieldSearchConditions,
					fullNameSearch,
					...(wordSearchConditions.length > 1 ? [{ $and: wordSearchConditions }] : wordSearchConditions)
				]
			};
		}
		
		// Get total count for pagination info
		const totalCount = await JoinForm.countDocuments(searchQuery);
		const totalPages = Math.ceil(totalCount / limit);
		
		// Fetch paginated data
		const joinForms = await JoinForm.find(searchQuery)
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 }); // Sort by newest first
		
		// Return paginated response
		res.json({
			success: true,
			data: joinForms,
			pagination: {
				totalCount,
				totalPages,
				currentPage: page,
				limit,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1
			}
		});
	} catch (err) {
		res.status(500).json({ 
			success: false,
			error: err.message 
		});
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


export const getProfessionalsFilters=async(req,res)=>{
	 try {
    // Get unique values for each filter field
    const professions = await Profession.distinct("Professions");
    const cities = await JoinForm.distinct("City");
    const genders = await JoinForm.distinct("Gender");
    // For dates, you may want to format createdAt to just the date part
    const datesRaw = await JoinForm.distinct("createdAt");
    const dates = datesRaw
      .map(date => new Date(date).toISOString().slice(0, 10))
      .filter((v, i, a) => a.indexOf(v) === i); // unique YYYY-MM-DD

    res.json({
      professions,
      cities,
      genders,
      dates,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch filter options" });
  }
	
}




