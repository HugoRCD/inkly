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
  gap: number
  imageForm: 'circle' | 'square' | 'rectangle'
  imageSize: number
  textSize: number
  fontSize: number
  titleSize: number
  titleColor: string
  textGap: number
  textColor: string
  backgroundColor: string
  align: string
}

export type Signature = {
  data: SignatureFormData
  options: SignatureOptions
}
