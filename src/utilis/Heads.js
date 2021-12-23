import Head from 'next/head';

const Heads = ({title}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content="Created By Siam Ahnaf!"/>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
        </Head>
    );
};
export default Heads;
