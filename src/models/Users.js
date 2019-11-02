import { types } from 'mobx-state-tree';
import { WishList } from './WishList';

export const User = types.model({
    uid: '',
    name: '',
    email:'',
    photoURL: '',
    paystack:'https://paystack.com',
    created_at: 0,
    wishList: types.array(WishList, []),
    shared: types.array(WishList, [])
}).actions(self => ({
    updateUser(user) {
        self.uid = user.uid
        self.name = user.displayName
        self.photoURL = user.photoURL
        self.email = user.email
        self.created_at = user.created_at
    },
    saveUser(name, link) {
        self.paystack = link
        self.name = name
    },
    updatePaystack(link){
        self.paystack = link
    },
    sayHi() {
        console.log('Hi there')
    }
}));
