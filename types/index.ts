export type Alignment = 'top' | 'center' | 'bottom'

export type Form = 'circle' | 'square' | 'rectangle'

export type SocialMedia = 'twitter' | 'instagram' | 'github' | 'linkedin' | 'portfolio'

export type Social = {
  title: string
  url: string
  type: SocialMedia
}

export type SignatureFormData = {
  image: string
  fullName: string
  jobTitle: string
  company: string
  email: string
  phone: string
  socials: Social[]
}

export type SignatureOptions = {
  gap: {
    title: number
    subtitle: number
    social: number
    image: number
  }
  size: {
    title: number
    subtitle: number
    social: number
  }
  color: {
    title: string
    autoTitle: boolean
    subtitle: string
    social: string
    background: string
    transparent: boolean
  }
  image: {
    align: Alignment
    form: Form
    size: number
  }
}

export type Signature = {
  data: SignatureFormData
  options: SignatureOptions
}
