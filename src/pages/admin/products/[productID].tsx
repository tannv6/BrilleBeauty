import React from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

function index() {
    const query = useRouter().query;
    return (
        <Layout>
            <div>lklk{query.productID}</div>
        </Layout>
    );
}

export default index;