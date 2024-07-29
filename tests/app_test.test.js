import supertest from "supertest";
import { app } from "../config/expressApp.js";
import { test, describe, beforeEach, after } from "node:test";
import { Blog } from "../model/blogModel.js";
import assert from "node:assert";
import mongoose from "mongoose";
const api = supertest(app);
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
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

test("Number of blogs", async () => {
  try {
    const res = await api.get("/api/blogs");
    assert.strictEqual(res.body.length, 2);
  } catch (e) {
    console.error(e.message);
  }
});
test("Blog with 0 likes", async () => {
  try {
    const blog = new Blog({
      title: "TDD harms architecture",
      author: "Emmanuel Castillo",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    });

    const res = await api.get(`/api/blogs/`);
    assert.strictEqual(res.body.length, 2);
  } catch (e) {
    console.error(e.message);
  }
});
after(() => {
  mongoose.connection.close();
});
