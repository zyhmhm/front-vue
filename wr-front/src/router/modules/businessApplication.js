/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const businessApplicationRouter = {
  path: '/businessApplication',
  component: Layout,
  // redirect: '/businessApplication/shipper-appointment',
  name: 'businessApplication',
  meta: {
    title: 'businessApplication',
    icon: 'appointment',
    // roles: ['editor']
  },
  children: [
    {
      path: 'shipper-appointment',
      component: () => import('@/views/businessApplication/shipper-appointment'),
      name: 'ShipperAppointment',
      meta: { title: 'shipperAppointment', roles: ['editor'] }
    },
    {
      path: 'shipper-orderMaking',
      component: () => import('@/views/businessApplication/shipper-orderMaking'),
      name: 'ShipperOrderMaking',
      meta: { title: 'shipperOrderMaking', roles: ['editor'] }
    },
    {
      path: 'shipper-cash',
      component: () => import('@/views/businessApplication/shipper-cash'),
      name: 'ShipperCash',
      meta: { title: 'shipperCash', roles: ['editor'] }
    },
    {
      path: 'shipper-pledge',
      component: () => import('@/views/businessApplication/shipper-pledge'),
      name: 'ShipperPledge',
      meta: { title: 'shipperPledge', roles: ['editor'] }
    },
    {
      path: 'shipper-transfer',
      component: () => import('@/views/businessApplication/shipper-transfer'),
      name: 'ShipperTransfer',
      meta: { title: 'shipperTransfer', roles: ['editor'] }
    },
    {
      path: 'shipper-escort',
      component: () => import('@/views/businessApplication/shipper-escort'),
      name: 'ShipperEscort',
      meta: { title: '解压申请', roles: ['editor'] }
    },
    {
      path: 'orderMaking-detaile',
      component: () => import('@/views/guide/ordermaking-detaile'),
      name: 'OrderMakingDetaile',
      hidden: true,
      meta: { title: 'orderMakingDetaile', roles: ['admin','editor'] }
    },
    {
      path: 'orderMaking',
      component: () => import('@/views/guide/ordermaking'),
      name: 'OrderMaking',
      hidden: true,
      meta: { title: '制单', roles: ['admin']}
    },
	{
	  path: 'electronicwarehouse',
	  component: () => import('@/views/guide/electronicwarehouse'),
	  name: 'ElectronicWarehouseDao',
	  hidden: true,
	  meta: { title: '仓单详情', roles: ['admin','editor']  }
	}
  ]
}
export default businessApplicationRouter
