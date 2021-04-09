import dbConnect from '../../../utils/dbConnect';
import Cake from '../../../models/Cake.model';
// import { getSession } from 'next-auth/client';

dbConnect();

export default async (req, res) => {
    // const session = await getSession({ req });
    // console.log(session)
    // if(session) {
            // Insert your content here !!!
    // } else {
    //     res.status(401).send({ content: 'No access for you bro, sorry'})
    // }

    const { method } = req;
        switch(method) {
            case "GET":
                try {
                    const cakes = await Cake.find({})
                        .sort({'deliveryDate': 1})
                        .populate('client')
                        .populate('creator');
                    cakes.forEach(cake => {
                        cake.creator.password = '';
                    });
                    res.status(200).json({ success: true, data: cakes });
                } catch (error) {
                    console.log(error)
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