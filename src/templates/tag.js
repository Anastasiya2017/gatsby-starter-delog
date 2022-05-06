import React from "react"
import Helmet from "react-helmet"
import {graphql, Link} from 'gatsby'
import Layout from "../components/layout"
import PostLink from "../components/post-link";
import Pagination from "../components/Pagination";


export const blogListQubittech = graphql`
    query blogListQubittech($img: String, $dir: String)
    { site {
        siteMetadata {
            title
            siteUrl
            canonical
            site_name
            image_width
            image_height
        }
    }
        allMarkdownRemark(
            sort: { order: DESC, fields:[frontmatter___date]}
        ){
            edges
            {
                node
                {
                    id
                    excerpt(pruneLength:250)
                    html
                    frontmatter{
                        date(formatString:"MMMM DD, YYYY")
                        path
                        title
                        menuname
                        h1
                        hashtag
                        attention
                        category
                        thumbnail
                        pin
                        button1
                        button1URL
                        button2
                        button2URL
                        pintag
                        pintagprior
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

class QubittechPage extends React.Component {
    render() {
        const skip = this.props.pageContext.skip
        const limit = this.props.pageContext.limit
        const {data} = this.props
        const {siteMetadata} = data.site
        const {currentPage, numPages} = this.props.pageContext
        const tagId = (this.props.pageContext.tagId ? this.props.pageContext.tagId : 0);
        const tagInform = (this.props.pageContext.tagInform ? this.props.pageContext.tagInform : '');
        const slug = this.props.pageContext.slug
        const blogSlug = '/' + slug + '/'
        const isFirst = currentPage === 1
        const isLast = currentPage === numPages
        const prevPage = currentPage - 1 === 1 ? blogSlug : blogSlug + (currentPage - 1).toString() + '/'
        const nextPage = blogSlug + (currentPage + 1).toString() + '/'
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
            .filter(item => item.node.frontmatter.hashtag === slug)
            .sort((a, b) => (a.node.frontmatter.pintagprior || 1000) - (b.node.frontmatter.pintagprior || 1000))
            .slice(skip, limit + skip)
            .map(edge => {
                let file = data.allFile.edges.filter(item => item.node.absolutePath.indexOf(edge.node.frontmatter.thumbnail) !== -1)
                if (file[0] && file[0].node && file[0].node.publicURL) {
                    edge.node.frontmatter.thumbnail = file[0].node.publicURL
                }
                return <PostLink key={edge.node.id} post={edge.node} type={"pintag"}/>
            })

        return (
            <Layout>
                <Helmet>
                    <title>{tagId.title}</title>
                    <meta name="description" content={tagId.metaDescription}/>
                    <meta name="keywords" content={tagId.metaKeywords}/>
                    <meta property="og:url" content={siteUrl + tagId.path}/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:image" content={siteUrl + tagId.thumbnail + '/'}/>
                    <meta property="og:image:width" content={siteMetadata.image_width}/>
                    <meta property="og:image:height" content={siteMetadata.image_height}/>
                    <meta property="og:site_name" content={siteMetadata.site_name}/>
                    <link rel="canonical" href={siteUrl + tagId.path}/>
                    <meta property="og:title" content={tagId.ogTitle}/>
                    <meta property="og:description" content={tagId.ogDescription}/>
                    <meta name="yandex-verification" content="d53569508298c2c7" />
                </Helmet>
                <div className="blog-post-container">
                    {<article className="post">
                        <div className="post-thumbnail"
                             style={{backgroundImage: `url(${tagId.thumbnail})`}}>
                            {(tagId.text1 || tagId.text2 || tagId.text3) &&
                            <div className="border-tag">
                                {(tagId.text1) && <div>{tagId.text1}</div>}
                                {(tagId.text2) && <div>{tagId.text2}</div>}
                                {(tagId.text3) && <div>{tagId.text3}</div>}
                            </div>
                            }
                            <h1 className="tag-title">{tagId.h1}</h1>
                            <div className="tag-attention">{tagId.attention}</div>
                            <div className="tag-buttons">
                                {!!(tagId.button1) &&
                                <a href={tagId.button1URL} className="button -tag">{tagId.button1}</a>}
                                {!!(tagId.button2) &&
                                <a href={tagId.button2URL} className="button -tag">{tagId.button2}</a>
                                }
                            </div>
                        </div>
                    </article>}
                </div>
                <div className="hero-header"><h1 className="post-title -tag">Краткая информация</h1>
                    <p className="primary-content" dangerouslySetInnerHTML={{__html: tagInform}}></p>
                </div>

                <h2 className="title-post">Инструкции и новости &darr;</h2>
                <div className="grids">
                    {Posts}
                </div>
                <div>
                    <Pagination {...props} />
                </div>
            </Layout>
        )
    }
}

export default QubittechPage
