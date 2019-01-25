const order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
	const query = {
		user: req.user.id
	};

	if (req.query.start) {
		query.date = {
			$gte: req.query.start
		}
	}

	if (req.query.end) {
		if (!query.date) {
			query.date = {};
		}

		query.date['$lte'] = req.query.end;
	}

	if (req.query.order) {
		query.order = +req.query.order;
	}

	try {
		const orders = await order.find(query).sort({_id: -1}).skip(+req.query.offset).limit(+req.query.limit);
		res.status(200).json(orders);
	} catch(e) {
		errorHandler(res, e);
	}
};


module.exports.create = async (req, res) => {
	const lastOrder = await order.findOne({user: req.user.id}).sort({_id:-1});
	console.log(lastOrder)
	const maxOrder = lastOrder ? lastOrder.order : 0;
	console.log(maxOrder + 'SKDMKMDKWMDLKWM');
	try {
		const ord = await new order({
			order: maxOrder + 1,
			list: req.body.list,
			user: req.user.id
		}).save();
		res.status(201).json(ord);
	} catch(e) {
		errorHandler(res, e);
	}
};