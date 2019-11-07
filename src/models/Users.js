import { types } from 'mobx-state-tree';
import { WishList } from './WishList';

export const User = types.model({
    uid: '',
    name: '',
    email:'',
    photoURL: '',
    paystack: '',
    created_at: 0,
    wishList: types.array(WishList, []),
    recentLists: types.array(WishList, [])
}).views(self => ({
    getList(key) {
       // return self.recentLists[0]
        return self.recentLists.filter((l) => l.key === key )
    }
})).actions(self => ({
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
    addWishlist(list){
        self.wishList.push(list)
    },
    setWishLists(wishLists) {
       self.wishList = wishLists
    },
    setRecentLists(lists) {
        self.recentLists = lists
    },
    sayHi() {
        console.log('Hi there')
    }
})

);
