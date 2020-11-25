import { Home } from './components/home/home' 
import { Login } from './components/login/login' 
import { ManagerHome } from './components/manager/managerHome' 
import { VendorDashboard } from './components/vendor_pages/vendor_dash' 
import { OrderDetails } from './components/vendor_pages/order_details' 
import { OrderEditor } from './components/vendor_pages/order_editor' 
import {Register} from './components/register/register' 

export const ROUTES = [
    { path: '/home', component: Home },
    {path: '/register', component: Register},
    { path: '/login', component: Login },
    { path: '/manager', component: ManagerHome },
    { path: '/vendordash', component: VendorDashboard},
    { path: '/details/:orderId', component: OrderDetails },
    { path: '/edit/:orderId', component: OrderEditor },
    { path: '/', component: Home }
]