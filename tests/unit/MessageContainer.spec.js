/**
 * Aula 6 - Como testar componentes pais sem precisar executar requisições e execuções de modulos nos componentes filhos.
 * 
 * Dessa forma, caso o componente filho tenha muita bagagem, ou vários modulos sendo importados, é mais facil mockar o componente
 * no caso criadno um "stub" do componente
 * 
 * OBS: stub funciona como uma versão placeholder com resultados fixos do componente.
 */
import MessageContainer from '@/components/MessageContainer';
import { mount } from '@vue/test-utils';

describe('MessageContainer', () => {
    it('Encapsula o componente MessageDisplay', () => {
        const wrapper = mount(MessageContainer, {
            // Como declarar o stub do componente filho.
            global: {
                stubs: {
                    MessageDisplay: {
                        template: '<p data-testid="message">Hello from the db!</p>' // Template renderizado do filho.
                    }
                }
            }
        });

        const message = wrapper.find('[data-testid="message"]').text();
        expect(message).toEqual('Hello from the db!');
    });
});

/**
 * ?Vantagems de utilizar o stubbing dos componentes
 * 
 * * Isolar o que estamos testando.
 * * Testar apenas uma coisa por vez.
 * * Auxiliar em encontrar exatamento onde se encontra o erro do código.
 * 
 * !Desvantagens de utilizar stubbing em excesso
 * 
 * * Custos de manutenção, futuramente os componentes podem mudar e gera um custo em re-escrever os stubs.
 * * Diminuição na cobertura e confidencia do código, visto que não será feito testes nos componentes e sim em versões stubs do código.
 * 
 * !OBS: Mas e o uso de shallowMount => criar uma versão rasa do componente.
 * * Gera as mesmas desvantagens de utilizar stubbing em excesso e mais:
 *  * Não é suportada em outras bibliotecas como na: Vue Testing Library
 */