import AdminJS from "adminjs";
import AdminJsFastify from "@adminjs/fastify";
import * as AdminJsMongoose from "@adminjs/mongoose";
import * as Models from "../models/index.js";
import { authenticate, COOKIES_PASSWORD, sessionStore } from "./config.js";
import { dark, light, noSidebar } from "@adminjs/themes";


AdminJS.registerAdapter(AdminJsMongoose)

export const admin = new AdminJS({
    resources: [
        {
            resource: Models.Customer,
            Option: {
                listProperties: ["phone", "role", "isActivated"],
                filterProperties: ["phone", "role"]
            }
        },
        {
            resource: Models.DeliveryPartner,
            Option: {
                listProperties: ["phone", "role", "isActivated"],
                filterProperties: ["phone", "role"]
            }
        },
        {
            resource: Models.Admin,
            Option: {
                listProperties: ["phone", "role", "isActivated"],
                filterProperties: ["phone", "role"]
            }
        },
        { resource: Models.Branch },
        { resource: Models.Product },
        { resource: Models.Category },
        { resource: Models.Order },
        { resource: Models.Counter },
    ],
    branding: {
        companyName: "Grocery Delivery App",
        withMadeWithLove: false
    },
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    rootPath: '/admin'
})


export const buildAdminRouter = async (app) => {
    await AdminJsFastify.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookiePassword: COOKIES_PASSWORD,
            cookieName: 'adminjs'
        },
        app,
        {
            store: sessionStore,
            saveUnintialized: true,
            secret: COOKIES_PASSWORD,
            cookie: {
                httpOnly: process.env.NODE_ENV == "production",
                secure: process.env.NODE_ENV == "production",
            }
        }
    )
}