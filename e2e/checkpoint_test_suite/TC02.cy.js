/// <reference types="Cypress"/>

it("TC02 - Searchbar results", () =>{
    //Sample product keys
    const searchKeys = "Microphone"

    //Navigates to the page
    cy.visit("https://reverb.com/")

    //Searches for the specified keys
    cy.get(".site-search__controls__input").click()
    cy.get(".site-search__controls__input").type(searchKeys)
    cy.get(".site-search__controls__input").type("{enter}")
    //cy.get(".site-search__controls__submit").click()

    //Asserts that the title of each item in the results contains the keys
    cy.get(".csp-square-card__titleblock").then(element => {
        cy.wrap(element).should("include.text", searchKeys)
    })

    //Selects a random item
    cy.get(".csp-square-card__inner").eq(Math.floor(Math.random() * 10)).click()

    //Asserts the title of the item
    cy.get(".csp2-header__title").should("include.text", searchKeys)

    //Asserts the category of the item
    cy.get(`section#specs a[href *="/microphone"]`).should("contain.text", "Microphones")
})
