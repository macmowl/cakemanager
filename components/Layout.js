import Head from 'next/head';

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Cake Manager</title>
                <meta name="description" content="Manage your cakes with ease" />
                <meta name="keywords" content="cakes, ice Cream, dolce" />
            </Head>
            <div className="justify-center">
                { children }
            </div>
        </>
    )
}

export default Layout