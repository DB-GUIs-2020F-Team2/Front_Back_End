import { Home } from './components/home/home' 
import { Login } from './components/login/login' 
import { ManagerHome } from './components/manager/managerHome' 
//import { VendorHome } from './components/vendor_pages/vendor_home' 
import { VendorDashboard } from './components/vendor_pages/vendor_dash' 
import { Contractor } from './components/contractor/contractor'
import { OrderDetails } from './components/vendor_pages/order_details' 
import { OrderEditor } from './components/vendor_pages/order_editor' 
import { ProductEditor } from './components/vendor_pages/product_editor' 
import { Project } from './components/contractor/project'
import { Directory } from './components/contractor/directory'
import { Profile } from './components/contractor/profile'
import { Contracts } from './components/contractor/contracts'
import {Register} from './components/register/register' 
import { Products } from './components/vendor_pages/products'
import { DirectoryC } from './components/contractor/directoryC'
import {updateProject} from './components/contractor/updateProject'
import { DirectoryV } from './components/contractor/directoryV'

export const ROUTES = [
    { path: '/home', component: Home },
    { path: '/register', component: Register},
    { path: '/login', component: Login },
    { path: '/manager', component: ManagerHome },
    { path: '/vendor', component: VendorDashboard},
    { path: '/contractor', component: Contractor},
    { path: '/details/:orderId', component: OrderDetails },
    { path: '/edit/:orderId', component: OrderEditor },
    { path: '/editproduct/:productId', component: ProductEditor},
    { path: '/products', component: Products},
    { path: '/project', component: Project },
    { path: '/directory', component: Directory },
    { path: '/directoryC', component: DirectoryC},
    { path: '/directoryV', component: DirectoryV},
    { path: '/projectUpdate', component: updateProject },
    { path: '/profile', component: Profile },
    { path: '/contracts', component: Contracts },
    { path: '/', component: Home }
]