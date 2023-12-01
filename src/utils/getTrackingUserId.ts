import { getClientCookieValue } from './helpers'

import type { Cookies } from '../services/Tracking/types'

const getTrackingUserId = (cookies: Cookies, userId?: string) => {
    return (
        userId ||
        getClientCookieValue(cookies.clientId)!
    )
}

export default getTrackingUserId
