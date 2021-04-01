const Order = require('../models/Order');



exports.getOrders = async (req, res) => {
    const order = await Order.find({_id: res.locals.user.id});
    if(order.length < 1) return res.status(404).json({message: 'You don\'t have any order yet!'});
    res.status(200).json(order);
}