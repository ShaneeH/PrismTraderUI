<template>
    <div>
        <button @click="simulateLogin">Simulate Login</button>
        <HomeView ref="homeView" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import HomeView from './HomeView.vue';

const homeView = ref(null);

const simulateLogin = () => {
    homeView.value.handleLoginSuccess('testPublicKey');
};

// Test if the components render correctly based on login state
const wrapper = mount(HomeView);

describe('HomeView.vue', () => {
    it('renders PhantomWallet when not logged in', () => {
        expect(wrapper.findComponent({ name: 'PhantomWallet' }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'TradeBox' }).exists()).toBe(false);
    });

    it('renders TradeBox when logged in', async () => {
        await wrapper.vm.handleLoginSuccess('testPublicKey');
        expect(wrapper.findComponent({ name: 'PhantomWallet' }).exists()).toBe(false);
        expect(wrapper.findComponent({ name: 'TradeBox' }).exists()).toBe(true);
    });

    it('sets loggedIn and ca correctly on login success', async () => {
        await wrapper.vm.handleLoginSuccess('testPublicKey');
        expect(wrapper.vm.loggedIn).toBe(true);
        expect(wrapper.vm.ca).toBe('testPublicKey');
    });

    it('checks localStorage on mount', () => {
        localStorage.setItem('ca', 'storedPublicKey');
        const wrapperWithStorage = mount(HomeView);
        expect(wrapperWithStorage.vm.loggedIn).toBe(true);
        expect(wrapperWithStorage.vm.ca).toBe('storedPublicKey');
    });
});
</script></div>