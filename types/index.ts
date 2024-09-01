export type Alignment = 'top' | 'center' | 'bottom'

export type Form = 'circle' | 'square' | 'rectangle'

export type SignatureFormData = {
  image: string
  fullName: string
  jobTitle: string
  company: string
  email: string
  phone: string
}

export type SignatureOptions = {
  gap: {
    title: number
    subtitle: number
    social: number
  }
  size: {
    title: number
    subtitle: number
    social: number
  }
  color: {
    title: string
    subtitle: string
    background: string
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
