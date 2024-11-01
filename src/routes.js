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
  MdDone,
  MdList,
  MdFireTruck,
  MdShoppingBag,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';

// Auth Imports
import SignInCentered from 'views/auth';
import NewOrders from 'views/yetkaziberuvchi/NewOrders';
import Balance from 'views/yetkaziberuvchi/Balance';
import Delevered from 'views/yetkaziberuvchi/Delevered';
import Completed from 'views/yetkaziberuvchi/Completed';
import Payment from 'views/yetkaziberuvchi/Payment';
import InChecking from 'views/yetkaziberuvchi/InChecking';

//ceo Imports
import CEONewOrders from 'views/ceo/NewOrders';
import CEODelevered from 'views/ceo/Delevered';
import CEOCompleted from 'views/ceo/Completed';
import CEOChecking from 'views/ceo/Checking';

// finance imports
import FinanceNewOrders from 'views/finances/NewOrders';
import FinanceDelevered from 'views/finances/Delevered';
import FinanceCompleted from 'views/finances/Completed';
import FinanceChecking from 'views/finances/Checking';
import FinancePassed from 'views/finances/Passed';
import FinanceShipped from 'views/finances/Shipped';

// React Imports
import { IoCheckbox, IoList } from 'react-icons/io5';
import { RiBox1Fill } from 'react-icons/ri';
import { CheckIcon } from '@chakra-ui/icons';

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
      category: 'Sotuvlar',
      name: 'Sotuvlar',
      items: [
        {
          name: 'Yangi buyurtmalar',
          layout: '/yetkaziberuvchi',
          path: '/new-orders',
          icon: <Icon as={IoList} width="20px" height="20px" color="inherit" />,
          component: <NewOrders />,
        },
        {
          name: 'Yetkazib berilganlar',
          layout: '/yetkaziberuvchi',
          path: '/delevered',
          icon: (
            <Icon as={RiBox1Fill} width="20px" height="20px" color="inherit" />
          ),
          component: <Delevered />,
        },
        {
          name: 'Tekshiruvdagilar',
          layout: '/yetkaziberuvchi',
          path: '/checking',
          icon: (
            <Icon as={IoCheckbox} width="20px" height="20px" color="inherit" />
          ),
          component: <InChecking />,
        },
        {
          name: 'Sotuv yakunlanganlar',
          layout: '/yetkaziberuvchi',
          path: '/completed',
          icon: (
            <Icon as={CheckIcon} width="20px" height="20px" color="inherit" />
          ),
          component: <Completed />,
        },
      ],
    },

    {
      category: "To'lovlar",
      name: "To'lovlar",
      items: [
        {
          name: 'Balans',
          layout: '/yetkaziberuvchi',
          path: '/balance',
          icon: (
            <Icon as={MdMoney} width="20px" height="20px" color="inherit" />
          ),
          component: <Balance />,
        },
        {
          name: 'Payment',
          layout: '/yetkaziberuvchi',
          path: '/payment',
          icon: (
            <Icon as={MdPayment} width="20px" height="20px" color="inherit" />
          ),
          component: <Payment />,
        },
      ],
    },
  ],
  CEO: [
    {
      category: 'Zakupka',
      name: 'Sotib olish',
      items: [
        {
          name: 'Orders',
          layout: '/ceo',
          path: '/orders',
          icon: (
            <Icon as={MdMoney} width="20px" height="20px" color="inherit" />
          ),
          component: <CEONewOrders />,
        },
        {
          name: 'Delevered',
          layout: '/ceo',
          path: '/delevered',
          icon: (
            <Icon as={MdFireTruck} width="20px" height="20px" color="inherit" />
          ),
          component: <CEODelevered />,
        },
        {
          name: 'Checking',
          layout: '/ceo',
          path: '/checking',
          icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
          component: <CEOChecking />,
        },
        {
          name: 'Completed orders',
          layout: '/ceo',
          path: '/completed',
          icon: <Icon as={MdDone} width="20px" height="20px" color="inherit" />,
          component: <CEOCompleted />,
        },
      ],
    },
  ],
  MOLIYA: [
    {
      category: 'Zakupka',
      name: 'Sotib olish',
      items: [
        {
          name: 'Zakaz na zakupku',
          layout: '/moliya',
          path: '/orders',
          icon: (
            <Icon as={MdMoney} width="20px" height="20px" color="inherit" />
          ),
          component: <FinanceNewOrders />,
        },
        {
          name: 'Delevered',
          layout: '/moliya',
          path: '/delevered',
          icon: (
            <Icon as={MdFireTruck} width="20px" height="20px" color="inherit" />
          ),
          component: <FinanceDelevered />,
        },
        {
          name: 'Checking in labaratory',
          layout: '/moliya',
          path: '/checking',
          icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
          component: <FinanceChecking />,
        },
        {
          name: 'Proshel proverku',
          layout: '/moliya',
          path: '/passed',
          icon: <Icon as={MdDone} width="20px" height="20px" color="inherit" />,
          component: <FinancePassed />,
        },
        {
          name: 'Otgrujeno',
          layout: '/moliya',
          path: '/shipped',
          icon: (
            <Icon
              as={MdShoppingBag}
              width="20px"
              height="20px"
              color="inherit"
            />
          ),
          component: <FinanceShipped />,
        },
        {
          name: 'Zavershenie pokupki',
          layout: '/moliya',
          path: '/completed',
          icon: <Icon as={MdDone} width="20px" height="20px" color="inherit" />,
          component: <FinanceCompleted />,
        },
      ],
    },
  ],

  GOST: [],
};

export default routesConfig;
