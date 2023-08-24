/// <reference types="Cypress"/>

it("TC03 - Navigation Bar Guitar URL's", () =>{
    //Navigates to the site
    cy.visit("https://reverb.com/")

    //Clicks on the guitars category inside the navigation bar
    cy.get(`.category-flyout-header__link-bar__list-item .category-flyout-header__link[data-header-category="guitars"]`).click()

    //The header of the floating menu should contain the category
    cy.get(".category-flyout__header").should("contain.text","Guitars")

    //Selects the first column of the menu and checks that the link guides the user to a guitar-related page
    cy.get(".category-flyout__column").eq(0).find(".category-flyout__link").should("have.attr", "href")
                                                                            .and("include","guitars/")
    //Checks for broken links inside the available options in the menu
    cy.get(".category-flyout__column").eq(0).find(".category-flyout__link").each(link =>{
        if (link.prop('href')){
            cy.request({
                url: link.prop('href'),
                failOnStatusCode: false
              })
        }
    })

})
