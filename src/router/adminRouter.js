import { createRouter, createWebHistory } from 'vue-router'
import Accounting from '@/pages/Accounting.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Membership from '../pages/Membership/pinjaman/index.vue'
import PinjamanView from '@/pages/Membership/pinjaman/PinjamanView.vue'
import CreateSettlement from '@/pages/Membership/pinjaman/CreateSettlement.vue'
import MemberMasterData from '@/pages/Membership/master_data/MemberMasterData.vue'
import SimpananView from '@/pages/Membership/simpanan/SimpananView.vue'
import JournalView from '@/pages/Accounting/JournalView.vue'
import PayableView from '@/pages/Accounting/PayableView.vue'
import PayableDetailView from '@/pages/Accounting/PayableDetailView.vue'
import ReceivableView from '@/pages/Accounting/ReceivableView.vue'
import FixedAsset from '@/pages/Accounting/FixedAsset.vue'
import BookModel from '@/pages/Accounting/BookModel.vue'
import GeneralSettings from '@/pages/Settings/GeneralSettings.vue'

const adminRoutes = [
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/accounting', component: Accounting, meta: { requiresAuth: true } },
  { path: '/accounting/journal-entry', component: JournalView, meta: { requiresAuth: true } },
  { path: '/accounting/book-model', component: BookModel, meta: { requiresAuth: true } },
  { path: '/accounting/payable', name: 'Payable', component: PayableView, meta: { requiresAuth: true } },
  {
    path: '/accounting/payable/:recId',
    name: 'PayableDetail',
    component: PayableDetailView,
    meta: { requiresAuth: true },
  },
  { path: '/accounting/receivable', component: ReceivableView, meta: { requiresAuth: true } },
  { path: '/accounting/fixed-asset', component: FixedAsset, meta: { requiresAuth: true } },
  { path: '/membership', component: Membership, meta: { requiresAuth: true } },
  //{ path: '/', redirect: '/login' },
  { path: '/membership', component: Membership, meta: { requiresAuth: true } },
  {
    path: '/membership/member-master-data',
    component: MemberMasterData,
    meta: { requiresAuth: true },
  },
  { path: '/membership/simpanan', component: SimpananView, meta: { requiresAuth: true } },
  { path: '/membership/pinjaman', component: PinjamanView, meta: { requiresAuth: true } },
  {
    path: '/membership/settlement/create',
    component: CreateSettlement,
    meta: { requiresAuth: true },
  },
  { path: '/settings', redirect: '/settings/currency' },
  {
    path: '/settings/:section',
    component: GeneralSettings,
    meta: { requiresAuth: true },
  },
]

const adminRouter = createRouter({
  history: createWebHistory(),
  routes: adminRoutes,
})

export default adminRouter
