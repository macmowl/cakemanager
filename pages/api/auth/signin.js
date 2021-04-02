import jwt from 'jsonwebtoken';

export const signIn = (req, res) => {
    const token = jwt.sign({
        user: req.body
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN}
    )

    try {
        res.cookie('userToken', token, {httpOnly: true});
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({"error": "There was an error singing"});
        console.log(error);
    }
}