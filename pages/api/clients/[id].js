import dbConnect from '../../../utils/dbConnect';
import Client from '../../../models/Client.model';

dbConnect()

export default async (req, res) => {
    const {
        method,
        query: {id}
    } = req;

    switch(method) {
        case "GET":
            try {
                const note = await Client.findById(id);

                if (!note) {
                    return res.status(400).json({
                        success: false,
                        data: 'Client not found',
                    });
                }

                res.status(200).json({ success: true, data: note });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "PUT":
            try {
                const note = await Client.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });

                if (!note) {
                    return res.status(400).json({
                        success: false,
                        data: 'Client not found',
                    });
                }

                res.status(200).json({ success: true, data: note });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "DELETE":
            try {
                const deletedClient = await Client.deleteOne({ _id: id});

                if (!deletedClient) {
                    return res.status(400).json({
                        success: false,
                        data: 'Client not found',
                    });
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false, data: 'No methods' });
            break;
    }
}