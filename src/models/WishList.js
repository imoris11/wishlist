import { types } from 'mobx-state-tree';

export const WishListItem = types.model({
    name: types.string,
    price: types.number,
    productUrl: types.string,
    image: ''
});

export const WishList = types.model({
    key: types.string,
    items: types.optional(types.array(WishListItem), []),
    title: types.string,
    displayName: types.string,
    profilePicture: types.string,
    uid: types.string,
    createdAt: types.integer
}).views(self => ({
    numberOfItems () {
        return self.items.length
    },
    total () {
        return self.items.reduce((a, b) => a.price + b.price)
    }
}))
