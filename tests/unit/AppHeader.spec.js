import AppHeader from '@/components/AppHeader';
import { mount } from '@vue/test-utils';

describe('Appheader', () => {
    test('Se usuario nao esta logado, nao exibe botao de logout', () => {
        const wrapper = mount(AppHeader);
        expect(wrapper.find('button').isVisible()).toBe(false);
    });

    test('Se usuario esta logado, exibe botao de logout', async () => {
        const wrapper = mount(AppHeader);
        await wrapper.setData({ loggedIn: true });
        expect(wrapper.find('button').isVisible()).toBe(true);
    });
});

