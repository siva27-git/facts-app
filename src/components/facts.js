import React, { useState, useEffect } from "react";
import { Spin, Table } from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";

const Facts = () => {
    const [loading, setLoading] = useState(false);
    const [facts, setFacts] = useState([]);

    useEffect(() => {
        getFacts()
    }, [])

    const getFacts = async () => {
        setLoading(true);
        let factList = []
        try {
            for (let i = 0; i < 10; i++) {
                let fact = await axios({ method: 'get', url: 'https://catfact.ninja/fact' });
                factList.push({ key: i + 1, fact: fact.data.fact });
            };
            setFacts(factList);
            setLoading(false);
        } catch (error) {
            console.log(`Error while getting facts`)
        };
    }

    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "FACT",
            dataIndex: "fact",
            key: "fact",
        }
    ];

    return (
        <div className="App">
            {loading ? <Spin /> : <Table columns={columns} dataSource={facts} bordered={true} pagination={false} />}
        </div>
    )
};

export default Facts;