import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/login.vue'
import Register from '../pages/register.vue'
import Messages from '../pages/messages.vue'
import Favourites from '../pages/favourites.vue'
import Create from '../pages/create.vue'
import Shop from '../pages/shop.vue'
import Message from '../pages/message.vue'
import MessageView from '../pages/message_view.vue'
import MessagecreateView from '../pages/messagecreate_view.vue'

Vue.use(VueRouter)

const router = new VueRouter ({
    root: '/',
    mode: 'history',
    routes: 
    [
        {
            path: '/login',
            component: Login,
            name: 'login',
            meta: { auth: false }
        },
        {
            path: '/register',
            component: Register,
            name: 'register',
            meta: { auth: false }
        },
        {
            path: '/',
            component: Messages,
            name: 'messages'
        },
        {
            path: '/favourites',
            component: Favourites,
            name: 'favourites',
            meta: { auth: true }
        },
		{
            path: '/create',
            component: Create,
            name: 'create',
            meta: { auth: true }
        },
		{
            path: '/shop',
            component: Shop,
            name: 'shop',
        },
        {
            path: '/view/:id',
            component: MessageView,
            name: 'messageView'
        },
		{
            path: '/viewcreate/:id',
            component: MessagecreateView,
            name: 'messagecreateView'
        },
        {
            path: '/:id',
            component: Message,
            name: 'message'
        }
    ],
    scrollBehavior (to, from) {
        if (from.name == 'messageView' && from.name == 'messagecreateView' && (to.name == 'messages' || to.name == 'favourites' || to.name == 'create' || to.name == 'shop')) {
            return { selector: document.getElementById(from.params.id) }
        }
    }
})

export default router