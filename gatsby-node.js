const path = require(`path`)


exports.createPages = async ({actions, graphql, reporter}) => {
    const {createPage} = actions

    // const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)
    const blogListQubittech = path.resolve(`src/templates/tag.js`)
    const blogListInvest = path.resolve(`src/templates/lifestyle.js`)
    const blogListGuides = path.resolve(`src/templates/guides.js`)

    const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            html
            frontmatter {
              date
              type
              path
              category
              template
              h1
              title
              metaDescription
              metaKeywords
              ogTitle
              ogDescription
              menu
              menuname
              button1
              button1URL
              button2
              button2URL
              promoDescrCat
              thumbnail
              text1
              text2
              text3
              attention
              hashtag
              pinPrior
              pintag 
              pintagprior
            }
          }
        }
      }
    }
  `)

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    const posts = result.data.allMarkdownRemark.edges
    let name_tag = 'qubittech'
    let blogPostsCount = 0
    let blogPostsTag = 0
    let blogPostsInvest = 0
    let blogPostsGuides = 0
    let tag = 0
    let tagInform = 0
    let tag_invest = 0;
    let tag_guides = 0;


    let pagesTag = {};
    posts.forEach((post, index) => {
        const id = post.node.id
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        let img = post.node.frontmatter.thumbnail.split('/')[1].replace('.jpg', '');
        img = post.node.frontmatter.thumbnail.split('/')[1].replace('.png', '');
        let dir = '/' + post.node.frontmatter.thumbnail.split('/')[0] + '/';
        if (post.node.frontmatter.template !== 'tags') {
            createPage({
                path: post.node.frontmatter.path,
                component: path.resolve(
                    `src/templates/blogTemplate.js`
                ),
                // additional data can be passed via context
                context: {
                    id,
                    previous,
                    next,
                    img,
                    dir,
                },
            })
        }

        // Count blog posts.
        if (post.node.frontmatter.template === 'BlogPost') {
            blogPostsCount++
        }
        if (post.node.frontmatter.category === 'invest') {
            blogPostsInvest++
        }
        if (post.node.frontmatter.category === 'guides') {
            blogPostsGuides++
        }

        if (post.node.frontmatter.hashtag !== null && post.node.frontmatter.hashtag !== '') {
            blogPostsTag++
        }

        if (post.node.frontmatter.hashtag && post.node.frontmatter.hashtag !== '') {
            hashtag = post.node.frontmatter;
            name_tag = hashtag.hashtag.toLowerCase();
            if (name_tag) {
                if (pagesTag.hasOwnProperty(name_tag)) {
                    pagesTag[name_tag] += 1
                } else {
                    pagesTag[name_tag] = 1
                }
            }
        }
        // chek tag
        if (post.node.frontmatter.menu === 'yes') {
            tag = post.node.frontmatter;
            // name_tag = tag.title.toLowerCase();
        }

        if (post.node.frontmatter.template === 'tags') {

            if (post.node.frontmatter.category === 'invest') {
                tag_invest = post.node.frontmatter;
            }

            if (post.node.frontmatter.category === 'guides') {
                tag_guides = post.node.frontmatter;
            }
        }
    })

    const postsPerPage = 12
    let numPagesInvest = Math.ceil(blogPostsInvest / postsPerPage)
    let numPagesGuides = Math.ceil(blogPostsGuides / postsPerPage)
    if (pagesTag) {
        for (let t in pagesTag) {
            let pages = Array.apply(null, {length: Math.ceil(pagesTag[t] / postsPerPage)}).map(Number.call, Number)
            for (let i in pages) {
                posts.forEach((post, index) => {
                    console.log("t ", t)
                    console.log("menuname ", post.node.frontmatter.menuname)
                    console.log("title ", post.node.frontmatter.title)
                    if (post.node.frontmatter.template === "tags" &&
                        post.node.frontmatter.menuname.toLowerCase() === t) {
                        console.log("t ", t)
                        console.log("menuname ", post.node.frontmatter.menuname.toLowerCase())
                        console.log("title ", post.node.frontmatter.title.toLowerCase())
                        tag = post.node.frontmatter
                        tagInform = post.node.html
                    }
                })
                i = +i
                createPage({
                    path: i === 0 ? `/` + t + `/` : `/` + t + `/page-${i + 1}/`,
                    component: blogListQubittech,
                    context: {
                        tagId: tag,
                        tagInform: tagInform,
                        slug: t,
                        limit: postsPerPage,
                        skip: i * postsPerPage,
                        numPages: pages.length,
                        currentPage: i + 1,
                    },
                })
            }
        }
    }

    numPagesInvest === 0 ? numPagesInvest = 1 : numPagesInvest
    Array.from({length: numPagesInvest}).forEach((post, i) => {
        createPage({
            path: i === 0 ? `/lifestyle/` : `/lifestyle/page-${i + 1}/`,
            component: blogListInvest,
            context: {
                tagId: tag_invest,
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages: numPagesInvest,
                currentPage: i + 1,
            },
        })
    })
    numPagesGuides === 0 ? numPagesGuides = 1 : numPagesGuides
    Array.from({length: numPagesGuides}).forEach((post, i) => {
        createPage({
            path: i === 0 ? `/guides/` : `/guides/page-${i + 1}/`,
            component: blogListGuides,
            context: {
                tagId: tag_guides,
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages: numPagesGuides,
                currentPage: i + 1,
            },
        })
    })
}
const {createFilePath} = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField} = actions
    if (node.internal.type === `MarkdownRemark`) {
        const path = createFilePath({node, getNode, basePath: `pages`})
        createNodeField({
            node,
            name: `path`,
            value: path,
        })
    }
}
