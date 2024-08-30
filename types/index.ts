export type Alignment = 'top' | 'center' | 'bottom'

export type SignatureFormData = {
  image: string
  fullName: string
  jobTitle: string
  company: string
  email: string
  phone: string
}

export type SignatureOptions = {
  fontSize: number
  gap: number
  imageSize: number
  textColor: string
  align: string
}

export type Signature = {
  data: SignatureFormData
  options: SignatureOptions
}
