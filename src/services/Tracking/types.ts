import type * as Constants from './constants'

export type EventObject = {
    [k: string]: any,
    event: Constants.GtmEventNames.BnTracking,
    trackingData: TrackingData[]
}

export type BaseTrackingProps = {
    cookies: Cookies,
    isLoggedIn: boolean | null,
    isSubscriber: boolean | null,
    system: {
        brand: string,
        brandCode: string,
        name: string,
        version: string,
        auth?: {
            name: string
        }
    }
    userId?: string,
    extendedEvent?: Record<string, any>,
    isProduction?: boolean,
    pushHandler?: (event: EventObject) => void
}

export type PageViewTrackingProps = {
    name: Constants.TrackingEventNames.PageView,
    content: {
        id: string,
        type: Constants.TrackingEventContentTypes,
        title: string,
        isLocked: boolean,
        userHasAccess: boolean,
        section: string[],
        system: {
            name: string
        }
    }
}

export type VideoTrackingProps = {
    name: Constants.TrackingEventNames.Video,
    content: {
        type: Constants.TrackingEventContentTypes,
        title: string
    },
    video: {
        id: string,
        playTime: string,
        title: string,
        system: {
            name: string
        },
        currentTime?: number,
        timePast?: number
    }
}

export type PaywallLoadedTrackingProps = {
    name: Constants.TrackingEventNames.PaywallLoaded,
    ecommerce: {
        campaign?: {
            id: string,
            name: string
        },
        product: {
            id: string,
            name: string,
            price: string
        }
    }
}

export type EcommerceReceiptTrackingProps = {
    name: Constants.TrackingEventNames.EcommerceReceipt,
    ecommerce: PaywallLoadedTrackingProps['ecommerce'] & {
        orderId: string,
        orderPrice: number,
        payment: {
            method: string,
            system: string
        }
    }
}

export type TrackingProps = BaseTrackingProps & (
    PageViewTrackingProps |
    VideoTrackingProps |
    PaywallLoadedTrackingProps |
    EcommerceReceiptTrackingProps
)

export type ParamsToAppend = {
    name: string,
    value: any
}[]

export type BaseTrackingData = {
    protocol_version: number,
    timestamp: string,
    page_view_id: string,
    event_name: Constants.TrackingEventNames,
    org: {
        business_unit: string,
        brand_line: string,
        brand: string,
        brand_code: string,
        sub_brand: string,
        service: string,
        market: string
    },
    data_source: string,
    browser: {
        user_agent: string,
        viewport: {
            width: number,
            height: number
        }
    },
    device: {
        category: string,
        os: {
            name: string | null,
            version: string | null
        },
        screen: {
            width: number,
            height: number
        }
    },
    environment: {
        is_production: boolean,
        platform: {
            name: string,
            version: string
        }
    },
    session_id: string,
    location: string,
    referrer: string | null,
    user: {
        id?: {
            value: string,
            system: string
        },
        client_id: string
        is_logged_in: boolean | null,
        is_subscriber: boolean | null
    }
}

export type TrackingData = BaseTrackingData & {
    content: {
        id?: {
            value: string | null,
            system: string
        },
        type: string,
        title: string,
        content_access_status?: string,
        user_has_access?: boolean,
        section?: string[]
    } | null,
    event_params?: {
        key: string,
        value: any
    }[]
}

export type TrackingEvent = {
    event: string,
    trackingData: TrackingData
    config: {
        env: string,
        scope: string
    }
}

export type Cookies = {
    clientId: string,
    sesstionId: string
}