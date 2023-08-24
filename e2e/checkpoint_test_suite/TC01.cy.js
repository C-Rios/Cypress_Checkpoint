/// <reference types="Cypress"/>

it("TC01 - Cart Assertion",()=>{
    //Products that will be added to the cart
    const productsURLs = ["https://reverb.com/item/51898487-jackson-performer-ps7-80-s-80s-red?bk=",
    "https://reverb.com/item/38420785-squier-telecaster-affinity-new-generation-2020-silver?bk="];

    //Products addition
    productsURLs.forEach((url) => {
        cy.visit(url)
        cy.get(".add-to-cart-button").click()
    })

    //Click on the cart logo
    cy.get(`div > a[href="/cart"]`).click()
    
    //Manual calculation of the order total
    var totalCalculated = Number(0)
    cy.get(`[id*="guest_cart_item"] div.align-right`).find("p").each(($el) => {
        if($el.text().includes("$")){
            //Removes any symbol that isn't a number
            totalCalculated += Number($el.text().replace(/[^0-9.]+/g, ""))
        }

    }).then(()=>{
        //Obtains the price of the page total
        cy.get("div.site-module__footer strong").then((element)=>{
            var totalPrice = element.text().replace(/[^0-9]+/g, "")
            cy.log(totalPrice)
            //Assertion
            expect(totalPrice).to.be.a('string').and.satisfy(el => el.startsWith(totalCalculated))
        })
        
        //ALTERNATIVE
        /* cy.get("div.site-module__footer strong").then((element)=>{
            totalPrice = Number(element.text().replace(/[^0-9.]+/g, ""))
            cy.log(totalPrice)
            expect(totalCalculated).to.equal(totalPrice)
        }) */
    })
    
})
