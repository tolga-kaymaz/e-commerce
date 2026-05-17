import { useSelector } from "react-redux"
import { Route, Redirect } from "react-router-dom"

function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state.client.user)

  return (
    <Route
      {...rest}
      render={(props) =>
        user?.email ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default ProtectedRoute