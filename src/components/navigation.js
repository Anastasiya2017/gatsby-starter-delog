import React from "react"
import {graphql, Link, StaticQuery} from "gatsby"
import telegram from "../images/telegram.png";
import pinterest from "../images/pinterest.svg";

export default () => (
<StaticQuery
    query={graphql`
      query HeadingQuery2 {
        allMarkdownRemark(filter: {frontmatter: {menu: {eq: "yes"}}}, limit: 1) {
          edges {
              node {
                  frontmatter {
                    template
                    title
                    menuname
                  }
              }
          }
        }
      }
    `}
    render={data => (
        <nav className="navigation">
            <Link to="/lifestyle/">Lifestyle</Link>
            <Link to="/guides/">Guides</Link>
            {!!data.allMarkdownRemark.edges.length && (<Link className="tag-text" to={'/' + data.allMarkdownRemark.edges[0].node.frontmatter.menuname.toLowerCase() + '/'}>
                {/*{!!data.allMarkdownRemark.edges.length && (<Link className="tag-text" to="/qubittech/">*/}
                {/*QUBITTECH*/}
                {data.allMarkdownRemark.edges[0].node.frontmatter.menuname.toUpperCase()}
            </Link>)}
        </nav>
    )
    }
/>)