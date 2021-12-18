/**
 * AULA 5 - Mockando chamada de api e seus resultados, e testando se o conteudo é exibido corretamente.
 */
import MessageDisplay from '@/components/MessageDisplay';
import { mount } from '@vue/test-utils';
import { getMessage } from '@/services/axios'; // Importa a chamada de API
import flushPromises from 'flush-promises'; // Importa biblioteca para executar promises no ciclo de vida.

// Passa o caminho do modulo importado
jest.mock('@/services/axios')
// Tratamento para limpar a contagem de chamadas de API - caso necessário.
beforeEach(() => {
    jest.clearAllMocks(); // Limpa a cada mock executado.
})

describe('MessageDisplay', () => {
    it('Realiza a chamada de getMessage e exibe a mensagem', async () => {
        // 1 - mocka a chamada de API para não amarrar o test com o ambiente de backend
        // getMessage chamado é o getMessage mockado pelo jest.
        // mockResolvedValueOnce() especifica qual o resultado que esperamos do backend, nesse caso simulando a resposta do json-server com o dado do db.json
        // getMessage.mockResolvedValueOnce({ "text": "Hello from the db!"})

        // Para efeitos de organização iremos configuar a mensagem em uma variavel.
        const mockMessage = "Hello from the db!";
        getMessage.mockResolvedValueOnce({ "text": mockMessage});
        const wrapper = mount(MessageDisplay);
        // 2 - Esperamos a promise finalizar.
        /**
         * OBS: Vue-test-utils não consegue acessar promises executadas dentro do ciclo de vida do componente.
         * 
         * A solução para isso é utilizar um pacote de terceiros (flush-promises): npm i flush-promises --save-dev
         */
        await flushPromises(); // Resolve todas as promises

        // 3 - Verifica que a chamada de API executou apenas uma vez.
        expect(getMessage).toHaveBeenCalledTimes(1);
        // 4 - Verifica que o componente exibe a mensagem recebida
        const message = wrapper.find('[data-testid="message"]').text(); // Busca conteudo do componente buscando pelo atributo dos testes.
        expect(message).toEqual(mockMessage); // Verifica se a mensagem exibida é a mesma da mensagem de sucesso mocada.

    })

    it('Exibe mensagem de erro quando chamada de API falahar', async () => {
        // 1 - mock the failed API call
        const mockError = "Oops! Something went wrong.";
        getMessage.mockRejectedValueOnce(mockError);

        const wrapper = mount(MessageDisplay)
        
        // 2 - wait for promise to resolve
        await flushPromises();

        // 3 - check that call happened once
        expect(getMessage).toHaveBeenCalledTimes(1); // Para não ter conflito com as chamadas de outros testes (caso apenas deva ser chamado uma vez deve ser tratado.)
        const displayError = wrapper.find('[data-testid="message-error"]').text();

        // 4 - check that component displays error
        expect(displayError).toEqual(mockError);
    })
})