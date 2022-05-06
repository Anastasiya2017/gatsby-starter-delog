module.exports = {
    /* Your site config here */
    siteMetadata: require("./site-meta-data.json"),
    plugins: [
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [{
                    resolve: `gatsby-remark-prismjs`,
                    options: {
                        classPrefix: "language-",
                        inlineCodeMarker: null,
                        aliases: {},
                        showLineNumbers: false,
                        noInlineHighlight: false,
                    },
                },
                    {
                        resolve: 'gatsby-remark-emojis',
                    }
                ],
            },
        },
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                // !!! указываем свой id из GTM
                id: "GTM-W36DCX6",
                defaultDataLayer: function () {
                    return {
                        pageType: window.pageType,
                    }
                },
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                // !!! указываем свой id
                // trackingId: "G-0R2LKEPBDZ",
                trackingId: "UA-163015003-2",
                head: false,
                anonymize: true,
                respectDNT: true,
            }
        },
        {
            resolve: `gatsby-plugin-yandex-metrika`,
            options: {
                // !!! указываем id из яндекс метрики
                trackingId: 69609064,
                webvisor: true,
                trackHash: true,
                afterBody: true,
                defer: false,
                useCDN: true,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `PYROMID`,
                short_name: `PYROMID`,
                start_url: `/`,
                background_color: `#fff`,
                theme_color: `#381696`,
                display: `standalone`,
                icon: "src/images/favicon_t.svg",
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-remark-images`,
        `gatsby-transformer-sharp`,
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `markdown-pages`,
                path: `${__dirname}/_data`,
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`, `.md`],
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1200,
                        },
                    },
                ],
            },
        },
        `gatsby-image`,
        `gatsby-plugin-fontawesome-css`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-netlify-cms`,
        // 'gatsby-plugin-dark-mode',
        // siteURL is a must for sitemap generation
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-offline`,
    ],
}