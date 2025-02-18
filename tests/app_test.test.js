import supertest from "supertest";
import { app } from "../config/expressApp.js";
import { test, describe, beforeEach, after } from "node:test";
import { Blog } from "../model/blogModel.js";
import assert from "node:assert";
import mongoose from "mongoose";
const api = supertest(app);
import { blogs } from "../utils/list_helper.js";


describe('Blogs test', ()=>{
 
  beforeEach(async () => {
    try {
      await Blog.deleteMany({});
      const blog1 = new Blog(blogs[0]);
      await blog1.save();
      const blog2 = new Blog(blogs[1]);
      await blog2.save();
    } catch (e) {
      console.error(e);
    }
  });
  
  test("id is defined", async () => {
    const res = await api.post('api/login').send({
      "username": "Wild",
      "password": "mordex0025"
    })
    const token = `Bearer ${res.body.token}`
    try {
      const res = await api.get("/api/blogs").set({ Authorization: token });
      assert(res.body[0].id);
    } catch (e) {
      console.error(e.message);
    }
  });
  test("Number of blogs", async () => {
    const res = await api.post('api/login').send({
      "username": "Wild",
      "password": "mordex0025"
    })
    const token = `Bearer ${res.body.token}`
    try {
      const res = await api.get("/api/blogs");
      assert.strictEqual(res.body.length, 2);
    } catch (e) {
      console.error(e.message);
    }
  });
  describe("Save likes", () => {
    test("Blog with 0 likes", async () => {
      const res = await api.post('api/login').send({
        "username": "Wild",
        "password": "mordex0025"
      })
      const token = `Bearer ${res.body.token}`
      try {
        const newBlog = {
          title: "La chanty",
          author: "Amenazzy",
          url: "Here is url",
        };
        await api
          .post("/api/blogs")
          .send(newBlog)
          .expect(201)
          .expect("Content-Type", /application\/json/);
        const res = await api.get("/api/blogs");
        const blog = res.body.find((b) => b.title === "La chanty");
        assert.strictEqual(blog.likes, 0);
      } catch (e) {
        console.error(e.message);
      }
    });
    test("Blog with likes", async () => {
      const res = await api.post('api/login').send({
        "username": "Wild",
        "password": "mordex0025"
      })
      const token = `Bearer ${res.body.token}`
      try {
        const newBlog = {
          title: "Hey chanty",
          author: "Amenazzy",
          url: "Here is url",
          likes: 49,
        };
        await api
          .post("/api/blogs")
          .send(newBlog).set({ Authorization: token })
          .expect(201)
          .expect("Content-Type", /application\/json/);
        const res = await api.get("/api/blogs");
        assert.strictEqual(
          res.body.find((b) => b.title == "Hey chanty").likes,
          49
        );
      } catch (e) {
        console.error(e.message);
      }
    });
  });
  test("Create blog", async () => {
    const res = await api.post('api/login').send({
      "username": "Wild",
      "password": "mordex0025"
    })
    const token = `Bearer ${res.body.token}`
      try {
        const newBlog = {
          title: "Dificil de reemplazar",
          author: "Amenazzy",
          url: "Here is url",
          likes: 90,
        };
        await api
          .post("/api/blogs")
          .send(newBlog).set({ Authorization: token })
          .expect(201)
          .expect("Content-Type", /application\/json/);
        const res = await api.get("/api/blogs");
        assert.strictEqual(
          res.body.length,
          3
        );
      } catch (e) {
        console.error(e.message);
      }
    });
    test("Bad request", async () => {
      const res = await api.post('api/login').send({
        "username": "Wild",
        "password": "mordex0025"
      })
      const token = `Bearer ${res.body.token}`
      try {
        const newBlog = {
          author: "Amenazzy",
          url: "Here is url",
          likes: 90,
        };
        await api
          .post("/api/blogs")
          .send(newBlog).set({ Authorization: token })
          .expect(400)
          .expect("Content-Type", /application\/json/);
        
      } catch (e) {
        console.error(e.message);
      }
    });
  test('Update blog', async ()=>{
    const res = await api.post('api/login').send({
      "username": "Wild",
      "password": "mordex0025"
    })
    const token = `Bearer ${res.body.token}`
      let {body} = await api.get('/api/blogs')
      const blog = {...body[0], title: "Emmanuel"}
      await api.put(`/api/blogs/${body.id}`).send(blog).set({ Authorization: token })
      .expect(203).expect('Content-type', /application\/json/)
  })
  test('Delete blog', async ()=>{
    const res = await api.post('api/login').send({
      "username": "Wild",
      "password": "mordex0025"
    })
    const token = `Bearer ${res.body.token}`
      let {body} = await api.get('/api/blogs')
      await api.delete(`/api/blogs/${body[0]._id}`).set({ Authorization: token })
      .expect(204)
  })
  
})

describe('Users', ()=>{
  
  beforeEach('login', async ()=>{
    const res = await api.post('api/login').send({
      "username": "Wild",
      "password": "mordex0025"
    })
    token = `Bearer ${res.body.token}`
  })

  test('Created user successfuly', async ()=>{
    const res = await api.post('api/login').send({
      "username": "Wild",
      "password": "mordex0025"
    })
    const token = `Bearer ${res.body.token}`
    const user = {
      name: "Emmanuel",
      username: "Wild",
      password: "mordex0025"
    }
    await api.post('/api/register').send(user).set({ Authorization: token }).expect(201).expect('Content-type', /application\/json/)
  })
  test('user not valid', async ()=>{
    const res = await api.post('api/login').send({
      "username": "Wild",
      "password": "mordex0025"
    })
    const token = `Bearer ${res.body.token}`
    const user = {
      name: "Emmanuel",
      password: "mordex0025"
    }
    await api.post('/api/users').send(user).expect(401).expect('Content-type', /application\/json/)
  })

})
after(() => {
  mongoose.connection.close();
});
