import { types } from 'mobx-state-tree';

export const WishListItem = types.model({
    title: types.string,
    price: types.number,
    productUrl: types.string,
    priority: types.integer,
    image: ''
});

export const WishList = types.model({
    items: types.optional(types.array(WishListItem), [])
})
