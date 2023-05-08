process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");


let kitty = { name:"smokey", price:0 }


beforeEach(function () {
    items.push(kitty);
});

afterEach(function () {
    items.length = 0;
});


describe('GET/items', () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [kitty] });
        expect(items).toHaveLength(1);
    });
});

describe('POST/items', () => {
    test("Post an item to items db", async () => {
        const res = (await request(app).post("/items").send({name:"book", price:3}));
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ added: {name:"book", price:3} });
        expect(items).toHaveLength(2);
    });
});

describe("GET /items/:name", () => {
    test("Get item by name", async function () {
        const response = await request(app).get(`/items/${kitty.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual(kitty);
      })
    test("Responds with 404 for invalid item", async () => {
      const res = await request(app).get(`/items/kitty`);
      expect(res.statusCode).toBe(404)
    })
})

describe('PACTH /items/:name', () => {
    test("Updates item", async () => {
        const res = (await request(app).patch(`/items/${kitty.name}`).send({name:"smokes", price:3}));
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({updated: {name:"smokes", price:3} });
        expect(items).toHaveLength(1);
    });
    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).patch(`/items/kitty`);
        expect(res.statusCode).toBe(404)
      })
});

describe("DELETE /items/:name", () => {
    test("Get item by name", async function () {
        const response = await request(app).delete(`/items/${kitty.name}`);
        expect(response.statusCode).toBe(200);
        expect(items).toHaveLength(0);
      })
    test("Responds with 404 for invalid item", async () => {
      const res = await request(app).delete(`/items/kitty`);
      expect(res.statusCode).toBe(404)
    })
})
