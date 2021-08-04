import {
    CartMajor,
    ProductsMajor,
    ChecklistAlternateMajor,
    BlogMajor,
    CollectionsMajor,
    CustomersMajor,
    DraftOrdersMajor,
    OrdersMajor,
    PageMajor,
    AddImageMajor,
    VariantMajor,
} from '@shopify/polaris-icons'

export default [
    {
        key: 'BLOG',
        url: '/blogs',
        name: 'Blog',
        icon: BlogMajor,
        description: 'The Blog metafield owner type.',
        submenu: [
            {
                key: 'ARTICLE',
                url: '/articles',
                name: 'Article',
                icon: ChecklistAlternateMajor,
                description: 'The Article metafield owner type.',
            }
        ]
    },
    {
        key: 'COLLECTION',
        url: '/collections',
        name: 'Collection',
        icon: CollectionsMajor,
        description: 'The Collection metafield owner type.',
    },
    {
        key: 'CUSTOMER',
        url: '/customers',
        name: 'Customer',
        icon: CustomersMajor,
        description: 'The Customer metafield owner type.',
    },
    // {
    //     key: 'DRAFTORDER',
    //     url: '/draftorders',
    //     name: 'Draftorder',
    //     icon: DraftOrdersMajor,
    //     description: 'The Draft Order metafield owner type.',
    // },
    {
        key: 'ORDER',
        url: '/orders',
        name: 'Order',
        icon: OrdersMajor,
        description: 'The Order metafield owner type.',
    },
    {
        key: 'PAGE',
        url: '/pages',
        name: 'Page',
        icon: PageMajor,
        description: 'The Page metafield owner type.',
    },
    {
        key: 'PRODUCT',
        url: '/products',
        name: 'Product',
        icon: ProductsMajor,
        description: 'The Product metafield owner type.',
        submenu: [
            {
                key: 'PRODUCTIMAGE',
                url: '/product-images',
                name: 'Product Image',
                icon: AddImageMajor,
                description: 'The Product Image metafield owner type.',
            },
            {
                key: 'PRODUCTVARIANT',
                url: '/product-variants',
                name: 'Product Variant',
                icon: VariantMajor,
                description: 'The Product Variant metafield owner type.',
            }
        ]
    },
    {
        key: 'SHOP',
        url: '/shops',
        name: 'Shop',
        icon: CartMajor,
        description: 'The Shop metafield owner type.',
    },
]
