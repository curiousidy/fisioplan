import prisma from "@/lib/prisma";
import { PhisioDTO } from "../service/definitions";


export const physioRepository = {
    create: async (phisio: PhisioDTO) => {
        return await prisma.physio.create({
            data: { name: phisio.name }
        })
    }
} 