import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { Organization } from 'lib/models/organization';

import type { IOrganization } from '~/types/IOrganization';


export const organizationRouter = createTRPCRouter({

    // Create
    createOrganization: publicProcedure
        .input(z.object({
            ownerName: z.string(),
            ownerId: z.string(),
            name: z.string().refine(async (value) => {
                const organizationExist: IOrganization | null = await Organization.findOne({ name: value }).exec()
                if (organizationExist) throw new Error("Organization already exist")
                return true
            }),
            ownerUrlImage: z.string(),
            participants: z.array(z.string()).optional()
        }))
        .mutation(async ({ input }) => {
            try {
                const newOrganization = new Organization(input)
                newOrganization.participants.push(input.ownerId)
                newOrganization.urlImageParicipants.push(input.ownerUrlImage)
                await newOrganization.save()
            } catch (err) {
                console.log(err)
            }
        }),

    // Update
    enrollOrganization: publicProcedure
        .input(z.object({
            newParticipant: z.string(),
            participantUrlImage: z.string(),
            organizationId: z.string(),
        }))
        .mutation(async ({ input }) => {
            const { organizationId, participantUrlImage, newParticipant } = input
            try {
                const organization = await Organization.findById<IOrganization>(organizationId).exec()
                if (organization) {
                    organization.participants.push(newParticipant)
                    organization.urlImageParicipants.push(participantUrlImage)
                    await organization.save()
                }
            } catch (err) {
                console.log(err)
            }
        }),



    // Read
    getOrganizations: publicProcedure
        .query(async () => {
            const Organizations: IOrganization[] | null = await Organization.find<IOrganization>().exec()
            console.log(typeof Organizations)
            /**
             * If We don't have Organizations trpc will send us a undefined Error,
             * and gonna try to do a query.
             */
            return {
                OrganizationsFounded: Organizations
            }
        }),

    getOrganizationByUser: publicProcedure
        .input(z.object({
            userId: z.string()
        })).query(async ({ input }) => {
            console.log(input.userId)
            const getOrganizationByUser: IOrganization[] | null = await Organization.find<IOrganization>({ participants: input.userId }).exec()
            return {
                OrganizationFound: getOrganizationByUser
            }
        }),

    getOrganizationById: publicProcedure
        .input(z.object({
            id: z.string()
        })).query(async ({ input }) => {
            const getOrganizationById: IOrganization | null = await Organization.findById<IOrganization>(input.id).exec()
            return {
                OrganizationFound: getOrganizationById
            }
        }),

});