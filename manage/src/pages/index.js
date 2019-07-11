import React, { Component } from 'react'
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
 function index(){
    return (
            <Layout>
            <Header>Header</Header>
            <Layout>
                <Sider>Sider</Sider>
                <Content>Content</Content>
            </Layout>
            </Layout>
       
    )
 }
export default index