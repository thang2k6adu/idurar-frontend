import { Link, useLocation, useNavigate } from "react-router-dom"

import useResponsive from "~/hooks/useResponsive"

export default function Navigation() {
  const { isMobile} = useResponsive()
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation()

}