import { faker } from '@faker-js/faker';
const password = faker.internet.password();


describe('QA Luma', () => {


    it('Validar o Carregamento da página', () => {

        cy.visit('/')

        cy.url().should('include', '/');

        cy.get('img[src="https://magento.softwaretestingboard.com/pub/static/version1695896754/frontend/Magento/luma/en_US/images/logo.svg"]')
            .should('be.visible');


    })


    it('Filtrar no campo de pesquisa por Shirt e faze checkout de um produto, Validando algumas opções', () => {

        cy.visit('/')

        cy.get('input[id="search"]').click()
            .type('shirt').realPress('Enter')

        cy.get('span[class="toolbar-number"]').eq(0).invoke('text').then((text) => {
            const number = parseInt(text, 10);
            expect(number).to.be.greaterThan(0);
        });

        cy.get('img[class="product-image-photo"]').eq(0)
            .click({ force: true }).wait(500)

        cy.get('div[class="swatch-option text"]').contains('XS').click()

        cy.get('div[class="swatch-option color"]').eq(0).click()

        cy.get('button[type="submit"]').contains('Add to Cart')
            .click().wait(800)

        cy.get('span[class="counter-number"]').contains('1').click({ force: true }).wait(500)

        cy.get('button[id="top-cart-btn-checkout"]').contains('Proceed to Checkout').click({ force: true }).wait(500)

        cy.get('div[class="loader"]').should('not.exist', { timeout: 10000 })

        cy.intercept('POST', ' /rest/default/V1/customers/isEmailAvailable').as('isEmailAvailable')
        cy.get('input[id="customer-email"]').eq(0).click().type('gugamartins13@gmail.com').wait('@isEmailAvailable')

        cy.get('input[id="customer-password"]').type('Gustavom17')

        cy.intercept('POST', 'https://analytics.google.com/g/collect*').as('AguardaLogin')
        cy.get('button[class="action login primary"]').click({ force: true }).wait('@AguardaLogin', { timeout: 15000 })


        cy.get('button[class="button action continue primary"]').contains('Next').click()

        cy.get('button[class="action primary checkout"]').contains('Place Order')
            .click({ force: true })

        cy.get('span[data-ui-id="page-title-wrapper"]').contains('Thank you for your purchase!', { timeout: 15000 })







    })

    it('Diferencial 1 - Buscar por shirt no menu superior e clicar no último resultado sugerido. Se possível, escute o retorno da requisição para saber o momento de clicar na interface ', () => {

        cy.visit('/')

        cy.intercept('POST', 'https://analytics.google.com/g/collect*').as('AguardaCarregamentoDaInterface')
        cy.get('input[id="search"]').click()
            .type('shirt').realPress('Enter').wait('@AguardaCarregamentoDaInterface', { timeout: 15000 })

        cy.get('img[class="product-image-photo"]').last()
            .click({ force: true }).wait(500)




    })

    it('Diferencial 2 - Criar uma conta na tela de Login/Cadastro. Observe que existe um captcha no formulário, então é necessário decidir como abordar este campo;', () => {

        cy.visit('/')

        cy.intercept('POST', 'https://analytics.google.com/g/collect*').as('AguardaCarregamentoCreateAccount')
        cy.get('a[href="https://magento.softwaretestingboard.com/customer/account/create/"]').eq(0).click().wait('@AguardaCarregamentoCreateAccount', { timeout: 15000 })

        cy.get('input[id="firstname"]').type(`${faker.person.firstName()}`)
        cy.get('input[id="lastname"]').type(`${faker.person.firstName()}`)
        cy.get('input[id="email_address"]').type(`${faker.internet.email()}`)
        cy.get('input[id="password"]').type(password)
        cy.get('input[name="password_confirmation"]').type(password)
        cy.get('button[class="action submit primary"]').click()

        cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]')
            .contains('Thank you for registering with Main Website Store.')



    })

    it('Diferencial 3 - Adicionar um produto aleatório do catalogo de moda masculina no carrinho', () => {

        cy.visit('/')

        cy.get('a[href="https://magento.softwaretestingboard.com/men.html"]')
            .click()

        cy.get('dl[class="options"]').contains('Tops').click()

        cy.get('.product-image-photo').then(($products) => {
            const randomIndex = Math.floor(Math.random() * $products.length);
            cy.wrap($products[randomIndex]).click();
        });

        cy.get('div[class="swatch-option text"]').contains('XS').click()

        cy.get('div[class="swatch-option color"]').eq(0).click()

        cy.get('button[type="submit"]').contains('Add to Cart')
            .click().wait(800)

        cy.get('span[class="counter-number"]').contains('1')



    })

    it('Diferencial 4 - Adicionar comentário em um produto aleatório do catálogo de moda masculina no carrinho', () => {

        cy.visit('/')

        cy.get('a[href="https://magento.softwaretestingboard.com/men.html"]')
            .click()

        cy.get('dl[class="options"]').contains('Tops').click()

        cy.get('.product-image-photo').then(($products) => {
            const randomIndex = Math.floor(Math.random() * $products.length);
            cy.wrap($products[randomIndex]).click();
        });

    
        cy.get('a[id="tab-label-reviews-title"]').click()
        cy.get('label[id="Rating_5_label"]').click({force:true})
        cy.get('input[id="nickname_field"]').type(`${faker.person.firstName()}`)
        cy.get('input[id="summary_field"]').type('Produto muito bom!')
        cy.get('textarea[id="review_field"]').type('Comprei o produto e gostei bastante!')
        cy.get('button[class="action submit primary"]').click()
        cy.get('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]').contains('You submitted your review for moderation.')



    })

})