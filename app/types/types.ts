import { 
    Product as PrismaProduct, 
    CartProduct as PrismaCartProduct, 
    Review as PrismaReview, 
    Image as PrismaImage, 
    Tag as PrismaTag,
    Order as PrismaOrder,
    Address as PrismaAddress,
    Notification as PrismaNotification,
    User as PrismaUser,
    Cart as PrismaCart,
    TagImage as PrismaTagImage
} from "@prisma/client"

interface CartProductCartIdNullable{
    id: number;
    cartId: number | null;
    quantity: number;
    productId: number;
}

export type Order = PrismaOrder
export type Product = ({images: PrismaImage[]} & {reviews: PrismaReview[]} & PrismaProduct)
export type Tag = ({products: ({images: PrismaImage[]} & {reviews: PrismaReview[]} & PrismaProduct)[]} & {images: PrismaTagImage[]} & PrismaTag)
export type CartProduct = ({product: {images: PrismaImage[]} & {reviews: PrismaReview[]} & PrismaProduct} & CartProductCartIdNullable)
export type User = ({orders: PrismaOrder[]} & {addresses: PrismaAddress[]} & {notifications: PrismaNotification[]} & {reviews: PrismaReview[]} & PrismaUser)
export type Cart = ({products: PrismaProduct[]} & PrismaCart)
export type Address = ({user: PrismaUser} & PrismaAddress)
export type Review = ({product: PrismaProduct} & {user: PrismaUser} & PrismaReview)
export type Notification = ({user: PrismaUser} & PrismaNotification)



export interface Dict {
    logo: string,
    logoPt1: string,
    logoPt2: string,
    search: string,
    in: string,
    enterEmailOrPhone: string,
    selectYourRegion: string,
    otherProducts: string,
    seeAllProducts: string,
    region: string,
    unitedArabEmirates: string,
    iran: string,
    accountDetails: string,
    logout: string,
    myOrders: string,
    inProgress: string,
    canceled: string,
    sent: string,

    description: string,
    no: string,
    reviews: string,
    similarProducts: string,
    recommendations: string,
    activitySummary: string,

    ERROR_MESSAGES: {
        PHONE_NUMBER: string,
        PHONE_NUMBER_AND_EMAIL: string, 
        POSTAL_CODE: string ,
        FIRST_NAME: string ,
        LAST_NAME: string ,
        EMAIL: string ,
        URL: string ,
        REQUIRED: string 
    },
    links: {
        about: string,
        contact: string,
        products: string,
        home: string,
        users: string
    },
    account: {
        register: string,
        login: string,
        logout: string,
        profile: string,
        history: string
    },
    content: {
        homepage: {
            seeOurProducts: string,
            description: {
                first: {
                    title: string,
                    body: string
                },
                second: {
                    title: string,
                    body: string
                },
                third: {
                    title: string,
                    body: string
                }
            }
        }
    },
    shoppingCart: {
        continue: string
    },
    product:{
        addToCart: string,
        deleteFromCart: string,
        price: string,
        perkg: string,
        currency: string,
        label: string,
        massUnit: string,
        products: {
            
            برنج_روس: string,
            برنج_کشت_دوم: string,
            برنج_قهوه_ای: string,
            برنج_طارم_عطری: string,
            برنج_طارم_فجر: string,
            برنج_بسمتی: string,
            برنج_هندی: string,
            برنج_ژاپنی: string
            برنج_وحشی: string
            برنج_سیاه: string
            برنج_دودی: string
            خرده_برنج: string
        },
        categories: {
            برنج_ایرانی: string,
            برنج_خاص: string
            برنج_رنگی: string
            برنج_وارداتی: string
            برنج_کشت_دوم: string
        }
    },
    finalSum: string,
    productsPrice: string,
    discount: string,
    completeTheOrder: string,
    postalCode: string,
    reciever: string,
    buyDirectlyFromTheStore: string,
    shipToIsfahan: string,
    otherCities: string,
    fee: string,
    continue: string,
    shipping: string,
    and: string,
    address: string,
    pay: string,
    payment: string,
    payOnTheSpot: string,
    payOnTheSpotUsingCashOrCreditCard: string,
    payOnline: string,
    zarinPal: string,
    portal: string,
    transferTheMoney: string,
    TransferTo: string,
    free: string,
    categories: string,
    ordersHistory: string,
    noOrdersHistory: string,
    youHaveNoNotifications: string,
    email: string,
    phoneNumber: string,
    fullName: string,
    nationalCode: string,
    orders: string,
    addresses: string,
    users: string,
    notifications: string,
    products: string,
    firstName: string,
    lastName: string,
    confirm: string,
    edit: string,
    delete: string,
    province: string,
    city: string,
    plate: string,
    unit: string,

    mainHeading: string,
    mainSection: string,
    aboutSectionHeading: string,
    aboutSection: string,
    productsSectionHeading: "Our Premium Iranian Rice Collection",
    برنج_کشت_دوم: string,
    برنج_طارم_عطری: string,
    برنج_طارم_فجر: string,
    برنج_بسمتی: string,
    ourDifferenceHeading: string,
    ourDifference: string,
    originHeading: string, 
    origin: string,
    footerContent: string

    newCategory: string,
    label: string,
    imageUrl: string,
    primaryPrice: string,
    afterDiscount: string,
    inStock: string,
    stock: string,
    noAddressesAdded: string,
    addNewAddress: string,
    addAnAddress: string,
    chooseAddress: string,
    addressSettings: string,
    orderExists: string,
    ordersCode: string,
    theCartIsEmpty: string,
    viewDetails: string,
    shopNow: string,
    riceShop: string,
    getInTouch: string,
    contactUs: string,
    shippingInfo: string,
    returnsAndRefunds: string,
    trackYourOrder: string,
    bulkOrders: string,
    FAQ: string,
    cookingGuides: string

}