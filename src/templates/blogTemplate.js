import React from "react"
import Helmet from 'react-helmet';
import {graphql, Link} from "gatsby"
import Layout from "../components/layout"
import avtorSrc from "../../static/assets/girl.jpg";
import instagram from "../images/instagram.svg";
import telegram from "../images/telegram.svg";
import pinterest from "../images/pinterest.svg";

export default function Template({data}) {
    const {siteMetadata} = data.site
    let {frontmatter, html} = data.markdownRemark
    let {edges} = data.allMarkdownRemark
    let attention = frontmatter.attention
    if (frontmatter.hashtag !== null && frontmatter.hashtag !== '') {
        attention = edges
            .filter(item => item.node.frontmatter.template === 'tags')
            .filter(item => item.node.frontmatter.menuname.toLowerCase() === frontmatter.hashtag)
            .map(edge => {
                return edge.node.frontmatter.attention
            })
    }

    const instagram_link = data.site.siteMetadata.link.instagram
    const telegram_link = data.site.siteMetadata.link.telegram
    const pinterest_link = data.site.siteMetadata.link.pinterest
    let f = false;
    let i = 0;
    let text2 = [];
    let _html = html.split("\n");
    let _h2 = '';
    _html.map((item, index) => {
        if (item.indexOf('<h2>') !== -1 && f === false) {
            f = true;
            _h2 = item;
        }
        if (f && _html[index + 1] && _html[index + 1].indexOf('</h2>') === -1) {
            if (!text2[i]) {
                text2[i] = [_h2];
            }
            text2[i].push(_html[index + 1]);
        }
        if (_html[index + 1] && _html[index + 1].indexOf('</h2>') !== -1 && f === true) {
            f = false;
            i++;
        }
    });
    let arr = [];
    text2.map(item => {
        let _h2 = item[0];
        item.splice(0, 1);
        let _a = {
            "@type": "Question",
            "name": _h2,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.join("\n")
            }
        }
        arr.push(_a)
    });
    if (html.match(/<img/)) {
        let m = [...html.match(/<img.+src="([a-z-0-9._\s]+)"/ig)]
        m.map(el => {
            el = el.match(/"([a-z-0-9._\s]+)"/i);
            let sr = el[1].split('.')[0];
            let file = data.allFile.edges.filter(item => item.node.publicURL.indexOf(sr) !== -1)
            html = html.replace(el[1], file[0].node.publicURL)
        })
    }

    let img = frontmatter.thumbnail;
    let file2 = data.allFile.edges.filter(item => item.node.absolutePath.indexOf(frontmatter.thumbnail) !== -1)
    if (file2[0] && file2[0].node && file2[0].node.publicURL) {
        frontmatter.thumbnail = file2[0].node.publicURL
        img = frontmatter.thumbnail
    }
    let siteUrl = siteMetadata.siteUrl
    const metaDate = frontmatter.type === 'article' ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": frontmatter.title,
        "image": img,
        "datePublished": frontmatter.date
    } : {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": arr
    }
    return (
        <Layout>
            <Helmet>
                <title>{frontmatter.title}</title>
                <meta name="description" content={frontmatter.metaDescription}/>
                <meta name="keywords" content={frontmatter.metaKeywords}/>
                <meta property="og:url" content={siteUrl + frontmatter.path}/>
                <meta property="og:type" content="article"/>
                <meta property="og:image" content={siteUrl + img}/>
                <meta property="og:image:width" content=""/>
                <meta property="og:image:height" content=""/>
                <meta property="og:site_name" content={siteMetadata.site_name}/>
                <link rel="canonical" href={siteUrl + frontmatter.path}/>
                <meta property="og:title" content={frontmatter.ogTitle}/>
                <meta property="og:description" content={frontmatter.ogDescription}/>
                <meta name="yandex-verification" content=""/>
                <script type="application/ld+json">{JSON.stringify(metaDate)}</script>
            </Helmet>
            <div className="blog-post-container">
                <article className="post container">
                    <h1 className="post-title">{frontmatter.title}</h1>
                    <div className="post-thumbnail" style={{backgroundImage: `url(${img})`}}>
                       {/* {(frontmatter.type === 'article') && (<div className="post-meta">{frontmatter.date}</div>)}
                        {!!frontmatter.hashtag && (<div className="post-hashtag">
                            <Link to={'/' + frontmatter.hashtag + '/'}>#{frontmatter.hashtag}</Link>
                        </div>)}
                        {!!(frontmatter.attention || attention) && (<div className="post-attention">{attention}</div>)}*/}
                    </div>
                    <div className="short-subscribe">
                        <Link to="/author/"><img src={avtorSrc} alt=""/></Link>
                        <div>
                            <Link to="/author/">
                                <div className="site-icon-black site-subscribe-bloc">Ира Никулина</div>
                            </Link>
                            <div className="site-social-black">
                                <a href={instagram_link} target="_blank"><img className="site-icon-black"
                                                                              src={instagram}
                                                                              alt="instagram"/></a>
                                <a href={telegram_link} target="_blank"><img className="site-icon-black" src={telegram}
                                                                             alt="telegram"/></a>
                                <a href={pinterest_link} target="_blank"><img className="site-icon-black"
                                                                              src={pinterest}
                                                                              alt="telegram"/></a>
                            </div>
                        </div>
                    </div>
                    <div className="line-post"></div>
                    <div className="blog-post-content container" markdown="1" dangerouslySetInnerHTML={{__html: html}}/>
                    <br/>
                </article>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query($path: String!, $dir: String) {
        site {
            siteMetadata {
                title
                siteUrl
                canonical
                site_name
                image_width
                image_height
                link {
                    instagram
                    telegram
                    pinterest                    
                }
            }
        }
           allMarkdownRemark{
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
                        template
                    }
                }
            }
        }
        markdownRemark(frontmatter: {path: {eq: $path}}) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
                metaDescription
                metaKeywords
                ogTitle
                ogDescription
                type
                hashtag
                attention
                thumbnail
            }
        }
        allFile(filter: {dir: {regex: $dir}}) {
            edges {
                node {
                    publicURL
                    absolutePath
                }
            }
        }
    }
`
