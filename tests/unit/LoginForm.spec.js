/**
 * AULA 4 - Testando eventos emitidos pelo componente
 * E verificado que o dado passado pelo evento está correto.
 */

import LoginForm from '@/components/LoginForm.vue';
import { mount } from '@vue/test-utils';

describe('LoginForm', () => {
    /**
     * Métodos it e test funcionam da mesma forma
     */
    it('Emite um evento com dados do usuário', () => {
        const wrapper = mount(LoginForm);
        // 1. Busca o dados do input

        // Funciona aqui. mas em formularios mais longos poderá havér multiplos input de texto
        // const input = wrapper.find('input[type="text"]'); // Codigo buscando pelo elemento
        // Ao inves de buscar o elemento pelo ID ou class que podem ser alterados no futuro pelo designer ou outro desenvolvedor
        // é recomendado (e boa prática) criar um atributo data-testid com um nome para encontrar o elemento.
        const input = wrapper.find('[data-testid="name-input"]'); // Segue o recomendado para busca elemento do dom.

        // 2. Seta o valor do input de texto
        input.setValue('Rodrigo de Sousa');

        // 3. Simula um envio de formulario
        /**
         * É recomendado separar os testes de detalhes da implementação do componente.
         * 
         * Nesse caso, seria possivel eu testar o click no botão como no teste anterior entretanto, isso engessa o componente.
         * possivelmente no futuro o componente pode não ter botão, dessa forma o teste teria que ser refeito.
         * 
         * Seguindo essa lógica o recomendado seria apenas emitir o evento NECESSÁRIO do componente, sem determinar a estrutura do mesmo.
         */
        wrapper.trigger('submit'); // Emite o evento de submit do formulario.

        // 4. Assert event has been emitted
        const formSubmittedCalls = wrapper.emitted('formSubmitted'); // Verifica se o evento foi emitido pelo submit do formulario

        /**
         * tohaveLength() => Testa o tamanho de um array.
         */
        expect(formSubmittedCalls).toHaveLength(1); // Eventos emitidos sempre são um array de tamanho 1

        // 5. Assert payload is correct
        const expectedPayload = { name: 'Rodrigo de Sousa' };
        /**
         * OBS: O método wrapper.emitted('formSubmitted')
         * 
         * retornara a seguinte estrutura: [[{ name: 'Nome informado'}]]
         * 
         */
        expect(wrapper.emitted('formSubmitted')[0][0]).toMatchObject(expectedPayload);
    })
})