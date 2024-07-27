export const dummy = (blogs)=>{

    return 1
}

export const totalLikes = (blogs)=>{
    return blogs.reduce((total, blog)=>total+blog.likes, 0)
}

export const favoriteBlog = (blogs)=>{
    const {author, title, likes} = blogs.sort((a, b)=>b.likes-a.likes)[0]//sort elements in descending and return first element
    return {author, title, likes}
}
export const mostBlog = (blogs)=>{
    const author = blogs.map((blog)=>{
        return {
            author: blog.author,
            blogs: blogs.filter((filterBlog)=>blog.author==filterBlog.author).length
        }
    }).reduce((authorMostBlog, author)=>authorMostBlog.blogs<author.blogs?author:authorMostBlog)
    return author
}
export const mostLikes = (blogs)=>{
    const author = blogs.map((blog)=>{
        return {
            author: blog.author,
            likes: blogs.filter((filterBlog)=>blog.author==filterBlog.author).reduce((tLikes, currentBLog)=>tLikes+currentBLog.likes, 0)
        }
    }).reduce((authorMostLikes, author)=>authorMostLikes.likes<author.likes?author:authorMostLikes)
    return author
}