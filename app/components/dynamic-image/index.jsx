/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {Img, Box, Badge, useTheme} from '@chakra-ui/react'
import {FormattedMessage} from 'react-intl'
import {getResponsiveImageAttributes} from '../../utils/responsive-image'

/**
 * Quickly create a responsive image using your dynamic image service
 * @example
 *  // Widths without a unit are interpreted as px values
 * <DynamicImage src="http://example.com/image.jpg[?sw={width}&q=60]" widths={[100, 360, 720]} />
 * <DynamicImage src="http://example.com/image.jpg[?sw={width}&q=60]" widths={{base: 100, sm: 360, md: 720}} />
 * // You can also use units of px or vw
 * <DynamicImage src="http://example.com/image.jpg[?sw={width}&q=60]" widths={['50vw', '100vw', '500px']} />
 */
const DynamicImage = ({src, widths, isSale, imageProps, as, ...rest}) => {
    const Component = as ? as : Img
    const theme = useTheme()

    const responsiveImageProps = useMemo(
        () => getResponsiveImageAttributes({src, widths, breakpoints: theme.breakpoints}),
        [src, widths, theme.breakpoints]
    )

    return (
        <Box {...rest}>
            {isSale && (
                <Badge
                    position="absolute"
                    top={0}
                    left={0}
                    marginLeft={2}
                    marginTop={2}
                    fontSize="10px"
                    variant="solid"
                    colorScheme="blue"
                >
                    <FormattedMessage
                        defaultMessage="Sale"
                        id="item_image.label.sale"
                        description="A sale badge placed on top of a product image"
                    />
                </Badge>
            )}

            <Component {...responsiveImageProps} {...imageProps} />
        </Box>
    )
}

DynamicImage.propTypes = {
    /**
     * Dynamic src having an optional param that can vary with widths. For example: `image[_{width}].jpg` or `image.jpg[?sw={width}&q=60]`
     */
    src: PropTypes.string,
    /*
     * Flags if the represented product is on sale
     */
    isSale: PropTypes.bool,
    /**
     * Image widths relative to the breakpoints, whose units can either be px or vw or unit-less. They will be mapped to the corresponding `sizes` and `srcSet`.
     */
    widths: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    /**
     * Props to pass to the inner image component
     */
    imageProps: PropTypes.object,
    /**
     * Override with your chosen image component
     */
    as: PropTypes.elementType
}

export default DynamicImage
