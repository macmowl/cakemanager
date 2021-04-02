import jwt from 'jsonwebtoken';

const RequireAuthentication = (WrappedComponent) => {

    return class extends React.Component {

        static getInitialProps(ctx) {

            let isAuthenticated;
            const token = ctx.req.headers.cookie?.replace('userToken=', '');

            try {
                isAuthenticated = jwt.verify(token, process.env.JWT_SECRET);
            } catch (e) {
                console.log(e);
            }

            // Use !isAuthenticated for error cases
            if (isAuthenticated?.user) {
                return WrappedComponent.getInitialProps(ctx);
            } else {
                ctx.res.redirect('/')
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};

export default RequireAuthentication;