import React from "react"
import Helmet from 'react-helmet';
import {graphql, Link} from 'gatsby'
import Layout from "../components/layout"
import PostLink from "../components/post-link"
import instagram from "../images/instagram2.png";
import telegram from "../images/telegram.png";
import pinterest from "../images/pinterest.svg";

const IndexPage = ({
                       data: {
                           site,
                           allMarkdownRemark: {edges},
                           allFile
                       },
                   }) => {
    let siteUrl = site.siteMetadata.siteUrl
    let PostsInvest = edges
        .filter(edge => edge.node.frontmatter.category === 'invest')
        .sort((a, b) => (new Date(b.node.frontmatter.date)) - new Date((a.node.frontmatter.date)))

    let i = 0
    PostsInvest = PostsInvest.map(edge => {
        i++
        if (i < 7) {
            let file = allFile.edges.filter(item => item.node.absolutePath.indexOf(edge.node.frontmatter.thumbnail) !== -1)
            if (file[0] && file[0].node && file[0].node.publicURL) {
                edge.node.frontmatter.thumbnail = file[0].node.publicURL
            }
            return <PostLink key={edge.node.id} post={edge.node}/>;
        }
        return null;
    })

    i = 0
    let PostsIncome = edges
        .filter(edge => edge.node.frontmatter.category === 'invest')
        .sort((a, b) => (new Date(b.node.frontmatter.date)) - new Date((a.node.frontmatter.date)))

    PostsIncome = PostsIncome.map(edge => {
        i++
        if (i < 7) {
            let file = allFile.edges.filter(item => item.node.absolutePath.indexOf(edge.node.frontmatter.thumbnail) !== -1)
            if (file[0] && file[0].node && file[0].node.publicURL) {
                edge.node.frontmatter.thumbnail = file[0].node.publicURL
            }
            return <PostLink key={edge.node.id} post={edge.node}/>;
        }
        return null;
    })
    const instagram_link = site.siteMetadata.link.instagram
    const pinterest_link = site.siteMetadata.link.pinterest
    const telegram_link = site.siteMetadata.link.telegram

    return (
        <Layout>
            <Helmet>
                <title>Девочка с пучком</title>
                <meta name="description" content=""/>
                <meta name="keywords" content=""/>
                <meta property="og:url" content={siteUrl}/>
                <meta property="og:type" content="website"/>
                <meta property="og:image" content=""/>
                <meta property="og:image:width" content=""/>
                <meta property="og:image:height" content=""/>
                <meta property="og:site_name" content={site.siteMetadata.site_name}/>
                <link rel="canonical" href={siteUrl}/>
                <meta property="og:title" content=""/>
                <meta property="og:description" content=""/>
                <meta name="yandex-verification" content=""/>
            </Helmet>
            <section className="top">
                <div className="container block_dop">
                    <h1>Девочка с пучком</h1>
                    <h3>Обо всём и ни о чём</h3>
                    <a href={telegram_link} className="subscribe d-none d-md-inline-block">Подпишись</a>
                    <div className="social d-flex d-md-none align-items-center">
                        <a href={instagram_link}>
                            <img src={instagram} alt="instagram"/>
                        </a>
                        <a href={telegram_link}>
                            <img src={telegram} alt="telegram"/>
                        </a>
                        <a href={pinterest_link}>
                            <img src={pinterest} alt="pinterest"/>
                        </a>
                    </div>
                </div>
            </section>
            <section className="content container">
                {PostsInvest.length !== 0 &&
                    <div>
                        <h2 className="title-text">НОВЫЕ СТАТЬИ</h2>
                        <div className="grids">
                            {PostsInvest}
                        </div>
                    </div>}
                <br/>
                {PostsIncome.length !== 0 &&
                    <div>
                        <div className="grids">
                            {PostsIncome}
                        </div>
                    </div>
                }
            </section>
        </Layout>
    )
}

export default IndexPage
export const pageQuery = graphql`
    query indexPageQuery ($img: String, $dir: String)
    {
        site
        {
            siteMetadata
            {
                title
                siteUrl
                site_name
                image_width
                image_height
                link {
                    pinterest
                    instagram
                    telegram
                }
            }
        }
        allMarkdownRemark(
            sort: { order: DESC, fields:[frontmatter___date]}
        )
        {
            edges
            {
                node
                {
                    id
                    excerpt(pruneLength:250)
                    frontmatter
                    {
                        date(formatString:"MMMM DD, YYYY")
                        path
                        title
                        thumbnail
                        category
                    }
                }
            }
        }
        allFile(filter: {dir: {regex: $dir}, name: {eq: $img}}) {
            edges {
                node {
                    publicURL
                    absolutePath
                }
            }
        }
    }
`
