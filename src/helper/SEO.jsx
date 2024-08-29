import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
    title,
    description,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogUrl,
    ogImage,
    ogImageWidth,
    ogImageHeight,
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterSite,
    twitterCreator,
    favicon = "https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="author" content="Organic Nation" />
            <link rel="canonical" href={canonicalUrl} />

            {/* OG Tags */}
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={ogDescription} />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Organic Nation" />
            <meta property="og:locale" content="India" />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content={ogImageWidth} />
            <meta property="og:image:height" content={ogImageHeight} />

            {/* Twitter Tags */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={twitterTitle} />
            <meta name="twitter:description" content={twitterDescription} />
            <meta name="twitter:image" content={twitterImage} />
            <meta name="twitter:site" content={twitterSite} />
            <meta name="twitter:creator" content={twitterCreator} />

            {/* Other tags */}
            <link rel="icon" type="image/svg+xml" href={favicon} />
            <meta name="robots" content="max-image-preview:standard" />

        </Helmet>
    );
};

export default SEO;