//TODO implement
import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AuthContext } from '../Middleware/Auth'
import Loading from '../../views/Loading/Loading'

const PrivateRoute = ({ component: Component, ...otherProps }) => {

    const { isAuthenticated, isLoading } = useContext(AuthContext)

    return (
        <Route
            {...otherProps}
            render={props => (
                !isLoading
                    ?
                    (
                        isAuthenticated
                            ?
                            <Component {...props} />
                            :
                            <Redirect to={otherProps.redirectTo ? otherProps.redirectTo : '/signin'} />
                    )
                    :
                    <Loading />
            )}
        />
    )

}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired
}

export default PrivateRoute