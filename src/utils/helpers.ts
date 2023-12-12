import {
    serialize as serializeCookie,
    type CookieSerializeOptions
} from 'cookie'

const isClient = typeof document !== 'undefined' ? true : false

const getCookieValue = (cookieName: string) => {
    const cookie = document.cookie
        .split(';')
        .filter((cookieValue) => cookieValue.indexOf(cookieName) !== -1)[0]

    if (cookie) {
        return cookie.split('=')[1]
    }

    return undefined
}

const _supportsSameSiteCookie = (userAgent: string) => {
    let supports = true

    if (userAgent.includes('Safari')) {
        const match = userAgent.match(/Version\/(\d{0,}.\d{0,})/)

        if (match) {
            supports = match[1] > `${12}`
        }
    }

    if (userAgent.includes('Chrome') || userAgent.includes('Chromium')) {
        const pattern = /Chrom[^ /]+\/(\d+)[.\d]*/
        const matches = pattern.exec(userAgent)

        if (matches && matches?.length > 1) {
            const majorVersion = parseInt(matches[1], 10) || 80

            if (majorVersion >= 51 && majorVersion <= 66) {
                supports = false
            }
        }
    }

    return supports
}

const _getCookieSetOptions = (params: {
    path: string,
    days?: number,
    secure?: boolean
}) => {
    const {
        path,
        days,
        secure
    } = params

    let maxAge

    if (typeof days === "number") {
        if (days <= 0) {
            maxAge = 0
        } else {
            const date: Date = new Date()
            const endDate: Date = new Date()

            endDate.setDate(endDate.getDate() + days)

            // @ts-ignore
            maxAge = (endDate - date) / 1000
        }
    }

    const optoins: CookieSerializeOptions = {
        path: path,
        secure: secure,
        maxAge: maxAge
    }

    if (_supportsSameSiteCookie(window.navigator.userAgent)) {
        optoins.sameSite = 'lax'
    }

    return optoins
}

const setCookieValue = (params: {
    name: string,
    value: string,
    secure?: boolean
    days?: number
}) => {
    const {
        name,
        value,
        secure,
        days
    } = params

    const cookie = serializeCookie(
        name,
        value,
        _getCookieSetOptions({
            path: '/',
            secure: !!secure,
            days: days
        })
    )

    document.cookie = cookie

    return cookie
}

export {
    isClient,
    getCookieValue,
    setCookieValue
}