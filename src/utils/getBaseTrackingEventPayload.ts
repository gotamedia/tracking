/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as createUUID } from 'uuid'
import * as DeviceDetect from 'react-device-detect'

import { getClientCookieValue } from './helpers'

import getTrackingUserId from './getTrackingUserId'

import type * as Constants from '../services/Tracking/constants'
import type * as Types from '../services/Tracking/types'

const getBaseTrackingEventPayload = (name: Constants.TrackingEventNames, props: Types.TrackingProps): Types.BaseTrackingData => {
    const {
        userId,
        isProduction,
        cookies,
        isLoggedIn,
        isSubscriber,
        system
    } = props

    return {
        protocol_version: 1,
        timestamp: new Date().toISOString(),
        page_view_id: createUUID(),
        event_name: name,
        org: {
            business_unit: 'Gota Media AB',
            brand_line: system.brand,
            brand: system.brand,
            brand_code: system.brandCode,
            sub_brand: system.brand,
            service: 'main content',
            market: 'se'
        },
        data_source: 'web',
        browser: {
            user_agent: window.navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        },
        device: {
            category: DeviceDetect.isMobileOnly ? (
                'mobile'
            ) : (
                DeviceDetect.isTablet ? (
                    'tablet'
                ) : (
                    'desktop'
                )
            ),
            os: {
                name: DeviceDetect.osName,
                version: DeviceDetect.osVersion
            },
            screen: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        },
        environment: {
            is_production: !!isProduction,
            platform: {
                name: system.name,
                version: system.version
            }
        },
        session_id: getClientCookieValue(cookies.sesstionId)!,
        location: window.location.toString(),
        referrer: window.document.referrer || null,
        user: {
            id: system.auth ? {
                value: getTrackingUserId(cookies, userId),
                system: system.auth.name
            } : undefined,
            is_logged_in: isLoggedIn,
            is_subscriber: isSubscriber,
            client_id: getClientCookieValue(cookies.clientId)!
        }
    }
}

export default getBaseTrackingEventPayload
