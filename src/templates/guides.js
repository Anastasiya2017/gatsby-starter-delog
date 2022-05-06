import React from "react"
import Helmet from "react-helmet"
import {graphql, Link} from 'gatsby'
import Layout from "../components/layout"
import PostLink from "../components/post-link";
import Pagination from "../components/Pagination";
// import Img from "../../static/assets/post_invest.png"
import instagram from "../images/instagram2.png";
import telegram from "../images/telegram.png";
import pinterest from "../images/pinterest.svg";

export const blogListGuides = graphql`
    query blogListGuides($img: String, $dir: String)
    { site {
        siteMetadata {
            title
            canonical
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
            filter: {frontmatter: {category: {eq: "invest"}}}
            sort: { order: ASC, fields:[frontmatter___pinPrior]}
        ){
            edges
            {
                node
                {
                    id
                    excerpt(pruneLength:250)
                    frontmatter{
                        date(formatString:"MMMM DD, YYYY")
                        path
                        title
                        hashtag
                        attention
                        thumbnail
                        metaDescription
                        category
                        pin
                        pinPrior
                        menuname
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

class GuidesPage extends React.Component {
    render() {
        const skip = this.props.pageContext.skip
        const limit = this.props.pageContext.limit
        const {data} = this.props
        const {siteMetadata} = data.site
        const {currentPage, numPages} = this.props.pageContext
        const blogSlug = '/guides/'
        const isFirst = currentPage === 1
        const isLast = currentPage === numPages
        const prevPage = currentPage - 1 === 1 ? blogSlug : blogSlug + '/page-' + (currentPage - 1).toString() + '/'
        const nextPage = blogSlug + '/page-' + (currentPage + 1).toString() + '/'
        const tagId = (this.props.pageContext.tagId ? this.props.pageContext.tagId : 0);
        // const telegr = data.site.siteMetadata.link.telegram
        let img = data.allFile.edges.filter(item => item.node.absolutePath.indexOf(tagId.thumbnail) !== -1)
        if (img[0] && img[0].node && img[0].node.publicURL) {
            tagId.thumbnail = img[0].node.publicURL
        }
        let siteUrl = siteMetadata.siteUrl
        let props = {
            isFirst,
            prevPage,
            numPages,
            blogSlug,
            currentPage,
            isLast,
            nextPage
        }

        let Posts = data.allMarkdownRemark.edges
            .sort((a, b) => (new Date(b.node.frontmatter.date)) - new Date((a.node.frontmatter.date)))
            .sort((a, b) => (a.node.frontmatter.pinPrior || 1000) - (b.node.frontmatter.pinPrior || 1000))
            .slice(skip, limit + skip)
            .map(edge => {
                let file = data.allFile.edges.filter(item => item.node.absolutePath.indexOf(edge.node.frontmatter.thumbnail) !== -1)
                if (file[0] && file[0].node && file[0].node.publicURL) {
                    edge.node.frontmatter.thumbnail = file[0].node.publicURL
                }
                return <PostLink key={edge.node.id} post={edge.node} type={"pin"}/>
            })

        const instagram_link = data.site.siteMetadata.link.instagram
        const pinterest_link = data.site.siteMetadata.link.pinterest
        const telegram_link = data.site.siteMetadata.link.telegram

        return (
            <Layout>
                <Helmet>
                    <title></title>
                    <meta name="description"
                          content=""/>
                    <meta name="keywords"
                          content=""/>
                    <meta property="og:url" content={siteUrl + "/guides/"}/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:image" content=""/>
                    <meta property="og:image:width" content=""/>
                    <meta property="og:image:height" content=""/>
                    <meta property="og:site_name" content={data.site.siteMetadata.site_name}/>
                    <link rel="canonical" href={siteUrl + "/guides/"}/>
                    <meta property="og:title"
                          content=""/>
                    <meta property="og:description"
                          content=""/>
                    <meta name="yandex-verification" content=""/>
                </Helmet>
                <section className="top">
                    <div className="container">
                        <h1>Guides</h1>
                        <h3>Подборки, рекомендации, мысли, локации</h3>
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
                    {Posts.length !== 0 &&
                        <div>
                            <h2 className="title-text">НОВЫЕ СТАТЬИ</h2>
                            <div className="grids container">
                                {Posts}
                            </div>
                        </div>}
                    <div>
                        <Pagination {...props} />
                    </div>
                </section>
            </Layout>
        )
    }

}

export default GuidesPage