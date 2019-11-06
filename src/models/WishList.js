import { types } from 'mobx-state-tree';

export const WishListItem = types.model({
    name: types.string,
    price: types.number,
    productUrl: types.string,
    image: ''
});

export const WishList = types.model({
    items: types.optional(types.array(WishListItem), []),
    title: types.string
}).views(self => ({
    numberOfItems () {
        return self.items.length
    }
}))
