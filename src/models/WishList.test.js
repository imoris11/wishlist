import { WishListItem, WishList } from './WishList';

it ("can create a wish list item", () => {

    const item = WishListItem.create({
        title: 'First Item',
        price: 100.12,
        productUrl: 'https://www.facebook.com',
        priority: 2,
    });

    expect(item.price).toBe(100.12);
    expect(item.image).toEqual('');
});

it("can create a wish list", () => {
    const list = WishList.create({
        items:[
            {
                title: 'First Item',
                price: 100,
                productUrl: 'https://www.facebook.com',
                priority: 1,
            }
        ]
    })

    expect(list.items.length).toEqual(1);
    expect(list.items[0].price).toEqual(100)
})