/// <reference types="Cypress"/>

it("TC04 - API testing", () =>{
    //Makes a GET request
    cy.request("GET", "https://dummyjson.com/products/11").then((response) => {
        //Asserts for a 200 status code
        expect(response.status).to.eq(200)
        //Asserts for key items in the body
        expect(response.body, 'response body').to.include({
            id: 11,
            title: 'perfume Oil',
            price: 13,
            rating: 4.26,
          })
      })
})
