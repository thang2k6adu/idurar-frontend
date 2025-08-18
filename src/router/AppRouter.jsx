import { useEffect } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import { useAppContext } from '~/context/appContext'

import routes from './routes'

export default function AppRouter() {
  let location = useLocation()
  const { appContextActions } = useAppContext()
  const { app } = appContextActions

  const routesList = []

  Object.entries(routes).forEach(([key, value]) => {
    routesList.push(...value)
  })

  function getAppNameByPath(path) {
    for (let key in routes) {
      for (let i = 0; i < routes[key].length; i++) {
        if (routes[key][i].path === path) {
          return key
        }
      }
    }

    return 'default'
  }

  // Hơi vô nghĩa, implement sau
  useEffect(() => {
    if (location.pathName === '/') {
      app.default()
    } else {
      const path = getAppNameByPath(location.pathName)
      app.open(path)
    }
  }, [location])

  // V6 use array instead of jsx
  let element = useRoutes(routesList)

  return element
}
