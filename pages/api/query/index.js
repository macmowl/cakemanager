import dbConnect from '../../../utils/dbConnect';
import Client from '../../../models/Client.model';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch(method) {
        case "POST":
            try {
                const query = await Client.find({email: req.body.email});
                if(query === 'undefined' || query.length === 0) {
                    return res.status(200).json({
                        success: false,
                        data: [{
                            name: '',
                            email: req.body.email,
                            adress: '',
                            zipCode: '',
                            city: '',
                            phone: ''
                        }]});
                }

                res.status(200).json({ success: true, data: query });
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
            break;
        default:
            res.status(400).json({ success: false, data: 'No method' });
            break;
    }
}
