import { Schema, model, models, type Model } from 'mongoose'
import { type IOrganization } from '~/types/IOrganization'

const organizationSchema = new Schema<IOrganization>({
    ownerName: String,
    name: { type: String, unique: true },
    participants: [String],
})

export const Organization: Model<IOrganization> = models.Organization || model('Organization', organizationSchema)

