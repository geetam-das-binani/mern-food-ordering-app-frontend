import { Fragment } from 'react/jsx-runtime'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useAuth0 } from '@auth0/auth0-react'

const MobileNavLinks = () => {
    const { logout } = useAuth0();
    return (
        <Fragment>
            <Link to={"/user-profile"} className='flex items-center font-bold bg-white hover:text-orange-500'>
                User Profile
            </Link>
            <Link to={"/manage-restaurant"} className='flex items-center font-bold bg-white hover:text-orange-500'>
               Manage Restaurant
            </Link>
            <Link to={"/order-status"} className='flex items-center font-bold bg-white hover:text-orange-500'>
                Order Status
         
            </Link>
            <Button onClick={() => logout({
                logoutParams: {
                    returnTo:
                        import.meta.env.VITE_AUTH0_CALLBACK_URL
                }
            })} className='flex items-center px-3 font-bold hover:bg-gray-500'>Log Out</Button>
        </Fragment>
    )
}

export default MobileNavLinks
