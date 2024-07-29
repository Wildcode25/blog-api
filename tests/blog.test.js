import {dummy, totalLikes, favoriteBlog, mostBlog, mostLikes} from '../utils/list_helper.js'
import {test, describe} from 'node:test'
import assert from 'assert'
import { blogs } from '../utils/list_helper.js'

  describe('dummy', ()=>{
    test('dummy that return 1', ()=>{
        const result = dummy(blogs)
        assert.strictEqual(result, 1)
    })
  })
  describe('total likes', ()=>{
    test('return total likes when thera are more blogs than 2',()=>{
        const result = totalLikes(blogs.slice(0,3))
        assert.strictEqual(result, 24)
    })
})

describe('favorite blog', ()=>{
    test('return favorite blog', ()=>{
        const result = favoriteBlog(blogs)
        assert.deepStrictEqual(result, {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
          })
    })
})
describe('author with most blog', ()=>{
    test('return blogs and author', ()=>{
        const result = mostBlog(blogs)
        const expectedResult= {
        author: "Robert C. Martin",
        blogs: 3,
      }
        assert.deepStrictEqual(result, expectedResult)
    })
})
describe('author with most blog', ()=>{
    test('return blogs and author', ()=>{
        const result = mostLikes(blogs)
        const expectedResult= {
        author: "Edsger W. Dijkstra",
        likes: 17,
      }
        assert.deepStrictEqual(result, expectedResult)
    })
})