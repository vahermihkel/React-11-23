export type PaymentResponse = {
  account_name: string
  order_reference: string
  email: any
  customer_ip: any
  customer_url: string
  payment_created_at: string
  initial_amount: number
  standing_amount: number
  payment_reference: string
  payment_link: string
  payment_methods: PaymentMethod[]
  api_username: string
  warnings: Warnings
  stan: any
  fraud_score: any
  payment_state: string
  payment_method: any
  currency: string
  applepay_merchant_identifier: any
  descriptor_country: string
  googlepay_merchant_identifier: any
}

export type PaymentMethod = {
  source: string
  display_name: string
  country_code?: string
  payment_link: string
  logo_url: string
  applepay_available?: boolean
  googlepay_available?: boolean
  wallet_display_name?: string
}

export type Warnings = {}
