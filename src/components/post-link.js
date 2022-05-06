import React from "react"
import {Link} from "gatsby"

const PostLink = ({post, type}) => (
    <article className="card ">
        <Link to={post.frontmatter.path}>
            {!!post.frontmatter.thumbnail && (
                    <div className="full_bg" style={{backgroundImage: `url(${post.frontmatter.thumbnail})`}}>
                        {/*<img src={post.frontmatter.thumbnail} alt={post.frontmatter.title + "- Featured Shot"}/>*/}

                    </div>
            )}
        </Link>
        <header className="block">
            {(post.frontmatter.pin === "yes" && type === "pin") && (<div className="pin"></div>)}
            {(post.frontmatter.pintag === "yes" && type === "pintag") && (<div className="pin"></div>)}
            <h2 className="post-title">
                <Link to={post.frontmatter.path} className="post-link">
                    {post.frontmatter.title}
                </Link>
            </h2>
            {/*<div className="post-meta">{new Date(post.frontmatter.date).toLocaleString("ru", {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            })}</div>*/}
        </header>
    </article>
)
export default PostLink
