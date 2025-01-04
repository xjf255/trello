export class ValidationError extends Error {
  fields = '*'
  constructor(message: string, field: string = '*') {
    super(message)
    this.name = 'FormErrors'
    this.fields = field
  } 
}