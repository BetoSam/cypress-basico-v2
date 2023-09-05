it('testa a pagina de privacidade de forma indepedente ', function(){
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
})