import React from "react"
import {Link, useStaticQuery, graphql} from "gatsby"
import Navigation from "../components/navigation"
import 'prismjs/themes/prism-okaidia.css';
import logoSrc from "../images/favicon.ico";
import instagram from "../images/instagram2.png";
import telegram from "../images/telegram.png";
import telegram_footer from "../images/telegram_footer.svg";
import pinterest from "../images/pinterest.svg";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

library.add(fab, fas);

export default ({children}) => {

    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        link {
                            instagram
                            pinterest
                            telegram
                        }
                    }
                }
            }
        `
    )
    const instagram_link = data.site.siteMetadata.link.instagram
    const pinterest_link = data.site.siteMetadata.link.pinterest
    const telegram_link = data.site.siteMetadata.link.telegram

    return (
        <div className="wrapper">
            <div className="content">
                <nav role="navigation">
                    <div className="nav-wrapper container block_dop">
                        <div>
                            <a href="/" className="logo d-none d-sm-block">LOGO</a>
                            <a href="/" className="logo d-block d-sm-none">L</a>
                            <ul>
                                <li className="active"><a href="/lifestyle">Lifestyle</a></li>
                                <li><a href="/guides">Guides</a></li>
                            </ul>
                        </div>
                        <div className="social d-none d-md-flex align-items-center">
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
                </nav>
                {children}
            </div>

            <footer>
                <div className="container">
                    <p>Давай общаться</p>
                    <div className="social d-flex align-items-center">
                        <a href={pinterest_link}>
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
            </footer>
            <div className="container sub-footer block_dop">
                <h3>
                    Для связи
                    <span className="d-none d-sm-inline">→</span>
                    <span className="d-inline d-sm-none">↓</span>
                    <span className="links d-block d-sm-inline">
        <FontAwesomeIcon className="site-icon-black" icon={"envelope"} size="1x"/><a href="mailto:irinka@hey.com">irinka@hey.com</a>
        <a href={telegram_footer}>
          <img className="telegram_footer" src={telegram_footer} alt="telegram"/>Telegram
        </a>
      </span>
                </h3>
                <p className="text_foot">Пожалуйста, ставьте ссылку на girlwithbun.com при использовании
                    материалов и цитировании.
                    Перепечатка постов возможна, но с разрешения. Пишите в<a href={telegram_link}>Telegram</a> или почту.</p>
            </div>
        </div>

    )
}
