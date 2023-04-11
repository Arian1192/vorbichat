import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const organizationRouter = createTRPCRouter({
    createOrganization: publicProcedure
    .input(z.object({ 
        owner: z.string(), //posibly we gonna add refine()
        name: z.string().refine(async (value)=>{
            const existingOrganization = await Organization.findOne({name:value})
            if(existingOrganization) throw new Error('Existing organization with this name.') 
        })

    }))
})
