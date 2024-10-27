import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdMoney,
  MdPayment,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import NewOrders from 'views/yetkaziberuvchi/NewOrders';
import Balance from 'views/yetkaziberuvchi/Balance';
import Delevered from 'views/yetkaziberuvchi/Delevered';
import Checking from 'views/yetkaziberuvchi/Checking';
import Completed from 'views/yetkaziberuvchi/Completed';
import Payment from 'views/yetkaziberuvchi/Payment';
import { IoCheckbox, IoList } from 'react-icons/io5';
import { RiBox1Fill } from 'react-icons/ri';
import { CheckIcon } from '@chakra-ui/icons';

const role = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')).data.employee.jobTitle
  : 'YETKAZIBERUVCHI';

const routesConfig = {
  TAMINOT: [
    {
      name: 'Main Dashboard',
      layout: '/admin',
      path: '/default',
      icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
      component: <MainDashboard />,
    },
    {
      name: 'NFT Marketplace',
      layout: '/admin',
      path: '/nft-marketplace',
      icon: (
        <Icon
          as={MdOutlineShoppingCart}
          width="20px"
          height="20px"
          color="inherit"
        />
      ),
      component: <NFTMarketplace />,
      secondary: true,
    },
    {
      name: 'Data Tables',
      layout: '/admin',
      icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      path: '/data-tables',
      component: <DataTables />,
    },
    {
      name: 'Profile',
      layout: '/admin',
      path: '/profile',
      icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
      component: <Profile />,
    },
    {
      name: 'Sign In',
      layout: '/auth',
      path: '/sign-in',
      icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
      component: <SignInCentered />,
    },
  ],
  YETKAZIBERUVCHI: [
    {
      name: 'New Orders',
      layout: '/yetkaziberuvchi',
      path: '/new-orders',
      icon: <Icon as={IoList} width="20px" height="20px" color="inherit" />,
      component: <NewOrders />,
    },
    {
      name: 'Delevered',
      layout: '/yetkaziberuvchi',
      path: '/delevered',
      icon: <Icon as={RiBox1Fill} width="20px" height="20px" color="inherit" />,
      component: <Delevered />,
    },
    {
      name: 'Checking',
      layout: '/yetkaziberuvchi',
      path: '/checking',
      icon: <Icon as={IoCheckbox} width="20px" height="20px" color="inherit" />,
      component: <Checking />,
    },
    {
      name: 'Completed',
      layout: '/yetkaziberuvchi',
      path: '/completed',
      icon: <Icon as={CheckIcon} width="20px" height="20px" color="inherit" />,
      component: <Completed />,
    },
    {
      name: 'Balance',
      layout: '/yetkaziberuvchi',
      path: '/balance',
      icon: <Icon as={MdMoney} width="20px" height="20px" color="inherit" />,
      component: <Balance />,
    },
    {
      name: 'Payment',
      layout: '/yetkaziberuvchi',
      path: '/payment',
      icon: <Icon as={MdPayment} width="20px" height="20px" color="inherit" />,
      component: <Payment />,
    },
  ],
};

const routes = routesConfig[role];
// routes.push({
//   name: 'Sign In',
//   layout: '/auth',
//   path: '/sign-in',
//   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
//   component: <SignInCentered />,
// });

export default routes;
