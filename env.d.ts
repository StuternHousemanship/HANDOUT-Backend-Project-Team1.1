import * as express from "express"
declare global {
    namespace Express {
        interface Request {
            user? : Record<string,any>
            userId? : Record<string,any>
            name? : Record<string,any>
            location? : Record<string,any>
        }
    }
}



declare global{
    namespace NodeJS{
        interface ProcessEnv{
            MONGO_URL:string
            PORT:number
            NODE_ENV: 'development' | 'production'
        }
    }
}

export{}