import { RequestHandler, Request, Response } from "express";

export const signup: RequestHandler = async (_req: Request, res: Response) => {

    res.json('Obteniendo 1 Post')
}

export const login: RequestHandler = async (_req: Request, res: Response) => {
    res.json('Eliminando Post')
}

export const reset: RequestHandler = async (_req: Request, res: Response) => {
    res.json('Actualizando Post')
}