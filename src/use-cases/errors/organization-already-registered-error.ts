export class OrganizationAlreadyRegisteredError extends Error {
  constructor() {
    super('Organization already registered.')
  }
}
