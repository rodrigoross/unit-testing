/**
 * AULA 3 - Testando Props e interação do usuário.
 */


/**
 * Componente sendo testado.
 */
import RandomNumber from '@/components/RandomNumber';
/**
 * metodo que simula montagem do elemento DOM
 */
import { mount } from '@vue/test-utils';

/**
 * Describe é o bloco de testes utilizado pelo Jest para criar os testes.
 * 
 * @param "Nome do componente sendo testado"
 * @param "Funcao anonima que executa as chamadas de testes do componente"
 */
describe('RandomNumber', () => {

    /**
     * Método Jest para realizar um teste.
     * 
     * @param "Descricao do teste"
     * @param "Logica do teste que deve ser realizado."
     */
    test('Por padrão, o valor de randomNumber deve ser 0', () => {
        /**
         * Funcao do Vue-utils que monta o componente durante o teste.
         */
        const wrapper = mount(RandomNumber) // Cmponent importado.
        /**
         * expect() => Funcao utilizada para realizar analise do input
         * 
         * toBe() => Funcao que compara valor do output com o resultado da expect
         */

        /**
         * wrapper.html() => funcao que retorna a estrutura html montada do elemento
         * 
         * toContain() => funcao que busca o conteudo dentro do input.
         */
        expect(wrapper.html()).toContain('<span>0</span>');
    })

    /**
     * Como esse teste executa uma alteração de DOM, devemos esperar a alteração do DOM ocorrer para
     * confirmar que a função ou o teste ocorrerá com o dom atualizado.
     */
    test('Se o botão for clicado, o valor de randomNumber deve estar entre 1 e 10', async () => {
        const wrapper = mount(RandomNumber) // Cmponente importado que deve ser montado.

        await wrapper.find('button') // Busca o botão que executa generatedRamdomNumber.
            .trigger('click'); // Executa o evento no component encontrado.

        // Funcção que busca o span .text() retorna o valor de texto do conteudo dentro do span
        // Como o valor retornado será uma string é feito o casting para int do texto.
        const randomNumber = parseInt(wrapper.find('span').text());

        expect(randomNumber).toBeGreaterThanOrEqual(1); // Verifica se o número é maior ou igual que a prop default (min = 1);
        expect(randomNumber).toBeLessThanOrEqual(10); // Verifica se o número é menor ou igual que a prop default (max = 10);

    })

    test('Se o botão for clicado, o valor de randomNumber deve estar entre 200 e 300', async () => {
         // Cpmponente importado que deve ser montado com valores customizados de PROPS (min = 200, max = 300)
        const wrapper = mount(RandomNumber, {
            props: {
                min: 200,
                max: 300
            }
        });

        await wrapper.find('button').trigger('click'); // Executa o evento no component encontrado usando o find no elemento visto que deve haver apenas um numero.

        const randomNumber = parseInt(wrapper.find('span').text());

        expect(randomNumber).toBeGreaterThanOrEqual(200); // Verifica se o número é maior ou igual que a prop informada (min = 200);
        expect(randomNumber).toBeLessThanOrEqual(300); // Verifica se o número é menor ou igual que a prop informada (max = 300);
    })
})

