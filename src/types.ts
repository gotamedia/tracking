export type SendRequestUtil = (input: RequestInfo | URL, init?: RequestInit, isDebugMode?: boolean) => void

export type TrackingUtils = {
    sendRequest: SendRequestUtil
}