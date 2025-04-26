export type Alignment = 'top' | 'center' | 'bottom'
export type ImageForm = 'circle' | 'square' | 'rectangle'
export type BorderStyle = 'solid' | 'dashed' | 'dotted'
export type ShadowSize = 'sm' | 'md' | 'lg'
export type FontFamily = 'inter' | 'sf' | 'roboto' | 'arial'
export type FontWeight = '400' | '500' | '600' | '700'

export type SocialMedia = 'twitter' | 'instagram' | 'github' | 'linkedin' | 'portfolio'

export type Social = {
  title: string
  url: string
  type: SocialMedia
}

export interface SignatureOptions {
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
    form: ImageForm
    size: number
    border: boolean
    borderStyle: BorderStyle
    borderColor: string
    borderWidth: number
    shadow: boolean
    shadowSize: ShadowSize
  }
  font: {
    family: FontFamily
    titleWeight: FontWeight
  }
}

export interface SignatureFormData {
  image: string
  fullName: string
  jobTitle: string
  company: string
  email: string
  phone: string
  socials: Array<{
    title: string
    url: string
    type: string
  }>
}

export interface Signature {
  data: SignatureFormData
  options: SignatureOptions
}

