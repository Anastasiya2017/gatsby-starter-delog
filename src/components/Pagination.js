import React from "react"
import {Link} from "gatsby"

const numLink = 7;
let maxLink = 1;
let minLink = 1;
let blockLink;
const Pagination = (props) => (
    (props.numPages !== 0 && props.numPages !== 1) &&
    <div className="pagination">
        <script>
            console.log(12)
            {blockLink = Math.ceil(props.currentPage / numLink)}
            {maxLink = (blockLink) * numLink < props.numPages ? (blockLink) * numLink : props.numPages}
            {minLink = (blockLink - 1) * numLink}
        </script>
        {
            !props.isFirst && (
                <div className="paginator__page">
                    <Link
                        to={props.currentPage === 2 ? props.blogSlug : props.blogSlug + 'page-' + (props.currentPage - 1)}
                        rel="prev" className="num">
                        <span className="icon -left">←</span>
                    </Link>
                </div>
            )
        }
        {
            (props.numPages !== 0 && props.numPages !== 1) &&
            (
                Array.from({length: maxLink - minLink}, (_, i) => (
                    <div className="paginator__page" key={`pagination-number${i + minLink + 1}`}>
                        <Link
                            to={`${props.blogSlug}${i + minLink === 0 ? '' : 'page-' + (i + minLink + 1)}`}
                            className={props.currentPage === i + minLink + 1 ? "is-active num" : "num"}
                        >
                            {i + minLink + 1}
                        </Link>
                    </div>
                ))
            )
        }
        {
            !props.isLast && (
                <div className="paginator__page">
                    <Link to={props.blogSlug + 'page-' + (props.currentPage + 1)} rel="next" className="num">
                        <span className="icon -right">→</span>
                    </Link>
                </div>
            )
        }
    </div>
)
export default Pagination