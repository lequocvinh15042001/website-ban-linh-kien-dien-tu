import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%', fontSize: '14px' }} className='px-0'>
            <CDBSidebar textColor="#f5f5f5" backgroundColor="#2b2b2b" style={{ width: '100%' }}>
                <CDBSidebarHeader prefix={<i id='side-bar-icon' className="fa fa-bars" />}>
                    <p style={{ fontSize: '20px', margin: '0px', textAlign: 'center', color: '#dddddd' }}>Admin</p>
                </CDBSidebarHeader>
                <CDBSidebarContent>
                    <CDBSidebarMenu>
                        <NavLink exact to="/admin/dashboard" activeClassName="activeClicked">
                            <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="home">Trang điều khiển</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/admin/userlist" activeClassName="activeClicked">
                            <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="user">Quản lý người dùng</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/admin/categorylist" activeClassName="activeClicked">
                            <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="list">Quản lý danh mục</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/admin/productlist" activeClassName="activeClicked">
                            <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="box-open">Quản lý sản phẩm</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/admin/orderlist" activeClassName="activeClicked">
                            <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="cart-plus">Quản lý đơn hàng</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/admin/commentlist" activeClassName="activeClicked">
                            <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="comment">Quản lý bình luận</CDBSidebarMenuItem>
                        </NavLink>
                        {/* <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem className='mx-0 px-3' id='sidebaritem' icon="arrow-left">Thoát</CDBSidebarMenuItem>
                        </NavLink> */}
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div style={{ padding: '20px' }}>© 2022: TGLK</div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;