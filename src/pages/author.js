import React from "react"
import Helmet from "react-helmet"
import {graphql} from 'gatsby'
import Layout from "../components/layout"
import avtorSrc from "../../static/assets/girl.jpg";

const AboutMePage = ({
                         data: {
                             site
                         },
                     }) => {
    const inst = site.siteMetadata.link.instagram
    const telegr = site.siteMetadata.link.telegram
    let siteUrl = site.siteMetadata.siteUrl
    return (
        <Layout>
            <Helmet>
                <title>Привет! Это</title>
                <meta name="description" content=""/>
                <meta name="keywords" content=""/>
                <meta property="og:url" content={siteUrl + "//"}/>
                <meta property="og:type" content="website"/>
                <meta property="og:image" content=""/>
                <meta property="og:image:width" content={site.siteMetadata.image_width}/>
                <meta property="og:image:height" content={site.siteMetadata.image_height}/>
                <meta property="og:site_name" content={site.siteMetadata.site_name}/>
                <link rel="canonical" href={siteUrl + "/author/"}/>
                <meta property="og:title" content=""/>
                <meta property="og:description" content=""/>
                <meta name="yandex-verification" content="" />
            </Helmet>
            <div className="blog-for-me site-wrapper">
                <h1 className="title-text-me">Обо мне</h1>
                <img className="img-page-me" src={avtorSrc} alt=""/>
                <h2 className="title-post"></h2>
                <h2 className="title-post"></h2>
                <h2 className="title-post"></h2>
                <h2 className="title-post">Подробнее</h2>
            </div>
            <div className="footer">
                <div className="footer-color">
                    <div className="footer-post footer-text">Подписаться <span role="img" aria-label="">👇️</span>
                    </div>
                    <div className=" footer-post">
                        <a href={telegr} className="button -subscriptions">Telegram</a>
                        <a href={inst} className="button -subscriptions">Instagram</a>
                    </div>
                </div>
            </div>
            <h1 className="title-inst-me"><span role="img" aria-label="">📱️</span>Мой Instagram</h1>
            {/*<div className="elfsight-app-f3b79acc-ee21-4570-949e-ef75f12391ad"></div>*/}

        </Layout>
    )
}
export default AboutMePage
export const pageQuery = graphql`
    query AboutMePageQuery{
        site {
            siteMetadata {
                title
                canonical
                site_name
                image_width
                image_height
                link {
                    instagram
                    telegram
                }
            }
        }
    }
`
