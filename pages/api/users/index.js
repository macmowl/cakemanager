import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User.model';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch(method) {
        case "GET":
            try {
                const notes = await User.find({});

                res.status(200).json({ success: true, data: notes });
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
            break;
        case "POST":
            try {
                const note = await User.create(req.body);
                res.status(201).json({ success: true, data: note});
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
            break;
        default:
            res.status(400).json({ success: false, data: 'No method' });
            break;
    }
}