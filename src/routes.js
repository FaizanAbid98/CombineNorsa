/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import NfcCard from "views/NfcCard";
import addNfcCard from "views/addNfcCard"
import Device from "views/Device";
import addDevice from "views/addDevice";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Groups from "views/Groups";
import addGroups from "views/addGroups";
import Register from "views/Register";
import addRegister from "views/addRegister";
import ClientForm from "views/ClientForm";
import IssuanceHistory from "views/IssuanceHistory";
import MerchantTypeList from "views/MerchantTypeList";
import MerchantList from "views/MerchantList";
import MerchantForm from "views/MerchantForm";
import MerchantTypeForm from "views/MerchantTypeForm";
import PendingPaymentList from "views/PendingPaymentList";
import IssuanceCardForm from "views/issuanceCardForm";

import ClientList from "views/ClientList.js";
import PendingPaymentForm from "views/PendingPaymentForm";
import PendingClientList from "views/PendingClientList";







const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  {
    path: "/nfccard",
    name: "NFC Card",
    icon: "nc-icon nc-credit-card",
    component: NfcCard,
    layout: "/admin",
  },
  {
    path: "/addnfccard",
    name: "NFC Card",
    icon: "nc-icon nc-credit-card",
    component: addNfcCard,
    layout: "/admin",
  },
  {
    path: "/device",
    name: "Device",
    icon: "nc-icon nc-mobile",
    component: Device,
    layout: "/admin",
  },
  {
    path: "/adddevice",
    name: "Device",
    icon: "nc-icon nc-mobile",
    component: addDevice,
    layout: "/admin",
  },
  // {
  //   path: "/groups",
  //   name: "Groups",
  //   icon: "nc-icon nc-circle-09",
  //   component: Groups,
  //   layout: "/admin",
  // },
  {
    path: "/addgroups",
    name: "Groups",
    icon: "nc-icon nc-mobile",
    component: addGroups,
    layout: "/admin",
  },
  {
    path: "/register",
    name: "Usuarionan",
    icon: "nc-icon nc-single-02",
    component: Register,
    layout: "/admin",
  },
  {
    path: "/addregister",
    name: "Registra Usuario",
    icon: "nc-icon nc-single-02",
    component: addRegister,
    layout: "/admin",
  },

  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },

  {
    path: "/ClientList",
    name: "Lista di Kliente",
    icon: "nc-icon nc-notes",
    component: ClientList,
    layout: "/admin",
  },
  {
    path: "/pendingClientList",
    name: "LISTA di Kliente (Pending)",
    icon: "nc-icon nc-notes",
    component: PendingClientList,
    layout: "/admin",
  },
  {
    path: "/ClientForm",
    name: "Agrega Kliente",
    icon: "nc-icon nc-circle-09",
    component: ClientForm,
    layout: "/admin",
  },

  {
    path: "/MerchantList",
    name: "Merchants",
    icon: "nc-icon nc-notes",
    component: MerchantList,
    layout: "/admin",
  },
  {
    path: "/MerchantForm",
    name: "Agrega Merchant",
    icon: "nc-icon nc-circle-09",
    component: MerchantForm,
    layout: "/admin",
  },

  {
    path: "/MerchantTypeList",
    name: "Merchant Types ",
    icon: "nc-icon nc-notes",
    component: MerchantTypeList,
    layout: "/admin",
  },

  {
    path: "/MerchantTypeForm",
    name: "Agrega Merchant Type",
    icon: "nc-icon nc-circle-09",
    component: MerchantTypeForm,
    layout: "/admin",
  },
  // {
  //   path: "/PendingPaymentForm",
  //   name: "Add Pending Pay",
  //   icon: "nc-icon nc-circle-09",
  //   component: PendingPaymentForm,
  //   layout: "/admin",
  // },
  {
    path: "/PendingPaymentList",
    name: "Pending Payments ",
    icon: "nc-icon nc-notes",
    component: PendingPaymentList,
    layout: "/admin",
  },

  {
    path: "/IssuanceHistory",
    name: "Issuance History",
    icon: "nc-icon nc-circle-09",
    component: IssuanceHistory,
    layout: "/admin",
  },
  {
    path: "/IssuanceCardForm",
    name: "Issue Card",
    icon: "nc-icon nc-circle-09",
    component: IssuanceCardForm,
    layout: "/admin",
  },
];

export default dashboardRoutes;
