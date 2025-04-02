import axios from "axios";

describe('CYBERPUNK 77 Web-Site API Tests', () => {
  const BASE_URL = 'https://www.cyberpunk.net'; 
  let response;
  
  beforeAll(async () => {
    response = await axios.get(BASE_URL);
  });

  describe('GET Tests For Home Page', () => {

    test('Should redirect and include language in URL', async () => {
      expect(response.request.res.responseUrl).toContain('/ua/en/');
    });
    
    test("Should return status 200", () => {
      expect(response.status).toBe(200);
    });

    test('Should return defined body', async () => {
      expect(response.data).toBeDefined();
    });

    test("Should return a response with the correct content-type", () => {
      expect(response.headers["content-type"]).toContain("text/html; charset=UTF-8");
    });

    test("Response time should be less than 2000ms", async () => {
      const start = Date.now();
      await axios.get(BASE_URL);
      const duration = Date.now() - start;
      
      expect(duration).toBeLessThan(2000);
    });

  });
});
