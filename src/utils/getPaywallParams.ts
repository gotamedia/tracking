import type * as Types from "../services/Tracking/types"

const getPaywallParams = (props: Types.PaywallLoadedTrackingProps) => {
    const {
        campaign,
        product
    } = props.ecommerce

    const paramsToAppend: Types.ParamsToAppend = []

    const ecommercePayload: any = { currency: 'sek' }

    if (campaign) {
        ecommercePayload.campaign = campaign
    }

    ecommercePayload.products = [
        {
            ...product,
            market: 'se',
            quantity: 1
        }
    ]

    paramsToAppend.push({
        name: "ecommerce",
        value: ecommercePayload
    })

    return paramsToAppend
}

export default getPaywallParams
