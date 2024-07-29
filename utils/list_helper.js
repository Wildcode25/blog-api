
export const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];
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