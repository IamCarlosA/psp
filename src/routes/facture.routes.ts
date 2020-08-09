import { Request, Response, Router } from 'express';
import Facture from '../models/facture.model';

class FactureRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getFactures(req:Request, res:Response){
        
        try {
            const factures = await Facture.find().sort({createdAt: -1});
            res.status(200).json({
                factures
            });
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: "error"
            });
        }
        
    }

    async getFactureById(req:Request, res:Response){
        const _id = req.params._id;
        try {
            const facture = await Facture.findById(_id);
            if(facture!= null){
                res.status(200).json({
                    facture: facture
                });
            }
            res.status(404).json({
                message: 'Facture not found'
            });
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: "error"
            });
        }
    }

    async createFacture(req:Request, res:Response){
        const facture = req.body;
        try {
            const newFacture = new Facture(facture);
            await newFacture.save();
            res.status(200).json({
                message: 'Facture created succefully'
            });  
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'error'
            }); 
        }

    }

    async deleteFacture(req:Request, res:Response){
        const _id = req.params._id;
        try {
            const facture = await Facture.findByIdAndDelete(_id);
            if(facture!= null){
                res.status(200).json({
                    message: 'facture deleted'
                });
            }
            res.status(500).json({
                message: 'Error'
            });
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: "error"
            });
        }
    }

    routes(): void {
        this.router.get('/factures', this.getFactures);
        this.router.get('/factures/:_id', this.getFactureById);
        this.router.delete('/factures/:_id', this.deleteFacture);
        this.router.post('/factures', this.createFacture);
    }
}

const factureRoutes = new FactureRoutes();
factureRoutes.routes();

export default factureRoutes.router;