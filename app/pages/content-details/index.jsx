import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'cross-fetch'

// Components
import {Alert, AlertIcon, Box} from '@chakra-ui/react'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'

const ContentDetails = ({contentResult, error}) => {
    if (error) {
        return (
            <Box>
                <Alert padding="5" status="error">
                    <AlertIcon />
                    {error.fault.message}
                </Alert>
            </Box>
        )
    }
    if (!contentResult) {
        return <div>Loading...</div>
    }

    return <div dangerouslySetInnerHTML={{__html: contentResult.c_body}} />
}

ContentDetails.getTemplateName = () => 'content-details'

ContentDetails.shouldGetProps = ({previousLocation, location}) => {
    return !previousLocation || previousLocation.pathname !== location.pathname
}

ContentDetails.getProps = async ({params, res}) => {
    let id = params.id
    let contentResult
    let error

    const result = await fetch(
        `${getAppOrigin()}/mobify/proxy/ocapi/s/RefArch/dw/shop/v22_10/content/${id}?client_id=2afe3131-876b-4933-89e0-6ae39d3323fc`
    )

    if (result.ok) {
        contentResult = await result.json()
    } else {
        error = await result.json()
        if (res) {
            res.status(result.status)
        }
    }
    if (process.env.NODE_ENV !== 'production') {
        console.log(contentResult)
    }

    return {contentResult, error}
}

ContentDetails.propTypes = {
    /**
     * The fetched content details by id
     */
    contentResult: PropTypes.object,
    error: PropTypes.object,
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool
}

export default ContentDetails
