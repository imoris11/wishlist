import { types } from 'mobx-state-tree';
import { WishList } from './WishList';

export const User = types.model({
    uid: '',
    name: '',
    email:'',
    photoURL: '',
    paystack: '',
    created_at: 0,
    loading: true,
    noWishes:false,
    showMenu:false,
    wishList: types.array(WishList, []),
    recentLists: types.array(WishList, [])
}).views(self => ({
    getList(key) {
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
    updateProfilePicture(profilePicture) {
        self.photoURL = profilePicture
    },
    saveUser(name, link, photoURL) {
        self.paystack = link
        self.name = name
        self.photoURL = photoURL
    },
    updatePaystack(link){
        self.paystack = link
    },
    addWishlist(list){
        self.wishList.unshift(list)
        self.recentLists.unshift(list)
    },
    updateWishlist(key, list) {
        let index = 0;
        self.wishList.forEach((it, idx) =>{
            if (it.key === key) {
                index = idx
            }
        });
        self.wishList[index] = list
        
    },
    toggleShowMenu() {
        self.showMenu = !self.showMenu
    },
    setWishLists(wishLists) {
       self.wishList = wishLists
       self.loading = false
       self.noWishes = false

    },
    setRecentLists(lists) {
        self.recentLists = lists
        self.loading = false
    },
    setNoWishes() {
        self.loading = false
        self.noWishes = true
    },
    removeItem(key) {
        const items = self.wishList.filter((it) => it.key !== key)
        self.wishList = items
    },
    sayHi() {
        console.log('Hi there')
    }
})

);
