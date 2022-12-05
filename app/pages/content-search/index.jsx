import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'cross-fetch'

import {List, ListItem} from '@chakra-ui/react'
import Link from '../../components/link'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'

const ContentSearch = ({contentResult}) => {
    if (!contentResult) {
        return <div>Loading...</div>
    }

    const {hits = []} = contentResult

    return (
        <div>
            <h1>Search Results</h1>

            {hits.length ? (
                <List>
                    {hits.map(({id, name}) => (
                        <ListItem key={id}>
                            <Link to={`/content/${id}`}>{name}</Link>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <div>No Content Items Found!</div>
            )}
        </div>
    )
}

ContentSearch.getTemplateName = () => 'content-search'

ContentSearch.shouldGetProps = ({previousLocation, location}) => {
    return !previousLocation || previousLocation.pathname !== location.pathname
}

ContentSearch.getProps = async () => {
    let contentResult

    const res = await fetch(
        `${getAppOrigin()}/mobify/proxy/ocapi/s/RefArch/dw/shop/v22_10/content_search?q=about&client_id=2afe3131-876b-4933-89e0-6ae39d3323fc`
    )
    if (res.ok) {
        contentResult = await res.json()
    }
    if (process.env.NODE_ENV !== 'production') {
        console.log(contentResult)
    }

    return {contentResult}
}

ContentSearch.propTypes = {
    /**
     * The search result object showing the fetched content data
     */
    contentResult: PropTypes.object,
    /**
     * The content search hits
     */
    hits: PropTypes.array,
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool
}

export default ContentSearch
