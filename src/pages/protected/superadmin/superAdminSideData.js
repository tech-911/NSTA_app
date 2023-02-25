import { GoDashboard } from "react-icons/go";
import { MdAddModerator, MdPayments } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
export const superAdminSideData = [
  {
    id: 0,
    name: "Dashboard",
    icon: <GoDashboard className="icon0" />,
    link: "/superadmin/dashboard",
  },
  {
    id: 1,
    name: "CreateAdmin",
    icon: <MdAddModerator className="icon0" />,
    link: "/superadmin/createadmin",
  },
  {
    id: 2,
    name: "Payments",
    icon: <MdPayments className="icon2" />,
    link: "/superadmin/history",
  },
  {
    id: 3,
    name: "Settings",
    icon: <FiSettings className="icon3" />,
    link: "/superadmin/settings",
  },
];
