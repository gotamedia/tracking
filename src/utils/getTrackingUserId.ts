import { getCookieValue } from './helpers'

import type { Cookies } from '../services/Tracking/types'

const getTrackingUserId = (cookies: Cookies, userId?: string) => {
    return (
        userId ||
        getCookieValue(cookies.clientId)!
    )
}

export default getTrackingUserId
