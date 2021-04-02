import dbConnect from '../../../utils/dbConnect';
import Admin from '../../../models/Admin.model';
import bcrypt from 'bcryptjs';

dbConnect();

const encryptPw = async (password) => {
    return await bcrypt.hash(password, 12);
};

export default async (req, res) => {
    const { method } = req;

    switch(method) {
        case "GET":
            try {
                const admins = await Admin.find({});
                res.status(200).json({ success: true, data: admins });
            } catch (error) {
                res.status(400).json({ success: false, data: error });
            }
            break;
        case "POST":
            const { email, password } = req.body;
            const pw = await encryptPw(password);
            console.log(req.body.password);
            try {
                const newAdmin = await Admin.create({
                    email,
                    password: pw,
                });
                res.status(201).json({ success: true, data: newAdmin });
            } catch (err) {
                let errorHandled = err;
                if (err.name === "MongoError") errorHandled = DBError(err);
                res.status(401).json({ message: errorHandled.message });
            }
            break;
        default:
            res.status(400).json({ success: false, data: 'No method' });
            break;
    }
}