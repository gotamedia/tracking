const isClient = typeof document !== 'undefined' ? true : false

const getClientCookieValue = (cookieName: string) => {
    const cookie = document.cookie
        .split(';')
        .filter((cookieValue) => cookieValue.indexOf(cookieName) !== -1)[0]

    if (cookie) {
        return cookie.split('=')[1]
    }

    return undefined
}

const deleteClientCookie = (name: string, domain?: string, path?: string) => {
    const cookiePath = path || '/'

    const cookie = [
        `${name}=`,
        'expires=Thu, 01 Jan 1970 00:00:01 GMT',
        `path=${cookiePath}`
    ]

    if (domain) {
        cookie.push(`domain=${domain}`)
    }

    document.cookie = cookie.join(';')
}

export {
    isClient,
    getClientCookieValue,
    deleteClientCookie
}