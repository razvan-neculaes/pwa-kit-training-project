import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

/* import {pluckIds} from '../../utils/utils' */
import {Tooltip, Spinner, Text} from '@chakra-ui/react'
import {useCommerceAPI} from '../../commerce-api/contexts'

const ProductDetails = ({product}) => {
    const api = useCommerceAPI()
    const [promotionMap, setPromotionMap] = useState({})
    const {productPromotions} = product

    const handleHover = (id) => {
        // Don't make a network request if you already loaded this data.
        if (promotionMap[id]) {
            return
        }

        const getPromotion = async (id) => {
            const promotions = await api.shopperPromotions.getPromotions({
                parameters: {ids: id}
            })
            setPromotionMap({...promotionMap, [id]: promotions.data[0]})
        }

        getPromotion(id)
    }
    return (
        <div className="t-product-simple" itemScope itemType="http://schema.org/">
            <Text>This is the product: {product.name}</Text>

            {product && (
                <Helmet>
                    <title>{product.name}</title>
                    <meta name="description" content={product.name} />
                </Helmet>
            )}

            <Text>These are the promotions (if any):</Text>
            {productPromotions &&
                productPromotions.map(({promotionId, calloutMsg}) => (
                    <Tooltip
                        onOpen={() => {
                            handleHover(promotionId)
                        }}
                        key={promotionId}
                        label={
                            (promotionMap[promotionId] && promotionMap[promotionId].details) || (
                                <Spinner />
                            )
                        }
                        aria-label="Promotion details"
                    >
                        <Text>{calloutMsg}</Text>
                    </Tooltip>
                ))}
        </div>
    )
}

ProductDetails.getTemplateName = () => 'product-simple'

ProductDetails.shouldGetProps = async ({previousParams, params}) => {
    return !previousParams || previousParams.productId !== params.productId
}

ProductDetails.getProps = async ({params, api}) => {
    // api: an instance of the CommerceAPI
    await api.auth.login()

    const product = await api.shopperProducts.getProduct({
        parameters: {id: params.productId, allImages: true}
    })

    /* Get the promotions for the product 
     * const promotionIds = pluckIds(product.productPromotions, 'promotionId')
     * const promotions = await api.shopperPromotions.getPromotions({
     *  parameters: {ids: promotionIds}
    })*/

    return {
        /* promotions: promotions.data, */
        product: product
    }
}

ProductDetails.propTypes = {
    /* promotions: PropTypes.array, */
    product: PropTypes.object,
    errorMessage: PropTypes.string,
    params: PropTypes.object,
    trackPageLoad: PropTypes.func
}

export default ProductDetails
