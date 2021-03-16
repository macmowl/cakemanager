import dbConnect from '../../../utils/dbConnect';
import Cake from '../../../models/Cake.model';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch(method) {
        case "GET":
            try {
                const cakes = await Cake.find({});

                res.status(200).json({ success: true, data: cakes });
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
            break;
        case "POST":
            try {
                const cake = await Cake.create(req.body);
                res.status(201).json({ success: true, data: cake});
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
            break;
        default:
            res.status(400).json({ success: false, data: 'No method' });
            break;
    }
}