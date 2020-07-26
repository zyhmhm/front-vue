/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  name: 'Order',
  alwaysShow: true,
  meta: {
    title: 'billManagement',
    icon: 'table'
  },
  children: [
    {
      path: 'orderMaking',
      component: () => import('@/views/order/orderMaking'),
      name: 'OrderMaking',
      meta: { title: 'orderMaking',roles: ['editor'] }
    },
    {
      path: 'electronicOrder',
      component: () => import('@/views/order/electronicOrder'),
      name: 'ElectronicOrder',
      meta: { title: 'electronicOrder',roles: ['editor','admin'], }
    }
  ]
}
export default orderRouter
