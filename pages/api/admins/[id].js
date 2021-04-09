import dbConnect from '../../../utils/dbConnect';
import Admin from '../../../models/Admin.model';

dbConnect()

export default async (req, res) => {
    const {
        method,
        query: {id}
    } = req;

    switch(method) {
        case "GET":
            try {
                const admin = await Admin.findById(id);

                if (!admin) {
                    return res.status(400).json({
                        success: false,
                        data: 'Admin not found',
                    });
                }

                res.status(200).json({ success: true, data: admin });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "PUT":
            try {
                const admin = await Admin.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });

                if (!admin) {
                    return res.status(400).json({
                        success: false,
                        data: 'Admin not found',
                    });
                }

                res.status(200).json({ success: true, data: admin });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "DELETE":
            try {
                const deletedAdmin = await Admin.deleteOne({ _id: id});

                if (!deletedAdmin) {
                    return res.status(400).json({
                        success: false,
                        data: 'Admin not found',
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