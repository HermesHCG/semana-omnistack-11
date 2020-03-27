const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', ()=>{
    beforeEach(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async ()=>{
        await connection.destroy();
    });

    it('should be able to create new ong', async ()=>{
        const response = await request(app).post('/ongs').send({
            name: "CQM",
	        email: "contato@cqm.com.br",
	        whatsapp: "1690909090",
	        city: "Franca",
	        uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});