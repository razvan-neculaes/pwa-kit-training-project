/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import object from 'lodash/object'

/**
 * Customize the Product Search Results data in order to include additional information
 *
 * @returns {{hits: array<object>}}
 */
export const useProductSearchResults = async (api, productSearchResult) => {
    const productSearchMerge = productSearchResult.hits.map(async (productSearchItem) => {
        let representedProduct = await api.shopperProducts.getProduct({
            parameters: {id: productSearchItem?.representedProduct?.id, allImages: false}
        })
        let c_isSale = !!representedProduct?.c_isSale
        let representedProductData = {c_isSale, ...productSearchItem.representedProduct}
        object.set(productSearchItem, 'representedProduct', representedProductData)

        return productSearchItem
    })

    return {hits: await Promise.all(productSearchMerge)}
}
